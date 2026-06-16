/* =============================================
   ELENA VASQUEZ — PORTFOLIO
   Three.js + GSAP Interactive Experience
   ============================================= */
(function () {
  'use strict';
  // ─── State ──────────────────────────────
  const mouse = { x: 0, y: 0, normX: 0, normY: 0 };
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = window.innerWidth < 768;
  let blob, renderer, scene, camera, clock;
  // ─── GLSL Shaders ──────────────────────
  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uFrequency;
    uniform float uAmplitude;
    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    /* ----- Simplex 3D Noise (Ashima Arts) ----- */
    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g, l.zxy);
      vec3 i2 = max(g, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x2_ = x_ * ns.x + ns.yyyy;
      vec4 y2_ = y_ * ns.x + ns.yyyy;
      vec4 h   = 1.0 - abs(x2_) - abs(y2_);
      vec4 b0 = vec4(x2_.xy, y2_.xy);
      vec4 b1 = vec4(x2_.zw, y2_.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }
    void main(){
      vUv      = uv;
      vNormal  = normalize(normalMatrix * normal);
      // Multi-octave noise displacement
      float n  = snoise(position * uFrequency + uTime * 0.25);
            n += snoise(position * uFrequency * 2.0 + uTime * 0.4) * 0.4;
            n += snoise(position * uFrequency * 4.0 + uTime * 0.6) * 0.15;
      float displacement = n * uAmplitude;
      vDisplacement = displacement;
      vec3 newPos = position + normal * displacement;
      vWorldPos = (modelMatrix * vec4(newPos, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `;
  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main(){
      vec3 accent = vec3(0.784, 1.0, 0.0);
      vec3 dark   = vec3(0.035, 0.035, 0.035);
      vec3 mid    = vec3(0.12, 0.16, 0.02);
      float t = clamp(vDisplacement * 2.0 + 0.5, 0.0, 1.0);
      vec3 color = mix(dark, mid, smoothstep(0.0, 0.45, t));
      color = mix(color, accent, smoothstep(0.55, 1.0, t));
      // Fresnel rim
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.5);
      color += accent * fresnel * 0.18;
      // Subtle AO
      color *= 0.72 + 0.28 * smoothstep(-0.4, 0.4, vDisplacement);
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  // ============================================
  // INIT
  // ============================================
  function init() {
    initPreloader();
  }
  // ============================================
  // PRELOADER
  // ============================================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    const bar = document.getElementById('preloaderBar');
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: function () {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        initApp();
      }
    });
    document.body.style.overflow = 'hidden';
    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function () {
        var v = Math.round(obj.val);
        counter.textContent = v;
        bar.style.width = v + '%';
      }
    })
    .to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut'
    }, '+=0.15');
  }
  // ============================================
  // APP INIT (runs after preloader)
  // ============================================
  function initApp() {
    gsap.registerPlugin(ScrollTrigger);
    if (!isTouch) initCursor();
    initThreeScene();
    initHeroAnimations();
    initAboutAnimations();
    initWorksAnimations();
    if (!isTouch) initWorksHover();
    initMagneticButtons();
    initNavScroll();
  }
  // ============================================
  // CUSTOM CURSOR
  // ============================================
  function initCursor() {
    var cursorEl = document.getElementById('cursor');
    var dot = cursorEl.querySelector('.cursor-dot');
    var outline = cursorEl.querySelector('.cursor-outline');
    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.normX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.normY = -(e.clientY / window.innerHeight) * 2 + 1;
      gsap.to(dot, { x: mouse.x, y: mouse.y, duration: 0.08, overwrite: true });
      gsap.to(outline, { x: mouse.x, y: mouse.y, duration: 0.28, overwrite: true });
    });
    // Hover scale
    var interactives = document.querySelectorAll('a, button, .work-item, .magnetic-btn');
    interactives.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        gsap.to(outline, { width: 64, height: 64, borderColor: 'rgba(200,255,0,0.5)', duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(outline, { width: 40, height: 40, borderColor: 'rgba(240,236,226,0.5)', duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      });
    });
  }
  // ============================================
  // THREE.JS SCENE
  // ============================================
  function initThreeScene() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = isMobile ? 5 : 4.2;
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    var radius = isMobile ? 1.3 : 1.9;
    var detail = isMobile ? 4 : 5;
    var geometry = new THREE.IcosahedronGeometry(radius, detail);
    var material = new THREE.ShaderMaterial({
      uniforms: {
        uTime:      { value: 0 },
        uFrequency: { value: 1.4 },
        uAmplitude: { value: 0.32 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: false
    });
    blob = new THREE.Mesh(geometry, material);
    blob.position.x = isMobile ? 0 : 0.5;
    blob.position.y = isMobile ? 0.3 : 0;
    scene.add(blob);
    clock = new THREE.Clock();
    window.addEventListener('resize', onResize);
    animateScene();
    // Parallax: hide blob after hero with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        onUpdate: function (self) {
          if (blob) blob.material.opacity = 1 - self.progress;
        }
      });
    }
  }
  function animateScene() {
    requestAnimationFrame(animateScene);
    if (!blob) return;
    var elapsed = clock.getElapsedTime();
    blob.material.uniforms.uTime.value = elapsed;
    blob.rotation.y = elapsed * 0.06;
    blob.rotation.x = Math.sin(elapsed * 0.08) * 0.12;
    // Mouse follow
    if (!isTouch) {
      blob.rotation.y += mouse.normX * 0.015;
      blob.rotation.x += mouse.normY * 0.01;
    }
    renderer.render(scene, camera);
  }
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  // ============================================
  // HERO ANIMATIONS
  // ============================================
  function initHeroAnimations() {
    // Split title words into individual chars
    var titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach(function (word) {
      var text = word.textContent;
      word.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.className = 'char';
        word.appendChild(span);
      }
    });
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    // Nav
    tl.to('.nav', { opacity: 1, y: 0, duration: 0.8 }, 0);
    // Eyebrow
    tl.to('.hero-eyebrow .line-inner', { y: 0, duration: 1, ease: 'power3.out' }, 0.1);
    // Title characters
    tl.from('.title-word .char', {
      y: '110%',
      rotationX: -60,
      opacity: 0,
      stagger: 0.025,
      duration: 1.3,
      ease: 'power4.out'
    }, 0.25);
    // Bottom tagline
    tl.to('.hero-tagline .line-inner', {
      y: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power3.out'
    }, 0.8);
    // Scroll indicator
    tl.from('#heroScroll', { opacity: 0, y: 20, duration: 0.7 }, 1.1);
    // Parallax title on scroll
    gsap.to('.hero-title', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    });
    gsap.to('.hero-eyebrow', {
      yPercent: -40,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '60% top',
        scrub: 0.6
      }
    });
  }
  // ============================================
  // ABOUT ANIMATIONS
  // ============================================
  function initAboutAnimations() {
    // Marquee scroll-driven motion
    var track = document.getElementById('marqueeTrack');
    if (track) {
      gsap.to(track, {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-marquee',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }
    // About label
    gsap.from('.about-label', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: { trigger: '.about-label', start: 'top 85%' }
    });
    // About descriptions
    gsap.utils.toArray('.about-desc').forEach(function (el, i) {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    // Stat counters
    var statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(function (num) {
      var target = parseInt(num.getAttribute('data-target'), 10);
      var obj = { val: 0 };
      ScrollTrigger.create({
        trigger: num,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              num.textContent = Math.round(obj.val);
            }
          });
        }
      });
    });
    // Stat items stagger
    gsap.utils.toArray('.stat').forEach(function (el, i) {
      gsap.from(el, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }
  // ============================================
  // WORKS ANIMATIONS
  // ============================================
  function initWorksAnimations() {
    // Header
    gsap.from('.works-label', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: { trigger: '.works-header', start: 'top 85%' }
    });
    gsap.from('.works-title', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.works-header', start: 'top 80%' }
    });
    // Work items stagger
    gsap.utils.toArray('.work-item').forEach(function (item, i) {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 90%' }
      });
    });
  }
  // ============================================
  // WORKS HOVER IMAGE FOLLOWER
  // ============================================
  function initWorksHover() {
    var wrapper = document.getElementById('workImgWrap');
    var img = document.getElementById('workImg');
    if (!wrapper || !img) return;
    var items = document.querySelectorAll('.work-item');
    var isVisible = false;
    items.forEach(function (item) {
      var src = item.getAttribute('data-img');
      item.addEventListener('mouseenter', function () {
        if (src) {
          img.src = src;
          img.alt = item.querySelector('.work-name').textContent + ' preview';
        }
        isVisible = true;
        gsap.to(wrapper, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: true });
        gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out' });
      });
      item.addEventListener('mouseleave', function () {
        isVisible = false;
        gsap.to(wrapper, { opacity: 0, scale: 0.85, duration: 0.4, ease: 'power3.out', overwrite: true });
        gsap.to(img, { scale: 1.15, duration: 0.4 });
      });
      item.addEventListener('mousemove', function (e) {
        if (!isVisible) return;
        gsap.to(wrapper, {
          x: e.clientX - 160,
          y: e.clientY - 200,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }
  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  function initMagneticButtons() {
    if (isTouch) return;
    var magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }
  // ============================================
  // NAV SCROLL EFFECT
  // ============================================
  function initNavScroll() {
    var nav = document.getElementById('nav');
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: function (self) {
        if (self.scroll() > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    });
  }
  // ============================================
  // BOOT
  // ============================================
  window.addEventListener('DOMContentLoaded', init);
})();
