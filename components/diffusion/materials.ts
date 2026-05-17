export type DiffusionMaterial = {
  id: string
  name: string
  aka?: string
  category: "none" | "gel" | "fabric" | "silk" | "natural"
  /** Light loss in stops (1 stop = halving). */
  stops: number
  /** Apparent angular spread of the new source, 0..1 (0 = point, 1 = wall-of-light). */
  softness: number
  /** Color cast: -1 cool, 0 neutral, +1 warm. */
  warmth: number
  /** Optional texture hint (for the rendered preview). */
  texture: "smooth" | "woven" | "fibrous" | "speckled"
  description: string
  useFor: string
}

export const MATERIALS: DiffusionMaterial[] = [
  {
    id: "none",
    name: "No diffusion",
    category: "none",
    stops: 0,
    softness: 0.02,
    warmth: 0,
    texture: "smooth",
    description:
      "A bare source — effectively a point of light. Shadow edges are razor sharp, specular hits are tight, every skin pore reads.",
    useFor: "Noir, sun stand-ins, hard graphic shape.",
  },
  {
    id: "hampshire",
    name: "Hampshire Frost",
    aka: "Lee 215",
    category: "gel",
    stops: 0.3,
    softness: 0.18,
    warmth: 0,
    texture: "smooth",
    description:
      "The lightest gel diffusion. Knocks the sting off a Fresnel without robbing it of throw or direction.",
    useFor: "Punching down a hard key just enough to be kind.",
  },
  {
    id: "251",
    name: "1/4 White Diffusion",
    aka: "Lee 251",
    category: "gel",
    stops: 0.5,
    softness: 0.32,
    warmth: 0,
    texture: "smooth",
    description:
      "Quarter strength of the workhorse 216. Soft, but the source still has a direction you can read.",
    useFor: "Eye lights, taming practicals, controlled keys.",
  },
  {
    id: "250",
    name: "1/2 White Diffusion",
    aka: "Lee 250",
    category: "gel",
    stops: 1.0,
    softness: 0.52,
    warmth: 0,
    texture: "smooth",
    description:
      "Half of 216. Properly soft but the fixture still throws — a good compromise when you need both.",
    useFor: "Keys at distance where full diffusion would die.",
  },
  {
    id: "216",
    name: "Full White Diffusion",
    aka: "Lee 216",
    category: "gel",
    stops: 1.3,
    softness: 0.7,
    warmth: 0,
    texture: "smooth",
    description:
      "The classic. A heavy white gel that homogenizes any source into a glowing rectangle. The bulb disappears.",
    useFor: "Window light, soft keys, the default starting point.",
  },
  {
    id: "opal",
    name: "Opal Tough Frost",
    aka: "Rosco 3000-series",
    category: "gel",
    stops: 1.5,
    softness: 0.85,
    warmth: 0,
    texture: "smooth",
    description:
      "Maximum diffusion in a gel. The source completely dissolves into the gel and the gel becomes the source.",
    useFor: "Turning the fixture itself into a soft panel.",
  },
  {
    id: "grid-half",
    name: "1/2 Grid Cloth",
    category: "fabric",
    stops: 1.2,
    softness: 0.72,
    warmth: 0,
    texture: "woven",
    description:
      "Reinforced fabric with a fine grid weave. Even diffusion across a big frame, no hot spot, durable on stands.",
    useFor: "Overheads, butterflies, big soft sides.",
  },
  {
    id: "grid-full",
    name: "Full Grid Cloth",
    category: "fabric",
    stops: 1.7,
    softness: 0.88,
    warmth: 0,
    texture: "woven",
    description:
      "Heavy grid cloth. Erases the source entirely and gives you that big-window-on-an-overcast-day quality.",
    useFor: "Daylight HMI on a 12×12 or 20×20.",
  },
  {
    id: "magic",
    name: "Magic Cloth",
    category: "fabric",
    stops: 1.5,
    softness: 0.8,
    warmth: 0.08,
    texture: "fibrous",
    description:
      "A polyester knit with a slightly irregular weave. Highlights roll off with a character you can feel — not just soft, photographic.",
    useFor: "Beauty, close-ups, anything that wants soft with personality.",
  },
  {
    id: "silk-china",
    name: "China Silk",
    category: "silk",
    stops: 0.7,
    softness: 0.45,
    warmth: 0,
    texture: "smooth",
    description:
      "Thin and directional. Smooths a hard source without killing the sun-quality — light still feels like it comes from one place.",
    useFor: "Cutting the sun a little while keeping it the sun.",
  },
  {
    id: "muslin-bleached",
    name: "Bleached Muslin",
    category: "natural",
    stops: 1.3,
    softness: 0.7,
    warmth: 0,
    texture: "woven",
    description:
      "Cotton fabric. Neutral, soft, with a faint speckle in the highlight pattern. The duct tape of diffusion.",
    useFor: "Bounce or diffusion — equally happy doing either.",
  },
  {
    id: "muslin-unbleached",
    name: "Unbleached Muslin",
    category: "natural",
    stops: 1.3,
    softness: 0.7,
    warmth: 0.35,
    texture: "woven",
    description:
      "Adds noticeable warmth. A natural source-warming filter and softener rolled into one piece of fabric.",
    useFor: "Warmer skin, faked golden hour, interiors with a sun lie.",
  },
]

/** A few real-world combinations that DPs reach for. */
export type Stackup = {
  id: string
  name: string
  tagline: string
  layers: string[]
  description: string
  /** Composite values used to render the resulting look. */
  softness: number
  stops: number
  warmth: number
}

export const STACKUPS: Stackup[] = [
  {
    id: "cathedral",
    name: "The daylight cathedral",
    tagline: "M18 HMI · 20×20 ultrabounce · 12×12 1/2 grid",
    layers: ["18kW HMI", "Bounce off 20×20 ultrabounce", "Through 12×12 1/2 grid cloth"],
    description:
      "Throw a hard daylight source into a giant white sheet, then push the bounced light through another big diffusion. The result feels like an overcast sky — no shadow has an edge.",
    softness: 0.95,
    stops: 3.0,
    warmth: 0,
  },
  {
    id: "doc-key",
    name: "The documentary key",
    tagline: "Aputure 600x · lantern · 1/2 grid skirt",
    layers: ["600W LED point source", "Inside a Space Light / lantern", "1/2 grid skirt around it"],
    description:
      "A bright point source inside a lantern becomes an omnidirectional bulb. A grid skirt focuses the spill downward. Wraps faces beautifully without taking the room apart.",
    softness: 0.78,
    stops: 1.8,
    warmth: 0.05,
  },
  {
    id: "close-up",
    name: "The close-up key",
    tagline: "Source Four · 216 · book light off bead board",
    layers: ["Source Four", "Through Lee 216", "Bounced into bead board, back through 216"],
    description:
      "A book light — bounce the source into a card, then read that card through a frame of diffusion. Two surfaces of softening produces a key that looks like a window even on a stage.",
    softness: 0.9,
    stops: 2.6,
    warmth: 0,
  },
  {
    id: "kissed-sun",
    name: "Kissed sun",
    tagline: "Direct sun · 6×6 China silk overhead",
    layers: ["Hard sun", "Through 6×6 China silk overhead"],
    description:
      "A silk overhead doesn't kill the sun — it just civilizes it. The light still feels directional and warm, but skin stops looking like a topographic map.",
    softness: 0.55,
    stops: 0.7,
    warmth: 0.1,
  },
]
