import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const demoDir = path.dirname(fileURLToPath(import.meta.url));
const portalsRoot = path.resolve(demoDir, '..');

const requiredDocs = [
  'README.md',
  'MAPPING.md',
  'SCREEN-INVENTORY.md',
  'manifest.schema.json'
];

const legacyFiles = [
  'auth.html',
  'admin-panel.html',
  'candidate-portal.html',
  'client-portal.html',
  'crm-portal.html'
];

const surfaces = ['auth', 'admin', 'candidate', 'client', 'crm'];
const requiredSurfaceEntries = ['css', 'data', 'js', 'screens', 'main.html', 'manifest.json'];

const errors = [];
const warnings = [];

function extractRouteHandlerCaseIds(scriptSource) {
  const routeHandlerMatch = scriptSource.match(
    /function\s+init\w+Route\s*\([^)]*\)\s*{[\s\S]*?switch\s*\(route\.id\)\s*{([\s\S]*?)\n\s*}\n}/,
  );

  if (!routeHandlerMatch) return [];

  const caseIds = [];
  const casePattern = /case\s+'([^']+)':/g;
  let match = casePattern.exec(routeHandlerMatch[1]);

  while (match) {
    caseIds.push(match[1]);
    match = casePattern.exec(routeHandlerMatch[1]);
  }

  return caseIds;
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function loadJson(targetPath, label) {
  try {
    return JSON.parse(await readFile(targetPath, 'utf8'));
  } catch (error) {
    addError(`${label}: ${error.message}`);
    return null;
  }
}

function validateRequiredFields(record, requiredFields, label) {
  requiredFields.forEach((field) => {
    if (record?.[field] === undefined) {
      addError(`${label} is missing required field "${field}".`);
    }
  });
}

async function validateFileReferences(surfaceDir, refs, label) {
  for (const ref of refs || []) {
    const resolved = ref.startsWith('spec-kit/')
      ? path.resolve(portalsRoot, ref)
      : path.resolve(surfaceDir, ref);

    if (!(await exists(resolved))) {
      addError(`${label} references missing file "${ref}".`);
    }
  }
}

async function validateSurface(surface, schema) {
  const surfaceDir = path.join(demoDir, surface);
  const manifestPath = path.join(surfaceDir, 'manifest.json');
  const appScriptPath = path.join(surfaceDir, 'js', 'app.js');

  if (!(await exists(surfaceDir))) {
    addError(`Missing demo surface directory "${surface}/".`);
    return { routes: 0, screens: 0 };
  }

  for (const entry of requiredSurfaceEntries) {
    if (!(await exists(path.join(surfaceDir, entry)))) {
      addError(`Surface "${surface}" is missing "${entry}".`);
    }
  }

  const manifest = await loadJson(manifestPath, `${surface}/manifest.json`);
  if (!manifest) return { routes: 0, screens: 0 };

  validateRequiredFields(manifest, schema.required || [], `${surface}/manifest.json`);

  const routes = Array.isArray(manifest.routes) ? manifest.routes : [];
  const screens = Array.isArray(manifest.screens) ? manifest.screens : [];
  const dataSources = Array.isArray(manifest.dataSources) ? manifest.dataSources : [];

  if (!routes.length) addError(`${surface}/manifest.json must define at least one route.`);
  if (!screens.length) addError(`${surface}/manifest.json must define at least one screen.`);
  if (!dataSources.length) addError(`${surface}/manifest.json must define at least one data source.`);

  if (manifest.entry !== 'main.html') {
    addError(`${surface}/manifest.json should use "main.html" as its entry.`);
  }

  const defaults = routes.filter((route) => route.default);
  if (defaults.length !== 1) {
    addError(`${surface}/manifest.json must mark exactly one default route.`);
  }

  if (manifest.defaultRoute && !routes.some((route) => route.path === manifest.defaultRoute)) {
    addError(`${surface}/manifest.json defaultRoute "${manifest.defaultRoute}" does not match any route path.`);
  }

  const routeRequired = schema.properties?.routes?.items?.required || [];
  const screenRequired = schema.properties?.screens?.items?.required || [];
  const seenRouteIds = new Set();
  const seenRoutePaths = new Set();
  const screenById = new Map();
  const localDataSources = dataSources.filter((source) => source.startsWith('data/'));
  const manifestRouteIds = new Set(routes.map((route) => route.id).filter(Boolean));

  if (!localDataSources.length) {
    addError(`${surface}/manifest.json should include at least one surface-local mock data file under data/.`);
  }

  for (const route of routes) {
    validateRequiredFields(route, routeRequired, `${surface} route "${route.id || route.path || 'unknown'}"`);

    if (route.id) {
      if (seenRouteIds.has(route.id)) {
        addError(`${surface}/manifest.json has duplicate route id "${route.id}".`);
      }
      seenRouteIds.add(route.id);
    }

    if (route.path) {
      if (seenRoutePaths.has(route.path)) {
        addError(`${surface}/manifest.json has duplicate route path "${route.path}".`);
      }
      seenRoutePaths.add(route.path);
    }

    if (route.src) {
      const screenPath = path.resolve(surfaceDir, route.src);
      if (!(await exists(screenPath))) {
        addError(`${surface} route "${route.id}" points to missing screen "${route.src}".`);
      } else {
        const contents = await readFile(screenPath, 'utf8');
        if (!contents.includes('<!-- SCREEN_START -->') || !contents.includes('<!-- SCREEN_END -->')) {
          addWarning(`${surface} screen "${route.src}" does not use SCREEN_START/SCREEN_END markers.`);
        }
      }
    }

    if (!Array.isArray(route.specRefs) || !route.specRefs.length) {
      addError(`${surface} route "${route.id}" must include at least one spec reference.`);
    }

    await validateFileReferences(surfaceDir, route.specRefs, `${surface} route "${route.id}"`);
  }

  for (const screen of screens) {
    validateRequiredFields(screen, screenRequired, `${surface} screen "${screen.id || screen.path || 'unknown'}"`);
    screenById.set(screen.id, screen);

    if (screen.src && !(await exists(path.resolve(surfaceDir, screen.src)))) {
      addError(`${surface} screen "${screen.id}" points to missing file "${screen.src}".`);
    }

    if (!Array.isArray(screen.specRefs) || !screen.specRefs.length) {
      addError(`${surface} screen "${screen.id}" must include at least one spec reference.`);
    }

    await validateFileReferences(surfaceDir, screen.specRefs, `${surface} screen "${screen.id}"`);
  }

  routes.forEach((route) => {
    const matchingScreen = screenById.get(route.id);
    if (!matchingScreen) {
      addError(`${surface} route "${route.id}" is missing a matching screen entry.`);
      return;
    }

    if (matchingScreen.path !== route.path) {
      addError(`${surface} route "${route.id}" path "${route.path}" does not match screen path "${matchingScreen.path}".`);
    }

    if (matchingScreen.src !== route.src) {
      addError(`${surface} route "${route.id}" src "${route.src}" does not match screen src "${matchingScreen.src}".`);
    }

    if (matchingScreen.moduleId !== route.moduleId) {
      addError(`${surface} route "${route.id}" module "${route.moduleId}" does not match screen module "${matchingScreen.moduleId}".`);
    }
  });

  for (const source of dataSources) {
    const dataPath = path.resolve(surfaceDir, source);
    if (!(await exists(dataPath))) {
      addError(`${surface}/manifest.json references missing data source "${source}".`);
      continue;
    }

    if (path.extname(dataPath) === '.json') {
      const data = await loadJson(dataPath, `${surface} data source "${source}"`);
      if (data && typeof data === 'object' && !Object.keys(data).length) {
        addWarning(`${surface} data source "${source}" is empty.`);
      }
    }
  }

  if (surface !== 'auth' && (await exists(appScriptPath))) {
    const appScript = await readFile(appScriptPath, 'utf8');

    if (appScript.includes('\\`') || appScript.includes('\\${')) {
      addError(`${surface}/js/app.js contains escaped template-literal markers that break browser parsing.`);
    }

    const handlerCaseIds = extractRouteHandlerCaseIds(appScript);
    handlerCaseIds
      .filter((caseId) => !manifestRouteIds.has(caseId))
      .forEach((caseId) => {
        addError(`${surface}/js/app.js handles unknown route id "${caseId}".`);
      });
  }

  await validateFileReferences(surfaceDir, manifest.specRefs, `${surface} manifest`);

  return { routes: routes.length, screens: screens.length };
}

const schema = await loadJson(path.join(demoDir, 'manifest.schema.json'), 'manifest.schema.json');

for (const doc of requiredDocs) {
  if (!(await exists(path.join(demoDir, doc)))) {
    addError(`Missing demo documentation file "${doc}".`);
  }
}

for (const legacyFile of legacyFiles) {
  if (!(await exists(path.join(portalsRoot, legacyFile)))) {
    addError(`Legacy reference file "${legacyFile}" must remain in microfrontend/dev8x-portals/.`);
  }
}

let routeCount = 0;
let screenCount = 0;

if (schema) {
  for (const surface of surfaces) {
    const result = await validateSurface(surface, schema);
    routeCount += result.routes;
    screenCount += result.screens;
  }
}

if (errors.length) {
  console.error('Dev8X demo validation failed.\n');
  errors.forEach((message) => console.error(`- ${message}`));
  if (warnings.length) {
    console.error('\nWarnings:');
    warnings.forEach((message) => console.error(`- ${message}`));
  }
  process.exit(1);
}

console.log(`Dev8X demo validation passed for ${surfaces.length} surfaces, ${routeCount} routes, and ${screenCount} screens.`);
if (warnings.length) {
  console.warn('\nWarnings:');
  warnings.forEach((message) => console.warn(`- ${message}`));
}
