export const projectsData = [
  {
    id: "bossfight2d",
    title: "BossFight2D",
    genre: "2D Action Combat Game",
    category: "2D Games",
    playUrl: "https://badri-raju-pericharla.itch.io/bossfight2d",
    githubUrl: null, // Note: Set to repository link once public
    featured: true,
    accentColor: "#6366F1", // Indigo / Electric Violet
    bannerGradient: "from-indigo-900/40 via-purple-900/20 to-zinc-950",
    shortDescription: "Fast-paced 2D action game featuring responsive player combat, enemy interaction loops, and state-driven boss encounters.",
    tags: ["Unity", "C#", "2D Combat", "State Machine", "Health Systems"],
    verifiedMechanics: [
      "Player combat & hit detection",
      "Enemy interactions & attack telegraphing",
      "Modular health & damage calculation system",
      "Special abilities with cooldown tracking",
      "Gameplay state management (Intro, Fight, Victory, Defeat)"
    ],
    overview: "BossFight2D is a focused 2D action encounter built in Unity. The project centers around creating responsive, tactile combat mechanics where timing, evasion, and reading enemy behaviors are critical to survival.",
    gameplayDescription: "Players control an agile combatant facing a formidable boss entity. The encounter demands mastering dodge timings, attacking during vulnerability windows, and managing special ability cooldowns while avoiding multi-pattern enemy strikes.",
    myResponsibilities: [
      "Architected the player controller for crisp combat input, dodge windows, and attack animations.",
      "Designed and implemented the boss AI interaction logic with distinct attack phases and telegraph animations.",
      "Built a decoupled health and damage event pipeline allowing clean damage number calculation and UI updates.",
      "Programmed cooldown managers for special offensive abilities.",
      "Structured the game state manager handling fight initialization, phase transitions, and end-game triggers."
    ],
    technologies: ["Unity Engine (2D)", "C# Scripting", "RigidBody2D & 2D Physics", "Animator & Animation Controllers", "Unity Event System"],
    technicalChallenges: [
      "Preventing ghost hits and multi-tick damage during rapid melee hit-box collisions.",
      "Synchronizing boss attack animations with actual hurtbox trigger frames."
    ],
    solutionsImplemented: [
      "Implemented an attacker-side hit registry with brief I-Frames (invulnerability frames) ensuring each swing registers exactly once per target.",
      "Utilized Unity Animation Events to precisely toggle hurtboxes on active attack frames rather than broad timer estimates."
    ],
    mediaPlaceholders: {
      imagePath: "/projects/bossfight2d.png",
      videoUrl: null,
      customSvgKey: "bossfight"
    }
  },
  {
    id: "shadowsneak",
    title: "ShadowSneak",
    genre: "3D Stealth Infiltration",
    category: "3D Games",
    playUrl: "https://badri-raju-pericharla.itch.io/shadow-sneak",
    githubUrl: null,
    featured: true,
    accentColor: "#06B6D4", // Cyan / Electric Blue
    bannerGradient: "from-cyan-950/40 via-slate-900/20 to-zinc-950",
    shortDescription: "Immersive 3D stealth experience focusing on line-of-sight guard patrol routines, key collection, and quiet environmental navigation.",
    tags: ["Unity", "C#", "3D Stealth", "Patrol AI", "Interaction Systems"],
    verifiedMechanics: [
      "3D Player locomotion & stealth crouching",
      "Guard patrol routes with vision cone detection",
      "Key item collection & door unlocking mechanics",
      "Light/shadow spatial awareness logic",
      "Raycast-based interaction prompts"
    ],
    overview: "ShadowSneak is a 3D stealth exploration prototype where player survival hinges on staying unseen, timing guard movements, and finding keys to unlock secure sectors.",
    gameplayDescription: "Players navigate a guarded 3D facility. Guards follow defined patrol paths and actively scan their forward field of view. The player must use cover, monitor patrol rhythms, collect specific keycards, and access the exit without raising alarms.",
    myResponsibilities: [
      "Implemented 3D character controller supporting walking, crouching, and camera-relative locomotion.",
      "Constructed waypoint-driven guard patrol behaviors with vision cones and alert transitions.",
      "Developed an interaction system for inspecting objects, collecting keys, and opening locked barriers.",
      "Crafted UI feedback indicators communicating objective states and player alert levels."
    ],
    technologies: ["Unity 3D", "C# Scripting", "NavMesh / Waypoint Systems", "LayerMask Raycasting", "3D Vector Mathematics"],
    technicalChallenges: [
      "Ensuring guard detection felt fair to the player without wall-clipping or unrealistic instant-spotting.",
      "Handling smooth transitions between guard patrol waypoints without jerky rotation snaps."
    ],
    solutionsImplemented: [
      "Designed a dual-phase detection check: first verifying distance and viewing angle, followed by an obstacle raycast to verify true line-of-sight.",
      "Utilized Quaternion.Slerp with angular velocity clamping for natural, human-like guard turns at waypoint corners."
    ],
    mediaPlaceholders: {
      imagePath: "/projects/shadowsneak.png",
      videoUrl: null,
      customSvgKey: "shadowsneak"
    },
    customImage: "/projects/shadowsneak.png"
  },
  {
    id: "arrow-escape",
    title: "Arrow Escape",
    genre: "Logic Puzzle Game",
    category: "Puzzle & Arcade",
    playUrl: "https://badri-raju-pericharla.itch.io/arrow-escape",
    githubUrl: null,
    featured: true,
    accentColor: "#F59E0B", // Amber / Warm Gold
    bannerGradient: "from-amber-950/40 via-stone-900/20 to-zinc-950",
    shortDescription: "Minimalist spatial logic puzzle built around directional arrow navigation, pathway resolution, and rule-based obstacle clearance.",
    tags: ["Unity", "C#", "Puzzle Mechanics", "Grid Navigation", "Game Logic"],
    verifiedMechanics: [
      "Directional arrow manipulation & movement validation",
      "Grid and path navigation checks",
      "Obstacle clearing & collision avoidance",
      "Dynamic level progression & victory validation",
      "Move tracking and undo/retry logic"
    ],
    overview: "Arrow Escape is a clean, analytical puzzle game where players must calculate trajectories and sequence directional movements to clear paths without causing collisions.",
    gameplayDescription: "Each stage presents a configuration of arrows with fixed directions. Players must identify which arrow can safely leave the board first without colliding with intersecting elements, sequentially clearing the grid until the board is empty.",
    myResponsibilities: [
      "Engineered the core puzzle state validator that verifies pathway clearance before initiating moves.",
      "Programmed directional raycasts and grid collision checks for obstacle identification.",
      "Implemented the level progression pipeline and win-condition evaluator.",
      "Created responsive audio/visual feedback for valid moves, blocked attempts, and stage completion."
    ],
    technologies: ["Unity Engine", "C# Scripting", "Grid Coordinates", "State Evaluation Algorithms", "Tweening & UI Feedback"],
    technicalChallenges: [
      "Accurately detecting whether an arrow's forward exit path is blocked by another piece further down the line.",
      "Maintaining instantaneous player input response without allowing overlapping simultaneous triggers."
    ],
    solutionsImplemented: [
      "Constructed a forward path raycast simulation that queries all colliders in the movement direction before committing the tween.",
      "Added an input locking state flag during active movement transitions to prevent race conditions in puzzle state."
    ],
    mediaPlaceholders: {
      imagePath: "/projects/arrow-escape.png",
      videoUrl: null,
      customSvgKey: "arrowescape"
    }
  },
  {
    id: "platformer2d",
    title: "Platformer2D (JungleJump)",
    genre: "2D Precision Platformer",
    category: "2D Games",
    playUrl: "https://badri-raju-pericharla.itch.io/junglejump",
    githubUrl: null,
    featured: true,
    accentColor: "#10B981", // Emerald / Neon Green
    bannerGradient: "from-emerald-950/40 via-emerald-900/10 to-zinc-950",
    shortDescription: "Classic 2D platformer emphasizing tuned jump curves, accurate physics collision handling, and collectible stage progression.",
    tags: ["Unity", "C#", "2D Platformer", "Physics Tuning", "Collision Systems"],
    verifiedMechanics: [
      "Responsive 2D character movement & acceleration",
      "Variable jump height & physics gravity scaling",
      "Ground check and edge collision handling",
      "Hazard collision detection & checkpoint respawns",
      "Collectible items and level progression triggers"
    ],
    overview: "Platformer2D (published on itch.io as JungleJump) explores foundational platformer gameplay feel. The focus was on eliminating floatiness, ensuring responsive jumping, and crafting coherent level obstacles.",
    gameplayDescription: "Players traverse multi-tiered platforms, leap across hazard pits, collect gems/coins, and reach the exit goal. The design prioritizes consistent jump mechanics and predictable collision responses.",
    myResponsibilities: [
      "Developed the custom 2D character controller with tuned horizontal friction and variable jump gravity.",
      "Engineered reliable ground detection using overlap box checks to eliminate wall-sticking issues.",
      "Constructed stage hazards (spikes, drop falls) with instant respawn at the active checkpoint.",
      "Implemented collectible counters and level progression stage transitions."
    ],
    technologies: ["Unity 2D", "C# Scripting", "Rigidbody2D", "CompositeCollider2D", "Tilemap Systems"],
    technicalChallenges: [
      "Overcoming the standard Unity physics floatiness where jump apex feels sluggish or unresponsive.",
      "Preventing character from sticking to vertical wall tiles when pressing horizontal movement keys in mid-air."
    ],
    solutionsImplemented: [
      "Implemented a custom gravity multiplier that increases falling gravity when falling or releasing the jump button early.",
      "Assigned a zero-friction 2D physics material to side colliders and separated ground detection from wall collision layers."
    ],
    mediaPlaceholders: {
      imagePath: "/projects/junglejump.png",
      videoUrl: null,
      customSvgKey: "platformer"
    }
  },
  {
    id: "obstacle-game",
    title: "Obstacle Game",
    genre: "Kinetic Obstacle Course",
    category: "Puzzle & Arcade",
    playUrl: "https://tinyurl.com/ObstacleGame00",
    githubUrl: null,
    featured: false,
    accentColor: "#EC4899", // Rose / Hot Pink
    bannerGradient: "from-pink-950/40 via-purple-900/10 to-zinc-950",
    shortDescription: "Fast-reaction obstacle navigation game testing movement precision, hazard avoidance, and real-time collision feedback.",
    tags: ["Unity", "C#", "Obstacle Course", "Precision Movement", "Hazard Logic"],
    verifiedMechanics: [
      "Precision movement controls under kinetic momentum",
      "Dynamic obstacle hazards with varying patterns",
      "Instantaneous collision detection & penalty triggers",
      "Real-time score calculation & distance tracking",
      "Game loop state handling (Play, Crash, Retry)"
    ],
    overview: "Obstacle Game is a focused technical prototype designed around kinetic movement, reflex timing, and avoiding hazardous geometric barriers placed across the player's path.",
    gameplayDescription: "The player navigates an obstacle-dense course. Speed and hazard density require fast spatial perception and quick corrective maneuvers to prevent catastrophic impacts.",
    myResponsibilities: [
      "Implemented player movement controls optimized for rapid lateral dodging and smooth deceleration.",
      "Configured collision triggers on varied obstacle types with dynamic impact feedback.",
      "Built the score and distance tracker updating live on the screen.",
      "Structured the game over screen with zero-delay restart for quick replay loops."
    ],
    technologies: ["Unity Engine", "C# Scripting", "Physics Collision Triggers", "UI Canvas", "Scene Management"],
    technicalChallenges: [
      "Maintaining stable collision detection at higher player movement velocities without tunnel-through artifacts.",
      "Creating immediate, frustration-free restart loops."
    ],
    solutionsImplemented: [
      "Enabled Continuous Dynamic collision detection on player physics bodies to eliminate high-speed tunneling through thin obstacles.",
      "Optimized scene reload routines and state resets for near-instantaneous retry execution."
    ],
    mediaPlaceholders: {
      imagePath: "/projects/obstacle-game.png",
      videoUrl: null,
      customSvgKey: "obstacle"
    }
  }
];
