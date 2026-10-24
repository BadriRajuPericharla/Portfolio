import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { RotateCcw } from 'lucide-react';

/**
 * Hero3DFoxPullScene
 *
 * Renders the actual 3D Fox model (public/models/fox_f.fbx) in Three.js WebGL:
 * - Real 3D Fox mesh with extracted 2048x2048 base color texture
 * - Corrected model orientation (Y-up, feet at ground plane Y=0, snout forward +Z)
 * - Procedural running cadence from LEFT to RIGHT
 * - Rope attaches near front paws/chest to incoming name plaque
 * - Strained pulling action with backward body lean (-20°) and recoil
 * - Full name "Pericharla Badri Raju" enters from LEFT on ONE continuous horizontal line
 * - Elastic settle bounce with subtle orange impact burst
 * - Rope releases; Fox turns 3D toward visitor, nods/waves, speech bubble says "Hi!"
 * - Remains in a friendly 3D idle breathing pose beside the name
 */

const T_RUN_DUR = 1200;    // ms: Fox runs in from left
const T_GRAB_DUR = 450;    // ms: Fox plants paws and grips rope
const T_PULL_DUR = 1500;   // ms: Strained pull dragging name into center
const T_BOUNCE_DUR = 500;  // ms: Elastic bounce & settle
const T_WAVE_DUR = 400;    // ms: Turn toward visitor & wave

export default function Hero3DFoxPullScene({ name = 'Pericharla Badri Raju' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ropeCanvasRef = useRef(null);

  // Animation stages: 0=loading/idle, 1=running, 2=grab, 3=pulling, 4=settling, 5=waving/idle
  const [stage, setStage] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Animated name offset and effects
  const [nameX, setNameX] = useState(-700);
  const [bounceOffset, setBounceOffset] = useState(0);
  const [showRope, setShowRope] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // References for Three.js state
  const sceneState = useRef({
    foxGroup: null,
    foxMesh: null,
    foxWorldX: -10,
    foxTargetX: -10,
    animTime: 0,
    runSpeed: 0,
    pullLean: 0,
    facingAngle: Math.PI / 2, // Facing right (+X)
    isWaving: false,
    waveAmount: 0
  });

  const handleReplay = useCallback(() => {
    setStage(0);
    setNameX(-700);
    setBounceOffset(0);
    setShowRope(false);
    setShowBubble(false);
    setShowImpact(false);
    sceneState.current.foxWorldX = -10;
    sceneState.current.pullLean = 0;
    sceneState.current.facingAngle = Math.PI / 2;
    sceneState.current.isWaving = false;
    setReplayKey((k) => k + 1);
  }, []);

  // Initialize Three.js Scene with the Fox FBX
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 260;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 7.8);
    camera.lookAt(0, 0.8, 0);

    // 2. WebGL Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. Cinematic Lighting (Charcoal & Warm Orange)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    dirLight.position.set(4, 6, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Warm Orange Rim Light for game dev aesthetic
    const rimLight = new THREE.DirectionalLight(0xff7a18, 2.8);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0xffc857, 0.7);
    bottomFill.position.set(0, -2, 3);
    scene.add(bottomFill);

    // 4. Load Fox Texture & FBX Model
    const textureLoader = new THREE.TextureLoader();
    const foxTexture = textureLoader.load('/models/fox_texture.png', () => {
      renderer.render(scene, camera);
    });
    foxTexture.colorSpace = THREE.SRGBColorSpace;
    foxTexture.flipY = true;

    const fbxLoader = new FBXLoader();
    const foxRootGroup = new THREE.Group();
    scene.add(foxRootGroup);
    sceneState.current.foxGroup = foxRootGroup;

    fbxLoader.load(
      '/models/fox_f.fbx',
      (fbx) => {
        let targetMesh = null;
        fbx.traverse((child) => {
          if (child.isMesh) {
            targetMesh = child;
            // Correct Blender/Maya -90 deg X export rotation so paws touch ground
            child.rotation.x = 0;
            child.castShadow = true;
            child.receiveShadow = true;

            // Apply high-res diffuse map with game-quality shading
            child.material = new THREE.MeshStandardMaterial({
              map: foxTexture,
              roughness: 0.7,
              metalness: 0.12,
              color: 0xffffff
            });
          }
        });

        // Center model geometry and align ground paws to Y=0
        if (targetMesh) {
          const bbox = new THREE.Box3().setFromObject(targetMesh);
          const center = new THREE.Vector3();
          bbox.getCenter(center);

          // Shift geometry so origin is bottom center of paws
          targetMesh.position.x = -center.x;
          targetMesh.position.y = -bbox.min.y;
          targetMesh.position.z = -center.z;
        }

        // Scale model to natural fit in hero scene (~1.8m height)
        const MODEL_SCALE = 0.046;
        fbx.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

        foxRootGroup.add(fbx);
        sceneState.current.foxMesh = fbx;
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.error('FBX Load error:', err);
        setLoadError(err.message || 'Error loading 3D Fox model');
      }
    );

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 900;
      height = container.clientHeight || 260;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 5. Render & Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animateLoop = () => {
      animId = requestAnimationFrame(animateLoop);
      const delta = clock.getDelta();
      const st = sceneState.current;
      st.animTime += delta;

      if (st.foxGroup) {
        // Position Fox along X
        st.foxGroup.position.x = st.foxWorldX;

        // Procedural Running Movement (Cadence, vertical bob, and tilt)
        if (st.runSpeed > 0.01) {
          const runFreq = 16;
          // Up-and-down stride bounce
          const strideBounce = Math.abs(Math.sin(st.animTime * runFreq)) * 0.18 * st.runSpeed;
          st.foxGroup.position.y = strideBounce;

          // Pitch forward / backward stride tilt
          const pitch = Math.sin(st.animTime * runFreq) * 0.12 * st.runSpeed;
          // Yaw sway
          const yawSway = Math.sin(st.animTime * runFreq * 0.5) * 0.06 * st.runSpeed;

          st.foxGroup.rotation.z = -pitch;
          st.foxGroup.rotation.y = st.facingAngle + yawSway;
        } else if (st.pullLean > 0.01) {
          // Strained Pulling Pose: lean back, lower hips into ground
          st.foxGroup.position.y = -0.06 * st.pullLean;
          st.foxGroup.rotation.z = 0.32 * st.pullLean; // Lean back toward left (-X)
          st.foxGroup.rotation.y = st.facingAngle;
        } else if (st.isWaving) {
          // Friendly Greeting & Wave: turn 3D toward visitor, nod and playful paw bounce
          const waveCycle = Math.sin(st.animTime * 6);
          st.foxGroup.position.y = Math.abs(Math.sin(st.animTime * 3)) * 0.08;
          st.foxGroup.rotation.y = st.facingAngle + waveCycle * 0.1;
          st.foxGroup.rotation.z = Math.sin(st.animTime * 6) * 0.06;
        } else {
          // Idle breathing pose
          const breath = Math.sin(st.animTime * 2.2);
          st.foxGroup.position.y = breath * 0.03;
          st.foxGroup.rotation.y = st.facingAngle;
          st.foxGroup.rotation.z = breath * 0.02;
        }
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Main Animation Timeline (Synchronizing 3D Fox, Rope, and Name Plate)
  useEffect(() => {
    if (!modelLoaded) return;

    if (prefersReduced.current) {
      setStage(5);
      setNameX(110);
      setBounceOffset(0);
      setShowRope(false);
      setShowBubble(true);
      setShowImpact(false);
      sceneState.current.foxWorldX = 2.7;
      sceneState.current.facingAngle = 0.2;
      sceneState.current.isWaving = true;
      return;
    }

    let cancelled = false;
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const runTimeline = async () => {
      await wait(300);
      if (cancelled) return;

      // STAGE 1: 3D FOX ENTRANCE (Runs in from left)
      setStage(1);
      sceneState.current.facingAngle = Math.PI / 2; // Facing right
      sceneState.current.runSpeed = 1.0;
      sceneState.current.pullLean = 0;

      const runStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - runStart) / T_RUN_DUR, 1);
          const ease = easeOutCubic(t);
          sceneState.current.foxWorldX = -9 + (2.0 - -9) * ease;
          if (t < 1) requestAnimationFrame(tick);
          else res();
        };
        requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // STAGE 2: ROPE ATTACHMENT (Fox plants paws, grabs rope)
      setStage(2);
      sceneState.current.runSpeed = 0;
      setShowRope(true);
      await wait(T_GRAB_DUR);
      if (cancelled) return;

      // STAGE 3: PULLING ACTION (Fox leans back & heaves to the right)
      setStage(3);
      const pullStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - pullStart) / T_PULL_DUR, 1);
          const ease = easeInOutQuad(t);

          // Fox strains from X=2.0 to X=2.7, with backward lean
          sceneState.current.foxWorldX = 2.0 + (2.7 - 2.0) * ease;
          sceneState.current.pullLean = Math.sin(t * Math.PI) * 1.0 + 0.3 * (1 - t);

          // Name slides in from -700 to 110 (centered)
          setNameX(-700 + (110 - -700) * ease);

          if (t < 1) requestAnimationFrame(tick);
          else res();
        };
        requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // STAGE 4: SETTLE & IMPACT BOUNCE
      setStage(4);
      sceneState.current.pullLean = 0;
      setShowImpact(true);

      const bounceStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - bounceStart) / T_BOUNCE_DUR, 1);
          const decay = Math.sin(t * Math.PI * 2.5) * 12 * (1 - t);
          setBounceOffset(decay);
          if (t < 1) requestAnimationFrame(tick);
          else {
            setBounceOffset(0);
            res();
          }
        };
        requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // STAGE 5: RELEASE ROPE, TURN TOWARD VISITOR & SAY HI!
      setShowRope(false);
      setShowImpact(false);
      setStage(5);

      // Smoothly turn Fox toward visitor (Y rotation: PI/2 -> 0.25 rad)
      const turnStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - turnStart) / T_WAVE_DUR, 1);
          sceneState.current.facingAngle = (Math.PI / 2) + (0.25 - Math.PI / 2) * easeOutCubic(t);
          if (t < 1) requestAnimationFrame(tick);
          else res();
        };
        requestAnimationFrame(tick);
      });
      if (cancelled) return;

      sceneState.current.isWaving = true;
      setShowBubble(true);
    };

    runTimeline();

    return () => {
      cancelled = true;
    };
  }, [modelLoaded, replayKey]);

  // Derived dimensions for name plaque and rope attachment
  const plaqueWidth = 590;
  const plaqueHeight = 70;
  const currentNameRight = nameX + bounceOffset + plaqueWidth;
  const currentNameHitchY = 115;
  // Fox chest / front paw anchor in SVG overlay coordinates
  const foxPawX = 810;
  const foxPawY = 135;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center select-none py-1 overflow-visible"
      style={{ minHeight: '250px' }}
    >
      {/* Replay Intro Button (top-right) */}
      {stage === 5 && (
        <button
          onClick={handleReplay}
          className="absolute -top-6 right-2 sm:right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#A3A3A3] hover:text-[#FF7A18] bg-[#1C1C1C] hover:bg-[#262626] border border-white/10 hover:border-[#FF7A18]/40 transition-all shadow-sm z-30"
          title="Replay 3D Fox intro animation"
          aria-label="Replay intro animation"
        >
          <RotateCcw className="w-3 h-3 text-[#FF7A18]" />
          <span className="hidden sm:inline">Replay Intro</span>
        </button>
      )}

      {/* SVG Container: Name Plaque + Taut Rope + HUD Elements */}
      <div className="relative w-full overflow-visible flex items-center justify-center">
        <svg
          viewBox="0 0 1000 230"
          className="w-full h-auto max-h-[250px] overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Charcoal & Orange Gradients */}
            <linearGradient id="foxCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222222" />
              <stop offset="100%" stopColor="#181818" />
            </linearGradient>

            <linearGradient id="foxRopeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A18" />
              <stop offset="50%" stopColor="#FFC857" />
              <stop offset="100%" stopColor="#FF7A18" />
            </linearGradient>

            <linearGradient id="foxTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#FFF2E8" />
            </linearGradient>

            {/* Orange Depth Filter */}
            <filter id="foxOrangeDepth" x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#FF7A18" floodOpacity="0.35" />
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.9" />
            </filter>

            {/* Ground guideline */}
            <linearGradient id="foxGroundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#FF7A18" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#FFC857" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Ground shadow guide line */}
          <line x1="80" y1="210" x2="920" y2="210" stroke="url(#foxGroundGrad)" strokeWidth="2" strokeLinecap="round" />

          {/* 1. THE INCOMING NAME PLAQUE (ONE CONTINUOUS HORIZONTAL LINE) */}
          <g transform={`translate(${nameX + bounceOffset}, 80)`}>
            {/* Plaque Background */}
            <rect
              x="0"
              y="0"
              width={plaqueWidth}
              height={plaqueHeight}
              rx="18"
              fill="url(#foxCardGrad)"
              stroke="#FF7A18"
              strokeWidth="2"
              strokeOpacity="0.5"
              filter="drop-shadow(0 8px 24px rgba(0,0,0,0.65))"
            />

            {/* Inner border sheen */}
            <rect
              x="4"
              y="4"
              width={plaqueWidth - 8}
              height={plaqueHeight - 8}
              rx="14"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.04"
            />

            {/* HUD Corner Accents */}
            <path d="M 10 18 L 10 10 L 18 10" stroke="#FF7A18" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 580 18 L 580 10 L 572 10" stroke="#FFC857" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 10 52 L 10 60 L 18 60" stroke="#FF7A18" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 580 52 L 580 60 L 572 60" stroke="#FFC857" strokeWidth="2.5" strokeLinecap="round" />

            {/* Hitch Ring on front of plaque */}
            {showRope && (
              <g transform={`translate(${plaqueWidth - 2}, 35)`}>
                <circle cx="0" cy="0" r="8" fill="#FFC857" stroke="#FF7A18" strokeWidth="3" />
                <circle cx="0" cy="0" r="3" fill="#1C1C1C" />
              </g>
            )}

            {/* EXACT TEXT: "Pericharla Badri Raju" on ONE continuous horizontal line */}
            <text
              x={plaqueWidth / 2}
              y={38}
              fill="url(#foxTextGrad)"
              fontFamily="var(--font-heading, 'Space Grotesk', system-ui, sans-serif)"
              fontWeight="900"
              fontSize="34"
              letterSpacing="-0.01em"
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#foxOrangeDepth)"
            >
              {name}
            </text>

            {/* Sub-caption */}
            <text
              x={plaqueWidth / 2}
              y={56}
              fill="#A3A3A3"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
              fontSize="10"
              letterSpacing="0.22em"
              textAnchor="middle"
            >
              UNITY DEVELOPER • GAMEPLAY PROGRAMMER
            </text>
          </g>

          {/* 2. THE TAUT ORANGE ROPE */}
          {showRope && (
            <g>
              <path
                d={`M ${currentNameRight} ${currentNameHitchY} Q ${(currentNameRight + foxPawX) / 2} ${
                  stage === 3 ? 124 : 132
                } ${foxPawX} ${foxPawY}`}
                stroke="url(#foxRopeGrad)"
                strokeWidth={stage === 3 ? '5' : '4'}
                strokeLinecap="round"
                fill="none"
              />
              {/* Tension Spark */}
              {stage === 3 && (
                <circle
                  cx={(currentNameRight + foxPawX) / 2}
                  cy="125"
                  r="3.5"
                  fill="#FFF"
                  className="animate-ping"
                />
              )}
            </g>
          )}

          {/* 3. IMPACT PARTICLES (On name arrival) */}
          {showImpact && (
            <g transform="translate(400, 155)">
              <circle cx="-50" cy="0" r="6" fill="#FF7A18" opacity="0.8" />
              <circle cx="0" cy="-8" r="8" fill="#FFC857" opacity="0.9" />
              <circle cx="60" cy="2" r="5" fill="#FF7A18" opacity="0.8" />
              <circle cx="-120" cy="4" r="4" fill="#FFA043" opacity="0.7" />
              <circle cx="130" cy="-2" r="4.5" fill="#FFA043" opacity="0.7" />
            </g>
          )}

          {/* 4. WHITE SPEECH BUBBLE ("Hi!") */}
          {showBubble && (
            <g transform="translate(825, 20)">
              {/* Speech Bubble Container */}
              <rect
                x="0"
                y="0"
                width="62"
                height="38"
                rx="14"
                fill="#FFFFFF"
                stroke="#FF7A18"
                strokeWidth="2.5"
                filter="drop-shadow(0 4px 14px rgba(255,122,24,0.4))"
              />
              {/* Pointer triangle toward 3D Fox */}
              <polygon points="12,36 6,48 22,36" fill="#FFFFFF" />
              <path d="M 12 36 L 6 48 L 22 36" stroke="#FF7A18" strokeWidth="2.5" fill="#FFFFFF" strokeLinejoin="round" />
              {/* Speech Text: Hi! */}
              <text
                x="31"
                y="21"
                fill="#111111"
                fontFamily="var(--font-heading, system-ui, sans-serif)"
                fontWeight="900"
                fontSize="17"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Hi! 🦊
              </text>
            </g>
          )}
        </svg>

        {/* 3D WebGL Canvas Layer (Three.js Fox rendered on top) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 12 }}
        />
      </div>

      {/* Screen-reader H1 for SEO */}
      <h1 className="sr-only">{name}</h1>
    </div>
  );
}
