import React, { useEffect, useRef, useState, Component } from 'react';
import * as THREE from 'three';

/**
 * ErrorBoundary for 3D Workspace
 */
export class WorkspaceErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('3D Workspace Error caught by boundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <WorkspaceVisualFallback />;
    }
    return this.props.children;
  }
}

/**
 * High-Quality Fallback Visual (SVG / CSS 3D Game Dev Workspace)
 * Guarantees zero blank screen on any browser or WebGL-restricted environment.
 */
function WorkspaceVisualFallback() {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-[560px] rounded-3xl bg-[#1C1C1C] border border-[#303030] p-6 shadow-2xl overflow-hidden flex flex-col justify-between">
        {/* Ambient Orange Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A18]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#303030] relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF7A18]" />
            <span className="w-3 h-3 rounded-full bg-[#FFC857]" />
            <span className="w-3 h-3 rounded-full bg-[#303030]" />
            <span className="ml-2 text-xs font-mono text-[#FAFAFA] font-bold">Unity 6 Game Dev Workspace</span>
          </div>
          <span className="text-[10px] font-mono text-[#FF7A18] font-bold uppercase tracking-wider bg-[#FF7A18]/10 px-2.5 py-1 rounded-md border border-[#FF7A18]/30">
            60 FPS | C# Combat Engine
          </span>
        </div>

        {/* Workspace Display Graphic */}
        <div className="my-5 relative z-10 space-y-4">
          {/* Monitor Screen Representation */}
          <div className="p-4 rounded-xl bg-[#111111] border border-[#303030] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#A3A3A3] pb-2 border-b border-[#222222]">
              <span className="text-[#FF7A18] font-bold">◈ Scene: Combat_Arena_PBR</span>
              <span>PlayerController.cs (C#)</span>
              <span className="text-emerald-400">▶ PLAYING</span>
            </div>
            
            {/* 3D Wireframe Scene Preview */}
            <div className="h-28 rounded-lg bg-[#18191E] border border-white/5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#FF7A18_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF7A18] to-[#FFC857] flex items-center justify-center shadow-lg shadow-[#FF7A18]/40 text-white font-bold text-lg animate-pulse">
                  🎮
                </div>
                <span className="text-[10px] font-mono text-[#FAFAFA] font-bold">Kinematic Player Loop Active</span>
              </div>
            </div>
          </div>

          {/* Desktop Hardware Accessories Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#141416] border border-[#303030] text-center">
              <div className="text-lg mb-1">⌨️</div>
              <div className="text-[11px] font-bold text-[#FAFAFA]">Mechanical KB</div>
              <div className="text-[9px] font-mono text-[#FF7A18]">Orange Backlit WASD</div>
            </div>
            <div className="p-3 rounded-xl bg-[#141416] border border-[#303030] text-center">
              <div className="text-lg mb-1">🎯</div>
              <div className="text-[11px] font-bold text-[#FAFAFA]">DualSense Controller</div>
              <div className="text-[9px] font-mono text-[#FFC857]">Vibration &amp; Triggers</div>
            </div>
            <div className="p-3 rounded-xl bg-[#141416] border border-[#303030] text-center">
              <div className="text-lg mb-1">🎧</div>
              <div className="text-[11px] font-bold text-[#FAFAFA]">Studio Headset</div>
              <div className="text-[9px] font-mono text-[#FF7A18]">Spatial Audio Rig</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#303030] text-[10px] font-mono text-[#A3A3A3] relative z-10">
          <span>PBR Shaders • State Machines • Decoupled Architecture</span>
          <span className="text-[#FF7A18] font-semibold">Unity &amp; C# Studio</span>
        </div>
      </div>
    </div>
  );
}

/**
 * HeroWorkspace3D Component
 */
export default function HeroWorkspace3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer = null;
    let animationFrameId = null;
    let screenTexture = null;

    try {
      let width = Math.max(container.clientWidth || 0, 400);
      let height = Math.max(container.clientHeight || 0, 400);

      // 1. Scene & Camera
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
      const defaultCamPos = new THREE.Vector3(0, 4.3, 6.6);
      camera.position.copy(defaultCamPos);
      const lookTarget = new THREE.Vector3(0, 0.75, 0);
      camera.lookAt(lookTarget);

      // 2. Initialize WebGLRenderer directly inside try/catch (DO NOT call getContext manually)
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      // 3. Lighting System
      const ambientLight = new THREE.AmbientLight(0x222226, 2.0);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(5.5, 8.5, 4.5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      const d = 4.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      scene.add(keyLight);

      const orangeRimLight = new THREE.PointLight(0xff7a18, 3.5, 12, 1.2);
      orangeRimLight.position.set(-2.4, 2.8, -1.2);
      scene.add(orangeRimLight);

      const screenGlowLight = new THREE.PointLight(0xffa043, 2.2, 7, 1.4);
      screenGlowLight.position.set(0, 1.8, 0.8);
      scene.add(screenGlowLight);

      const goldFillLight = new THREE.DirectionalLight(0xffc857, 0.8);
      goldFillLight.position.set(-4, 3, 3);
      scene.add(goldFillLight);

      // 4. PBR Materials
      const darkChassisMat = new THREE.MeshStandardMaterial({
        color: 0x18181c,
        roughness: 0.35,
        metalness: 0.8
      });

      const matteDarkMat = new THREE.MeshStandardMaterial({
        color: 0x141416,
        roughness: 0.7,
        metalness: 0.2
      });

      const orangeAccentMat = new THREE.MeshStandardMaterial({
        color: 0xff7a18,
        emissive: 0xff7a18,
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.5
      });

      const orangeGlowMat = new THREE.MeshStandardMaterial({
        color: 0xff7a18,
        emissive: 0xff7a18,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });

      const goldAccentMat = new THREE.MeshStandardMaterial({
        color: 0xffc857,
        emissive: 0xffc857,
        emissiveIntensity: 0.25,
        roughness: 0.35,
        metalness: 0.7
      });

      const rubberMat = new THREE.MeshStandardMaterial({
        color: 0x1f1f22,
        roughness: 0.9,
        metalness: 0.1
      });

      const chromeMat = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        roughness: 0.15,
        metalness: 0.95
      });

      // Root Workspace Group for Parallax
      const workspaceGroup = new THREE.Group();
      scene.add(workspaceGroup);

      // A. DESK PAD
      const padShape = new THREE.BoxGeometry(6.6, 0.06, 4.4);
      const padMat = new THREE.MeshStandardMaterial({ color: 0x131315, roughness: 0.85 });
      const deskPad = new THREE.Mesh(padShape, padMat);
      deskPad.position.set(0, -0.03, 0.2);
      deskPad.receiveShadow = true;
      workspaceGroup.add(deskPad);

      const borderGeom = new THREE.BoxGeometry(6.64, 0.02, 4.44);
      const borderMat = new THREE.MeshStandardMaterial({ color: 0xff7a18, roughness: 0.5 });
      const padBorder = new THREE.Mesh(borderGeom, borderMat);
      padBorder.position.set(0, -0.05, 0.2);
      workspaceGroup.add(padBorder);

      // B. MAIN MONITOR
      const monitorGroup = new THREE.Group();
      monitorGroup.position.set(0, 0, -0.75);

      const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.85, 0.08, 32), darkChassisMat);
      standBase.position.set(0, 0.04, 0);
      standBase.castShadow = true;
      standBase.receiveShadow = true;
      monitorGroup.add(standBase);

      const standNeck = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.45, 0.18), darkChassisMat);
      standNeck.position.set(0, 0.75, -0.15);
      standNeck.rotation.x = 0.08;
      standNeck.castShadow = true;
      monitorGroup.add(standNeck);

      const monitorWidth = 3.8;
      const monitorHeight = 2.3;
      const monitorBezel = new THREE.Mesh(new THREE.BoxGeometry(monitorWidth, monitorHeight, 0.12), darkChassisMat);
      monitorBezel.position.set(0, 1.85, 0);
      monitorBezel.castShadow = true;
      monitorGroup.add(monitorBezel);

      const chinBar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.03, 0.02), orangeAccentMat);
      chinBar.position.set(0, 0.76, 0.065);
      monitorGroup.add(chinBar);

      const lightbarGeom = new THREE.CylinderGeometry(0.045, 0.045, 2.8, 16);
      lightbarGeom.rotateZ(Math.PI / 2);
      const lightbar = new THREE.Mesh(lightbarGeom, darkChassisMat);
      lightbar.position.set(0, 3.03, 0.06);
      monitorGroup.add(lightbar);

      const lightbarLED = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.02, 0.03), goldAccentMat);
      lightbarLED.position.set(0, 3.0, 0.07);
      monitorGroup.add(lightbarLED);

      // Dynamic High-Res Unity IDE Screen Texture
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 620;
      const sctx = screenCanvas.getContext('2d');

      if (sctx) {
        sctx.fillStyle = '#18191D';
        sctx.fillRect(0, 0, 1024, 620);

        sctx.fillStyle = '#22242B';
        sctx.fillRect(0, 0, 1024, 42);
        sctx.fillStyle = '#31353E';
        sctx.fillRect(0, 42, 1024, 2);

        sctx.fillStyle = '#FF7A18';
        sctx.font = 'bold 13px system-ui, sans-serif';
        sctx.fillText('◈ UNITY 6', 16, 26);

        sctx.fillStyle = '#9CA3AF';
        sctx.font = '11px monospace';
        sctx.fillText('File  Edit  Assets  GameObject  Component  Jobs  Window  Help', 110, 26);

        sctx.fillStyle = '#FF7A18';
        sctx.fillRect(470, 8, 84, 26);
        sctx.fillStyle = '#FFFFFF';
        sctx.font = 'bold 12px system-ui, sans-serif';
        sctx.fillText('▶ PLAYING', 482, 25);

        sctx.fillStyle = '#4ADE80';
        sctx.font = 'bold 11px monospace';
        sctx.fillText('FPS: 60 | 4.2ms | DrawCalls: 38', 780, 26);

        // Hierarchy
        sctx.fillStyle = '#1C1E24';
        sctx.fillRect(0, 44, 200, 410);
        sctx.fillStyle = '#2A2D37';
        sctx.fillRect(199, 44, 2, 410);

        sctx.fillStyle = '#D1D5DB';
        sctx.font = 'bold 11px system-ui, sans-serif';
        sctx.fillText('HIERARCHY', 14, 65);

        const hierarchyItems = [
          { name: '▼ Scene_Alpha_Gameplay', color: '#9CA3AF', indent: 14 },
          { name: '  ▶ Directional Light', color: '#9CA3AF', indent: 24 },
          { name: '  ▼ Player_Badri (C#)', color: '#FF7A18', indent: 24, active: true },
          { name: '      • MainCamera', color: '#D1D5DB', indent: 40 },
          { name: '      • Sword_Hitbox', color: '#FFC857', indent: 40 },
          { name: '  ▶ Boss_AI_Controller', color: '#D1D5DB', indent: 24 },
          { name: '  ▶ Arena_Geometry_PBR', color: '#9CA3AF', indent: 24 },
          { name: '  ▶ Event_Broadcaster', color: '#60A5FA', indent: 24 },
          { name: '  ▶ Canvas_HUD_Overlay', color: '#9CA3AF', indent: 24 }
        ];

        hierarchyItems.forEach((item, idx) => {
          const y = 90 + idx * 22;
          if (item.active) {
            sctx.fillStyle = 'rgba(255, 122, 24, 0.2)';
            sctx.fillRect(8, y - 14, 184, 20);
          }
          sctx.fillStyle = item.color;
          sctx.font = item.active ? 'bold 11px monospace' : '11px monospace';
          sctx.fillText(item.name, item.indent, y);
        });

        // Scene Viewport
        sctx.fillStyle = '#111215';
        sctx.fillRect(201, 44, 580, 410);

        sctx.fillStyle = '#22252D';
        sctx.fillRect(201, 44, 580, 24);
        sctx.fillStyle = '#FF7A18';
        sctx.font = 'bold 11px system-ui, sans-serif';
        sctx.fillText('Scene', 215, 60);
        sctx.fillStyle = '#6B7280';
        sctx.fillText('Game', 270, 60);

        // Grid
        sctx.strokeStyle = 'rgba(255, 122, 24, 0.15)';
        sctx.lineWidth = 1;
        for (let i = 220; i < 780; i += 32) {
          sctx.beginPath();
          sctx.moveTo(i, 80);
          sctx.lineTo(i, 440);
          sctx.stroke();
        }
        for (let j = 80; j < 440; j += 32) {
          sctx.beginPath();
          sctx.moveTo(201, j);
          sctx.lineTo(780, j);
          sctx.stroke();
        }

        // Isometric Platform
        const cx = 490;
        const cy = 250;
        sctx.fillStyle = 'rgba(28, 28, 35, 0.8)';
        sctx.strokeStyle = '#FF7A18';
        sctx.lineWidth = 2.5;
        sctx.beginPath();
        sctx.moveTo(cx, cy - 60);
        sctx.lineTo(cx + 170, cy);
        sctx.lineTo(cx, cy + 60);
        sctx.lineTo(cx - 170, cy);
        sctx.closePath();
        sctx.fill();
        sctx.stroke();

        sctx.fillStyle = '#FFA043';
        sctx.beginPath();
        sctx.arc(cx, cy - 25, 18, 0, Math.PI * 2);
        sctx.fill();

        // Gizmo
        sctx.lineWidth = 3;
        sctx.strokeStyle = '#EF4444';
        sctx.beginPath();
        sctx.moveTo(cx, cy - 25);
        sctx.lineTo(cx + 45, cy - 10);
        sctx.stroke();

        sctx.strokeStyle = '#22C55E';
        sctx.beginPath();
        sctx.moveTo(cx, cy - 25);
        sctx.lineTo(cx, cy - 80);
        sctx.stroke();

        sctx.strokeStyle = '#3B82F6';
        sctx.beginPath();
        sctx.moveTo(cx, cy - 25);
        sctx.lineTo(cx - 38, cy - 10);
        sctx.stroke();

        // Inspector
        sctx.fillStyle = '#1C1E24';
        sctx.fillRect(781, 44, 243, 410);
        sctx.fillStyle = '#2A2D37';
        sctx.fillRect(780, 44, 2, 410);

        sctx.fillStyle = '#D1D5DB';
        sctx.font = 'bold 11px system-ui, sans-serif';
        sctx.fillText('INSPECTOR', 795, 65);

        sctx.fillStyle = '#FF7A18';
        sctx.font = 'bold 11px monospace';
        sctx.fillText('● PlayerController.cs', 795, 90);

        const inspectorRows = [
          'Transform',
          ' Position  [ 0.0 , 1.2 , 0.0 ]',
          ' Rotation  [ 0.0 , 45.0 , 0.0 ]',
          'Rigidbody (Kinematic: False)',
          'PlayerMovement (Script)',
          ' Walk Speed:      8.50',
          ' Jump Arc Force:  14.20',
          ' CombatCombo:     True',
          ' Health:          100/100'
        ];

        inspectorRows.forEach((row, idx) => {
          const y = 115 + idx * 20;
          const isHeader = !row.startsWith(' ');
          sctx.fillStyle = isHeader ? '#FFC857' : '#9CA3AF';
          sctx.font = isHeader ? 'bold 10px monospace' : '10px monospace';
          sctx.fillText(row, 795, y);
        });

        // Console
        sctx.fillStyle = '#18191E';
        sctx.fillRect(0, 455, 1024, 165);
        sctx.fillStyle = '#2A2D37';
        sctx.fillRect(0, 454, 1024, 2);

        sctx.fillStyle = '#D1D5DB';
        sctx.font = 'bold 11px system-ui, sans-serif';
        sctx.fillText('Project', 16, 474);
        sctx.fillStyle = '#FF7A18';
        sctx.fillText('Console (0 Errors, 0 Warnings)', 80, 474);

        sctx.fillStyle = '#4ADE80';
        sctx.font = '10px monospace';
        sctx.fillText('✔ [GameManager] Combat loop initialized. Input device: DualSense Controller.', 16, 502);
        sctx.fillText('✔ [Physics] Spatial collision partition: 64 voxels loaded.', 16, 524);
        sctx.fillText('✔ [Animator] BlendTree "Locomotion_Run" mapped to C# state machine.', 16, 546);
      }

      screenTexture = new THREE.CanvasTexture(screenCanvas);
      screenTexture.generateMipmaps = true;

      const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
      const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(monitorWidth - 0.15, monitorHeight - 0.15), screenMat);
      screenMesh.position.set(0, 1.85, 0.065);
      monitorGroup.add(screenMesh);

      workspaceGroup.add(monitorGroup);

      // C. KEYBOARD
      const keyboardGroup = new THREE.Group();
      keyboardGroup.position.set(0, 0.05, 0.95);

      const kbChassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.88), matteDarkMat);
      kbChassis.position.set(0, 0.05, 0);
      kbChassis.castShadow = true;
      kbChassis.receiveShadow = true;
      keyboardGroup.add(kbChassis);

      const kbGlow = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.02, 0.92), orangeGlowMat);
      kbGlow.position.set(0, 0.02, 0);
      keyboardGroup.add(kbGlow);

      const keyCapGeom = new THREE.BoxGeometry(0.12, 0.05, 0.11);
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 14; c++) {
          const isWASD = (r === 2 && (c === 2 || c === 3 || c === 4)) || (r === 1 && c === 3);
          const isSpace = (r === 4 && c >= 4 && c <= 8);
          const isEnter = (r === 2 && c === 12);

          let kMat = darkChassisMat;
          if (isWASD || isEnter) kMat = orangeAccentMat;
          else if (isSpace) kMat = goldAccentMat;

          const keyMesh = new THREE.Mesh(keyCapGeom, kMat);
          keyMesh.position.set(-0.95 + c * 0.15, 0.12, -0.28 + r * 0.14);
          keyMesh.castShadow = true;
          keyboardGroup.add(keyMesh);
        }
      }
      workspaceGroup.add(keyboardGroup);

      // D. MOUSE
      const mouseGroup = new THREE.Group();
      mouseGroup.position.set(1.4, 0.04, 1.05);
      mouseGroup.rotation.y = -0.12;

      const mouseBodyGeom = new THREE.SphereGeometry(0.24, 16, 12);
      mouseBodyGeom.scale(0.85, 0.5, 1.4);
      const mouseBody = new THREE.Mesh(mouseBodyGeom, darkChassisMat);
      mouseBody.position.set(0, 0.08, 0);
      mouseBody.castShadow = true;
      mouseGroup.add(mouseBody);

      const wheelGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 12);
      wheelGeom.rotateZ(Math.PI / 2);
      const wheelMesh = new THREE.Mesh(wheelGeom, orangeGlowMat);
      wheelMesh.position.set(0, 0.17, -0.12);
      mouseGroup.add(wheelMesh);

      workspaceGroup.add(mouseGroup);

      // E. GAME CONTROLLER
      const controllerGroup = new THREE.Group();
      controllerGroup.position.set(-1.85, 0.08, 0.7);
      controllerGroup.rotation.y = 0.38;

      const ctrlBody = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, 0.62), darkChassisMat);
      ctrlBody.position.set(0, 0.06, 0);
      ctrlBody.castShadow = true;
      controllerGroup.add(ctrlBody);

      const gripLGeom = new THREE.CylinderGeometry(0.14, 0.18, 0.65, 12);
      gripLGeom.rotateZ(0.35);
      const gripL = new THREE.Mesh(gripLGeom, rubberMat);
      gripL.position.set(-0.46, -0.06, 0.12);
      gripL.castShadow = true;
      controllerGroup.add(gripL);

      const gripRGeom = new THREE.CylinderGeometry(0.14, 0.18, 0.65, 12);
      gripRGeom.rotateZ(-0.35);
      const gripR = new THREE.Mesh(gripRGeom, rubberMat);
      gripR.position.set(0.46, -0.06, 0.12);
      gripR.castShadow = true;
      controllerGroup.add(gripR);

      const stickGeom = new THREE.CylinderGeometry(0.08, 0.06, 0.08, 12);
      const thumbstickL = new THREE.Mesh(stickGeom, rubberMat);
      thumbstickL.position.set(-0.22, 0.16, 0.08);
      controllerGroup.add(thumbstickL);

      const thumbstickR = new THREE.Mesh(stickGeom, rubberMat);
      thumbstickR.position.set(0.16, 0.16, -0.04);
      controllerGroup.add(thumbstickR);

      const btnGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.04, 8);
      const btnA = new THREE.Mesh(btnGeom, orangeAccentMat);
      btnA.position.set(0.24, 0.16, 0.14);
      controllerGroup.add(btnA);

      workspaceGroup.add(controllerGroup);

      // F. GAMING HEADSET ON STAND
      const headsetGroup = new THREE.Group();
      headsetGroup.position.set(-2.4, 0, -0.4);
      headsetGroup.rotation.y = 0.55;

      const hsBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.42, 0.06, 16), darkChassisMat);
      hsBase.position.set(0, 0.03, 0);
      headsetGroup.add(hsBase);

      const hsStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12), chromeMat);
      hsStem.position.set(0, 0.95, 0);
      headsetGroup.add(hsStem);

      const headband = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.05, 8, 24, Math.PI), rubberMat);
      headband.position.set(0, 1.48, 0);
      headsetGroup.add(headband);

      const earcupGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.18, 16);
      earcupGeom.rotateZ(Math.PI / 2);
      const earcupL = new THREE.Mesh(earcupGeom, darkChassisMat);
      earcupL.position.set(-0.48, 1.44, 0);
      headsetGroup.add(earcupL);

      const earcupR = new THREE.Mesh(earcupGeom, darkChassisMat);
      earcupR.position.set(0.48, 1.44, 0);
      headsetGroup.add(earcupR);

      const ringGeom = new THREE.TorusGeometry(0.18, 0.016, 6, 16);
      ringGeom.rotateY(Math.PI / 2);
      const ringL = new THREE.Mesh(ringGeom, orangeAccentMat);
      ringL.position.set(-0.58, 1.44, 0);
      headsetGroup.add(ringL);

      workspaceGroup.add(headsetGroup);

      // G. DESK ACCESSORIES
      const mugGroup = new THREE.Group();
      mugGroup.position.set(2.4, 0, -0.3);
      const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.52, 16), darkChassisMat);
      mugBody.position.set(0, 0.26, 0);
      mugGroup.add(mugBody);
      const mugBand = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.24, 0.12, 16), orangeAccentMat);
      mugBand.position.set(0, 0.32, 0);
      mugGroup.add(mugBand);
      workspaceGroup.add(mugGroup);

      setIsLoaded(true);

      // Parallax interaction
      let clock = new THREE.Clock();
      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

      const handlePointerMove = (e) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = Math.max(container.clientWidth || 0, 300);
        const h = Math.max(container.clientHeight || 0, 300);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        if (!prefersReduced) {
          mouse.x += (mouse.targetX - mouse.x) * 0.045;
          mouse.y += (mouse.targetY - mouse.y) * 0.045;

          camera.position.x = defaultCamPos.x + mouse.x * 0.5;
          camera.position.y = defaultCamPos.y + mouse.y * 0.4;
          camera.lookAt(lookTarget.x, lookTarget.y + 0.1, lookTarget.z);

          workspaceGroup.rotation.y = Math.sin(time * 0.45) * 0.012;
          screenGlowLight.intensity = 2.0 + Math.sin(time * 1.8) * 0.25;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);

        scene.traverse((obj) => {
          if (obj.isMesh) {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
              else obj.material.dispose();
            }
          }
        });

        if (screenTexture) screenTexture.dispose();
        if (renderer) renderer.dispose();
      };
    } catch (err) {
      console.warn('Three.js workspace error caught, falling back gracefully:', err);
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <WorkspaceVisualFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[390px] lg:h-[440px] flex items-center justify-center select-none"
      aria-label="3D Game Development Workspace"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#FF7A18]/15 via-[#FFC857]/8 to-transparent blur-[120px]" />
      </div>
    </div>
  );
}
