"use client"

import { useId } from "react"

type Props = {
  /** 0 = point source (hard), 1 = wall of light (max soft). */
  softness: number
  /** Light loss in stops. */
  stops: number
  /** -1 cool, 0 neutral, +1 warm. */
  warmth?: number
  /** Light direction in degrees. 0 = from right, 90 = below, 180 = left, 270 = above. */
  lightAngle?: number
  /** Subtle weave/grain hint on highlight. */
  texture?: "smooth" | "woven" | "fibrous" | "speckled"
  /** Width/height in px. */
  size?: number
  /** Show the cast shadow on the ground plane. */
  showFloor?: boolean
  className?: string
}

export function LitSubject({
  softness,
  stops,
  warmth = 0,
  lightAngle = 215,
  texture = "smooth",
  size = 280,
  showFloor = true,
  className,
}: Props) {
  const uid = useId().replace(/:/g, "")
  const cx = size / 2
  const cy = size * 0.46
  const r = size * 0.3

  const exposure = Math.max(0.06, Math.pow(0.5, stops))

  const rad = (lightAngle * Math.PI) / 180
  const lightDist = r * 0.55
  const lightX = cx + Math.cos(rad) * lightDist
  const lightY = cy + Math.sin(rad) * lightDist

  // Highlight radius grows with softness — soft sources spread their glow.
  const hlInner = r * (0.05 + softness * 0.2)
  const hlOuter = r * (0.45 + softness * 1.1)

  // Tight specular only really exists on hard sources.
  const specStrength = Math.max(0, 1 - softness * 1.4)
  const specRadius = r * (0.04 + softness * 0.18)

  // Wrap: shadow side is less black on soft sources.
  const shadowFloor = 0.04 + softness * 0.32

  // Warmth: shifts highlight color, slight cool on the shadow side for contrast.
  const warmR = Math.round(255)
  const warmG = Math.round(248 - Math.max(0, warmth) * 18 + Math.max(0, -warmth) * 4)
  const warmB = Math.round(232 - Math.max(0, warmth) * 60 + Math.max(0, -warmth) * 20)
  const highlightRGB = `${warmR}, ${warmG}, ${warmB}`
  const shadowRGB = `12, 14, 18`

  // Cast shadow geometry — falls opposite the light, on the floor.
  const floorY = cy + r * 1.05
  const shadowOffsetX = -Math.cos(rad) * r * 0.55
  const shadowBlur = 1.2 + softness * 22
  const shadowOpacity = 0.55 * exposure * (1 - softness * 0.35)
  const shadowRx = r * (0.95 + softness * 0.45)
  const shadowRy = r * (0.18 + softness * 0.12)

  // Texture pattern parameters
  const texFreq =
    texture === "woven" ? 0.85 : texture === "fibrous" ? 0.4 : texture === "speckled" ? 1.4 : 0.6
  const texOctaves = texture === "fibrous" ? 1 : 2
  const texOpacity =
    texture === "smooth" ? 0 : texture === "speckled" ? 0.12 : texture === "fibrous" ? 0.18 : 0.1

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="A sphere lit by a diffused source"
    >
      <defs>
        <radialGradient
          id={`bg-${uid}`}
          cx={size / 2}
          cy={size / 2}
          r={size * 0.7}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgb(28, 28, 32)" />
          <stop offset="100%" stopColor="rgb(8, 8, 10)" />
        </radialGradient>

        {/* Base sphere — dark form */}
        <radialGradient
          id={`base-${uid}`}
          cx={cx}
          cy={cy - r * 0.1}
          r={r * 1.15}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={`rgba(${shadowRGB}, 1)`} />
          <stop offset="100%" stopColor={`rgba(0, 0, 0, 1)`} />
        </radialGradient>

        {/* Diffuse highlight — soft falloff from the light direction */}
        <radialGradient
          id={`hl-${uid}`}
          cx={lightX}
          cy={lightY}
          r={hlOuter}
          fx={lightX}
          fy={lightY}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={`rgba(${highlightRGB}, ${0.95 * exposure})`} />
          <stop
            offset={`${10 + softness * 25}%`}
            stopColor={`rgba(${highlightRGB}, ${0.7 * exposure})`}
          />
          <stop
            offset={`${45 + softness * 30}%`}
            stopColor={`rgba(${highlightRGB}, ${shadowFloor * exposure})`}
          />
          <stop offset="100%" stopColor={`rgba(${shadowRGB}, 0)`} />
        </radialGradient>

        {/* Specular pop — only matters on hard sources */}
        <radialGradient
          id={`spec-${uid}`}
          cx={lightX - Math.cos(rad) * r * 0.05}
          cy={lightY - Math.sin(rad) * r * 0.05}
          r={specRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={`rgba(255, 255, 255, ${specStrength * exposure * 0.95})`}
          />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </radialGradient>

        {/* Soft rim on the shadow side, to read as a sphere */}
        <radialGradient
          id={`rim-${uid}`}
          cx={cx - Math.cos(rad) * r * 0.95}
          cy={cy - Math.sin(rad) * r * 0.95}
          r={r * 0.55}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={`rgba(${highlightRGB}, ${0.08 + softness * 0.18})`}
          />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        <filter id={`shadow-blur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={shadowBlur} />
        </filter>

        <filter id={`tex-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={texFreq}
            numOctaves={texOctaves}
            seed="2"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0.5 0"
          />
        </filter>

        <clipPath id={`sphere-clip-${uid}`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width={size} height={size} fill={`url(#bg-${uid})`} />

      {/* Floor */}
      {showFloor && (
        <>
          <rect
            x="0"
            y={floorY}
            width={size}
            height={size - floorY}
            fill={`rgba(${shadowRGB}, 0.4)`}
          />
          <ellipse
            cx={cx + shadowOffsetX}
            cy={floorY + r * 0.05}
            rx={shadowRx}
            ry={shadowRy}
            fill={`rgba(0, 0, 0, ${shadowOpacity})`}
            filter={`url(#shadow-blur-${uid})`}
          />
        </>
      )}

      {/* Sphere */}
      <g clipPath={`url(#sphere-clip-${uid})`}>
        <circle cx={cx} cy={cy} r={r} fill={`url(#base-${uid})`} />
        <circle cx={cx} cy={cy} r={r} fill={`url(#rim-${uid})`} />
        <circle cx={cx} cy={cy} r={r} fill={`url(#hl-${uid})`} />
        {specStrength > 0.05 && (
          <circle cx={cx} cy={cy} r={r} fill={`url(#spec-${uid})`} />
        )}
        {texOpacity > 0 && (
          <rect
            x={cx - r}
            y={cy - r}
            width={r * 2}
            height={r * 2}
            opacity={texOpacity * exposure}
            filter={`url(#tex-${uid})`}
            style={{ mixBlendMode: "overlay" }}
          />
        )}
      </g>

      {/* Sphere edge — keeps the form readable */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeWidth="0.6"
      />
    </svg>
  )
}
