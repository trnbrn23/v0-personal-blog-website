"use client"

import { useState } from "react"
import { LitSubject } from "./lit-subject"

/**
 * Top-down diagram: light source on the left, diffuser frame in the middle,
 * subject on the right. The angular size of the diffuser as seen from the
 * subject is what determines how soft the resulting light feels.
 */
export function ApparentSource() {
  const [width, setWidth] = useState(1.5) // meters of diffusion frame
  const [distance, setDistance] = useState(2.0) // meters from subject

  // Geometry of the diagram. Both axes share the same scale (px/m) so the
  // drawn angle matches the calculated angle.
  const pxPerMeter = 68
  const subjectX = 500
  const subjectY = 175
  const lightX = 40
  const lightY = 175

  const diffuserX = subjectX - distance * pxPerMeter
  const diffuserHeight = width * pxPerMeter
  const diffuserTop = subjectY - diffuserHeight / 2
  const diffuserBottom = subjectY + diffuserHeight / 2

  // Angular size of the diffuser as seen from the subject.
  // theta = 2 * atan( (width/2) / distance )
  const angleRad = 2 * Math.atan(width / 2 / distance)
  const angleDeg = (angleRad * 180) / Math.PI

  // Map angle (1°..90°) to softness (0..0.95).
  // Below ~3° is practically a point source; 60°+ is wraparound soft.
  const softness = Math.max(0, Math.min(0.95, (angleDeg - 2) / 65))

  // The new "source" loses a stop or so depending on diffuser density;
  // here we just visualize the apparent-size effect, so keep exposure flat.
  const stops = 0.5 + softness * 0.6

  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <svg viewBox="0 0 560 350" className="w-full h-auto">
          {/* Floor grid */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.18"
              />
            </pattern>
            <linearGradient id="diff-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 240, 200, 0.55)" />
              <stop offset="100%" stopColor="rgba(255, 240, 200, 0.25)" />
            </linearGradient>
          </defs>
          <rect width="560" height="350" fill="url(#grid)" className="text-foreground" />

          {/* Light cone: source -> diffuser edges */}
          <polygon
            points={`${lightX},${lightY} ${diffuserX},${diffuserTop} ${diffuserX},${diffuserBottom}`}
            fill="rgba(255, 220, 120, 0.12)"
            stroke="rgba(255, 220, 120, 0.5)"
            strokeWidth="0.6"
            strokeDasharray="3 3"
          />

          {/* Diffusion cone: diffuser surface -> subject (the apparent source) */}
          <polygon
            points={`${diffuserX},${diffuserTop} ${diffuserX},${diffuserBottom} ${subjectX},${subjectY}`}
            fill="rgba(180, 220, 255, 0.18)"
            stroke="rgba(180, 220, 255, 0.6)"
            strokeWidth="0.8"
          />

          {/* Light source */}
          <circle cx={lightX} cy={lightY} r="8" fill="#FFD86B" />
          <circle
            cx={lightX}
            cy={lightY}
            r="14"
            fill="none"
            stroke="#FFD86B"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x={lightX}
            y={lightY + 32}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            className="text-muted-foreground"
          >
            source
          </text>

          {/* Diffuser */}
          <rect
            x={diffuserX - 3}
            y={diffuserTop}
            width="6"
            height={diffuserHeight}
            fill="url(#diff-fill)"
            stroke="rgba(255, 240, 200, 0.9)"
            strokeWidth="0.8"
          />
          <text
            x={diffuserX}
            y={diffuserTop - 8}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            className="text-muted-foreground"
          >
            diffuser ({width.toFixed(1)} m)
          </text>

          {/* Subject */}
          <circle
            cx={subjectX}
            cy={subjectY}
            r="11"
            fill="rgba(220, 200, 180, 0.95)"
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="0.6"
          />
          <text
            x={subjectX}
            y={subjectY + 28}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            className="text-muted-foreground"
          >
            subject
          </text>

          {/* Distance dimension */}
          <line
            x1={diffuserX}
            y1={subjectY + 60}
            x2={subjectX}
            y2={subjectY + 60}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground"
          />
          <line
            x1={diffuserX}
            y1={subjectY + 55}
            x2={diffuserX}
            y2={subjectY + 65}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground"
          />
          <line
            x1={subjectX}
            y1={subjectY + 55}
            x2={subjectX}
            y2={subjectY + 65}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground"
          />
          <text
            x={(diffuserX + subjectX) / 2}
            y={subjectY + 75}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            className="text-muted-foreground"
          >
            {distance.toFixed(1)} m
          </text>

          {/* Angle arc at subject */}
          <path
            d={describeArc(
              subjectX,
              subjectY,
              26,
              180 - angleDeg / 2,
              180 + angleDeg / 2,
            )}
            fill="none"
            stroke="rgba(180, 220, 255, 1)"
            strokeWidth="1.4"
          />
          <text
            x={subjectX - 38}
            y={subjectY - 4}
            textAnchor="end"
            fontSize="11"
            fontWeight="500"
            fill="currentColor"
          >
            {angleDeg.toFixed(0)}°
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-6">
        <div className="aspect-square w-full max-w-[260px] mx-auto rounded-lg overflow-hidden border border-border">
          <LitSubject softness={softness} stops={stops} size={260} lightAngle={200} />
        </div>

        <div className="space-y-5">
          <SliderRow
            label="Diffuser width"
            value={width}
            min={0.3}
            max={4}
            step={0.1}
            unit="m"
            onChange={setWidth}
          />
          <SliderRow
            label="Distance to subject"
            value={distance}
            min={0.4}
            max={5}
            step={0.1}
            unit="m"
            onChange={setDistance}
          />
          <div className="text-sm text-muted-foreground border-t border-border pt-4">
            Apparent source angle:{" "}
            <span className="text-foreground font-medium">{angleDeg.toFixed(0)}°</span>
            <div className="mt-1 text-xs">
              {angleDeg < 5
                ? "Effectively a point — hard light."
                : angleDeg < 15
                  ? "Directional, still has shape."
                  : angleDeg < 35
                    ? "Soft, with clear key direction."
                    : angleDeg < 60
                      ? "Wraps the subject, very soft."
                      : "Wall of light — no shadow has an edge."}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (n: number) => void
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm mb-1.5">
        <span>{label}</span>
        <span className="text-muted-foreground tabular-nums">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-foreground"
      />
    </label>
  )
}

/** Polar → cartesian helper for the angle arc. */
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polar(cx, cy, r, endAngle)
  const end = polar(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1"
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}
