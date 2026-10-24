export const caseStudiesData = [
  {
    id: "case-bossfight-combat",
    projectTitle: "BossFight2D",
    title: "Building an Event-Driven Combat & I-Frame System",
    badge: "Combat Architecture",
    tags: ["C#", "Unity 2D", "Event Architecture", "Physics Triggers"],
    theProblem: "In fast-paced melee combat, standard trigger collisions often fire across multiple update ticks while an attack animation is active, causing devastating unintended multi-hits or instant deaths.",
    gameplayRequirement: "When the player strikes with an attack, each enemy within the hit volume should receive exactly one instance of damage per swing, with visual impact feedback and a brief invulnerability window (I-Frames) for defensive evasion.",
    myApproach: "Rather than applying damage directly inside OnTriggerEnter2D without safeguards, I established a decoupled damage event pipeline. Every weapon swing initializes a temporary Hit Registry set that tracks which entities have already been impacted during that specific swing lifecycle.",
    implementation: `// Core pattern utilized in hit registration:
public class AttackHitbox : MonoBehaviour 
{
    private HashSet<IDamageable> hitEntities = new HashSet<IDamageable>();
    [SerializeField] private int attackDamage = 15;

    public void StartAttack() => hitEntities.Clear();

    private void OnTriggerEnter2D(Collider2D other) 
    {
        if (other.TryGetComponent<IDamageable>(out var target)) 
        {
            if (!hitEntities.Contains(target) && !target.IsInvulnerable) 
            {
                hitEntities.Add(target);
                target.TakeDamage(attackDamage);
            }
        }
    }
}`,
    challengesEncountered: "Colliders entering the hitbox zone on the very first frame would occasionally register before the weapon's visual sprite had swung forward, making attacks feel visually disconnected.",
    solution: "Tied hitbox activation strictly to Unity Animation Events placed on the key impact frames of the sword swing animation, rather than keeping the collider enabled throughout the entire state.",
    finalResult: "Crisp, reliable melee combat where hits feel punchy, predictable, and fair. Damage numbers and flash shaders trigger exactly once per strike.",
    whatILearned: "Animation Events combined with decoupled IDamageable interfaces create much more robust game feel than relying on raw collision timers."
  },
  {
    id: "case-shadowsneak-stealth",
    projectTitle: "ShadowSneak",
    title: "Implementing Line-of-Sight Guard Detection & Smooth Patrols",
    badge: "AI & Stealth Logic",
    tags: ["Unity 3D", "Vector Math", "Raycasting", "State Machine"],
    theProblem: "Simple distance-based detection allows guards to see through walls and spot players standing directly behind them, completely breaking stealth immersion.",
    gameplayRequirement: "Guards must scan only their forward field-of-view (a defined vision cone angle) and detect the player only if there is an unblocked direct line-of-sight.",
    myApproach: "Implemented a two-tier verification check executed at fixed intervals: first, an inexpensive angular and distance calculation; second, a targeted raycast against obstacle LayerMasks if the player is within the vision angle.",
    implementation: `// Dual-phase stealth detection algorithm:
Vector3 dirToPlayer = (player.position - transform.position).normalized;
float angle = Vector3.Angle(transform.forward, dirToPlayer);

if (Vector3.Distance(transform.position, player.position) <= viewRadius && angle <= viewAngle / 2f) 
{
    // Check line of sight with layer masking
    if (!Physics.Raycast(transform.position, dirToPlayer, viewRadius, obstacleMask)) 
    {
        // Player spotted - transition guard to ALERT state
        SetGuardState(GuardState.Alert);
    }
}`,
    challengesEncountered: "Running raycasts every single frame per guard caused unnecessary CPU overhead, and guards snapped instantly to patrol waypoints with unnatural instant rotation.",
    solution: "Throttled detection checks to run on a 0.1s coroutine timer instead of Update(), and smoothed guard turning using Quaternion.RotateTowards with a controlled angular speed.",
    finalResult: "Believable guard patrols that feel responsive and give the player genuine hiding opportunities behind crates and walls.",
    whatILearned: "Performance optimization in game AI often comes down to decoupling perception update rates from visual render frame rates."
  },
  {
    id: "case-platformer-physics",
    projectTitle: "Platformer2D (JungleJump)",
    title: "Tuning Jump Curves & Eliminating Floatiness",
    badge: "Physics Tuning",
    tags: ["Unity 2D", "Rigidbody2D", "Kinematics", "Game Feel"],
    theProblem: "Unity's default symmetrical parabolic gravity causes jumping characters to feel floaty on the descent and unresponsive when the player releases the jump key early.",
    gameplayRequirement: "The character should jump high when holding the jump button, but terminate early for short hops when tapped lightly. Falling must feel rapid and snappy.",
    myApproach: "Built custom gravity scaling in the FixedUpdate loop that applies additional gravity multiplier when falling or when the player terminates their jump button press prematurely.",
    implementation: `// Variable jump height & fall gravity scaling:
void FixedUpdate() 
{
    if (rb.linearVelocity.y < 0) 
    {
        // Falling down - apply fall gravity multiplier
        rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (fallMultiplier - 1) * Time.fixedDeltaTime;
    } 
    else if (rb.linearVelocity.y > 0 && !Input.GetButton("Jump")) 
    {
        // Low jump cut - apply low jump multiplier
        rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (lowJumpMultiplier - 1) * Time.fixedDeltaTime;
    }
}`,
    challengesEncountered: "Pressing against walls in mid-air caused player colliders to catch on vertical edges and stick indefinitely due to box collider friction.",
    solution: "Created a frictionless PhysicsMaterial2D for the player's side colliders and isolated ground detection to a bottom OverlapBox sensor.",
    finalResult: "Snappy, satisfying 2D platforming feel with distinct control over jump height and zero wall sticking.",
    whatILearned: "Game physics shouldn't always replicate real-world math; tuned game feel often requires asymmetrical gravity and forgiving input buffers."
  }
];
