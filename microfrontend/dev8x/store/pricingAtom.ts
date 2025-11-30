import { atom, useAtom } from 'jotai';

export interface ListboxOptionType {
  id: number;
  name: string;
  value: string | number;
}

// ✅ Role interface
export interface Role {
  title: string;
  skills: Record<string, boolean>;
  selectedPeople: ListboxOptionType;
  selectedPriceType: ListboxOptionType;
  selectedLevel: ListboxOptionType;
}

const peopleOptions: ListboxOptionType[] = [
  { id: 0, name: '0', value: 0 },
  { id: 1, name: '1', value: 1 },
  { id: 2, name: '2', value: 2 },
  { id: 3, name: '3', value: 3 },
  { id: 4, name: '4', value: 4 },
  { id: 5, name: '5', value: 5 },
  { id: 6, name: '6', value: 6 },
  { id: 7, name: '7', value: 7 },
  { id: 8, name: '8', value: 8 },
  { id: 9, name: '9', value: 9 },
  { id: 10, name: '10', value: 10 }
];

const priceTypesOptions: ListboxOptionType[] = [
  { id: 1, name: 'Monthly Rate', value: 'monthly' },
  { id: 2, name: 'Fixed Rate', value: 'fixed' },
  { id: 3, name: 'Time & Material', value: 'time-material' }
];

const levelOptions: ListboxOptionType[] = [
  { id: 1, name: 'Junior', value: 'junior' },
  { id: 2, name: 'Medium', value: 'medium' },
  { id: 3, name: 'Senior', value: 'senior' }
];

// Centralized skill mapping function
export const getSkillsByLevel = (roleTitle: string, level: string) => {
  const skillMappings: Record<string, Record<string, string[]>> = {
    'UI/UX Designer': {
      junior: ['Figma', 'AdobeXD', 'Canva', 'Wireframing', 'Typography', 'ColorTheory'],
      medium: ['Figma', 'AdobeXD', 'Sketch', 'InVision', 'Zeplin', 'Wireframing', 'Prototyping', 'Typography', 'ColorTheory', 'ResponsiveDesign'],
      senior: ['Figma', 'AdobeXD', 'Sketch', 'Illustrator', 'Photoshop', 'InVision', 'Zeplin', 'Canva', 'Wireframing', 'Prototyping', 'UserResearch', 'ABTesting', 'DesignSystems', 'Accessibility', 'Typography', 'ColorTheory', 'UXWriting', 'MotionDesign', 'ResponsiveDesign']
    },
    'Frontend Developer': {
      junior: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'ResponsiveDesign'],
      medium: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'TailwindCSS', 'Bootstrap', 'Sass', 'RESTAPI', 'Git', 'ResponsiveDesign', 'WebAccessibility'],
      senior: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'NextJS', 'Redux', 'TailwindCSS', 'Bootstrap', 'Sass', 'Webpack', 'Vite', 'RESTAPI', 'GraphQL', 'Git', 'TestingLibrary', 'Cypress', 'Jest', 'ResponsiveDesign', 'WebAccessibility']
    },
    'Flutter Developer': {
      junior: ['Dart', 'Flutter', 'Provider', 'SharedPreferences', 'ResponsiveUI'],
      medium: ['Dart', 'Flutter', 'Firebase', 'Provider', 'Bloc', 'Hive', 'SQFLite', 'SharedPreferences', 'PushNotifications', 'RESTAPI', 'AppLocalization', 'ResponsiveUI', 'Testing'],
      senior: ['Dart', 'Flutter', 'Firebase', 'Riverpod', 'Provider', 'Bloc', 'GetX', 'Hive', 'SQFLite', 'SharedPreferences', 'PushNotifications', 'RESTAPI', 'GraphQL', 'AppLocalization', 'FlutterWeb', 'Animations', 'ThemeManagement', 'StateManagement', 'ResponsiveUI', 'Testing']
    },
    'Backend Developer': {
      junior: ['NodeJS', 'ExpressJS', 'MongoDB', 'RESTAPI', 'Git'],
      medium: ['NodeJS', 'ExpressJS', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'RESTAPI', 'GraphQL', 'JWT', 'Prisma', 'Sequelize', 'Git', 'Testing', 'Nginx'],
      senior: ['NodeJS', 'ExpressJS', 'NestJS', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'RESTAPI', 'GraphQL', 'JWT', 'OAuth', 'Prisma', 'Sequelize', 'SocketIO', 'WebSockets', 'Docker', 'CICD', 'Testing', 'Nginx', 'APISecurity']
    },
    'AI Engineer': {
      junior: ['Python', 'NumPy', 'Pandas', 'ScikitLearn', 'Matplotlib'],
      medium: ['Python', 'NumPy', 'Pandas', 'TensorFlow', 'Keras', 'ScikitLearn', 'OpenCV', 'Matplotlib', 'Seaborn', 'NLP', 'MachineLearning', 'DataCleaning'],
      senior: ['Python', 'NumPy', 'Pandas', 'TensorFlow', 'Keras', 'PyTorch', 'ScikitLearn', 'OpenCV', 'Matplotlib', 'Seaborn', 'NLP', 'HuggingFace', 'Transformers', 'CNNs', 'RNNs', 'LSTMs', 'DeepLearning', 'MachineLearning', 'DataCleaning', 'ModelDeployment']
    },
    'Business Development': {
      junior: ['CRM', 'SalesStrategy', 'EmailMarketing', 'Communication'],
      medium: ['CRM', 'SalesStrategy', 'MarketResearch', 'LeadGeneration', 'EmailMarketing', 'SEO', 'SocialMedia', 'GoogleAnalytics', 'Negotiation', 'Communication', 'Branding', 'Copywriting'],
      senior: ['CRM', 'SalesStrategy', 'MarketResearch', 'LeadGeneration', 'EmailMarketing', 'SEO', 'SocialMedia', 'GoogleAnalytics', 'Negotiation', 'Networking', 'CustomerSuccess', 'HubSpot', 'Salesforce', 'PitchDecks', 'Communication', 'Branding', 'Copywriting', 'BusinessAnalysis', 'StrategicPlanning', 'ProjectManagement']
    }
  };

  return skillMappings[roleTitle]?.[level] || [];
};

// ✅ Initial role data
const initialRoles: Role[] = [
  {
    title: 'UI/UX Designer',
    skills: {
      Figma: false,
      AdobeXD: false,
      Sketch: false,
      Illustrator: false,
      Photoshop: false,
      InVision: false,
      Zeplin: false,
      Canva: false,
      Wireframing: false,
      Prototyping: false,
      UserResearch: false,
      ABTesting: false,
      DesignSystems: false,
      Accessibility: false,
      Typography: false,
      ColorTheory: false,
      UXWriting: false,
      MotionDesign: false,
      ResponsiveDesign: false
    },
    selectedPeople: peopleOptions[0],
    selectedPriceType: priceTypesOptions[0],
    selectedLevel: { id: 0, name: '', value: '' }
  },
  {
    title: 'Frontend Developer',
    skills: {
      HTML: false,
      CSS: false,
      JavaScript: false,
      TypeScript: false,
      React: false,
      NextJS: false,
      Redux: false,
      TailwindCSS: false,
      Bootstrap: false,
      Sass: false,
      Webpack: false,
      Vite: false,
      RESTAPI: false,
      GraphQL: false,
      Git: false,
      TestingLibrary: false,
      Cypress: false,
      Jest: false,
      ResponsiveDesign: false,
      WebAccessibility: false
    },
    selectedPeople: peopleOptions[0],
    selectedPriceType: priceTypesOptions[0],
    selectedLevel: { id: 0, name: '', value: '' }
  },
  {
    title: 'Flutter Developer',
    skills: {
      Dart: false,
      Flutter: false,
      Firebase: false,
      Riverpod: false,
      Provider: false,
      Bloc: false,
      GetX: false,
      Hive: false,
      SQFLite: false,
      SharedPreferences: false,
      PushNotifications: false,
      RESTAPI: false,
      GraphQL: false,
      AppLocalization: false,
      FlutterWeb: false,
      Animations: false,
      ThemeManagement: false,
      StateManagement: false,
      ResponsiveUI: false,
      Testing: false
    },
    selectedPeople: peopleOptions[0],
    selectedPriceType: priceTypesOptions[0],
    selectedLevel: { id: 0, name: '', value: '' }
  },
  {
    title: 'Backend Developer',
    skills: {
      NodeJS: false,
      ExpressJS: false,
      NestJS: false,
      MongoDB: false,
      PostgreSQL: false,
      MySQL: false,
      Redis: false,
      RESTAPI: false,
      GraphQL: false,
      JWT: false,
      OAuth: false,
      Prisma: false,
      Sequelize: false,
      SocketIO: false,
      WebSockets: false,
      Docker: false,
      CICD: false,
      Testing: false,
      Nginx: false,
      APISecurity: false
    },
    selectedPeople: peopleOptions[0],
    selectedPriceType: priceTypesOptions[0],
    selectedLevel: { id: 0, name: '', value: '' }
  },
  {
    title: 'AI Engineer',
    skills: {
      Python: false,
      NumPy: false,
      Pandas: false,
      TensorFlow: false,
      Keras: false,
      PyTorch: false,
      ScikitLearn: false,
      OpenCV: false,
      Matplotlib: false,
      Seaborn: false,
      NLP: false,
      HuggingFace: false,
      Transformers: false,
      CNNs: false,
      RNNs: false,
      LSTMs: false,
      DeepLearning: false,
      MachineLearning: false,
      DataCleaning: false,
      ModelDeployment: false
    },
    selectedPeople: peopleOptions[0],
    selectedPriceType: priceTypesOptions[0],
    selectedLevel: { id: 0, name: '', value: '' }
  },
  {
    title: 'Business Development',
    skills: {
      CRM: false,
      SalesStrategy: false,
      MarketResearch: false,
      LeadGeneration: false,
      EmailMarketing: false,
      SEO: false,
      SocialMedia: false,
      GoogleAnalytics: false,
      Negotiation: false,
      Networking: false,
      CustomerSuccess: false,
      HubSpot: false,
      Salesforce: false,
      PitchDecks: false,
      Communication: false,
      Branding: false,
      Copywriting: false,
      BusinessAnalysis: false,
      StrategicPlanning: false,
      ProjectManagement: false
    },
    selectedPeople: peopleOptions[0],
    selectedPriceType: priceTypesOptions[0],
    selectedLevel: { id: 0, name: '', value: '' }
  }
];

const rolesAtom = atom<Role[]>(initialRoles);

export function pricingAtom() {
  const [roles, setRoles] = useAtom(rolesAtom);

  const updateRoleSkill = (roleIndex: number, skillKey: string, value: boolean) => {
    setRoles((prev) =>
      prev.map((role, idx) =>
        idx === roleIndex
          ? {
              ...role,
              skills: {
                ...role.skills,
                [skillKey]: value
              }
            }
          : role
      )
    );
  };

  const updateRolePricing = (roleIndex: number, key: 'selectedPeople' | 'selectedPriceType' | 'selectedLevel', value: ListboxOptionType) => {
    setRoles((prev) =>
      prev.map((role, idx) => {
        if (idx === roleIndex) {
          const updatedRole = {
            ...role,
            [key]: value
          };

          // If level is being updated, auto-select the relevant skills
          if (key === 'selectedLevel' && value.value) {
            const availableSkills = getSkillsByLevel(role.title, value.value as string);

            // Auto-select all skills for the chosen level
            const updatedSkills = Object.keys(role.skills).reduce(
              (acc, skillKey) => {
                acc[skillKey] = availableSkills.includes(skillKey);
                return acc;
              },
              {} as Record<string, boolean>
            );

            return {
              ...updatedRole,
              skills: updatedSkills
            };
          }

          return updatedRole;
        }
        return role;
      })
    );
  };

  return { roles, peopleOptions, priceTypesOptions, levelOptions, updateRoleSkill, updateRolePricing, getSkillsByLevel };
}
