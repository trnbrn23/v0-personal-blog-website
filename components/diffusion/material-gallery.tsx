"use client"

import { useState } from "react"
import { LitSubject } from "./lit-subject"
import { MATERIALS, type DiffusionMaterial } from "./materials"

export function MaterialGallery() {
  const [selectedId, setSelectedId] = useState<string>("216")
  const selected = MATERIALS.find((m) => m.id === selectedId) ?? MATERIALS[0]

  return (
    <div className="space-y-8">
      <DetailPanel material={selected} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {MATERIALS.map((m) => (
          <MaterialCard
            key={m.id}
            material={m}
            selected={m.id === selectedId}
            onSelect={() => setSelectedId(m.id)}
          />
        ))}
      </div>
    </div>
  )
}

function DetailPanel({ material }: { material: DiffusionMaterial }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid md:grid-cols-[260px_1fr]">
        <div className="aspect-square md:aspect-auto md:h-full border-b md:border-b-0 md:border-r border-border">
          <LitSubject
            softness={material.softness}
            stops={material.stops}
            warmth={material.warmth}
            texture={material.texture}
            size={260}
            className="w-full h-full"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col gap-4">
          <div>
            <div className="flex items-baseline gap-3 flex-wrap mb-1">
              <h3 className="text-2xl font-semibold tracking-tight">{material.name}</h3>
              {material.aka && (
                <span className="text-sm text-muted-foreground">{material.aka}</span>
              )}
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <span>{material.category}</span>
              <span>·</span>
              <span>{material.stops.toFixed(1)} stop loss</span>
              {material.warmth !== 0 && (
                <>
                  <span>·</span>
                  <span>{material.warmth > 0 ? "warm cast" : "cool cast"}</span>
                </>
              )}
            </div>
          </div>

          <p className="text-base text-foreground/85 leading-relaxed">{material.description}</p>

          <div className="text-sm">
            <div className="text-muted-foreground mb-1">Reach for it when</div>
            <div>{material.useFor}</div>
          </div>

          <Meters material={material} />
        </div>
      </div>
    </div>
  )
}

function Meters({ material }: { material: DiffusionMaterial }) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
      <Meter label="Softness" value={material.softness} max={1} />
      <Meter label="Light loss" value={material.stops} max={2.5} unit=" st" />
      <Meter
        label="Warmth"
        value={Math.abs(material.warmth)}
        max={0.5}
        unit={material.warmth >= 0 ? "" : ""}
      />
    </div>
  )
}

function Meter({
  label,
  value,
  max,
  unit = "",
}: {
  label: string
  value: number
  max: number
  unit?: string
}) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{label}</span>
        <span className="tabular-nums">
          {value.toFixed(value < 1 && value !== 0 ? 2 : 1)}
          {unit}
        </span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-foreground rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function MaterialCard({
  material,
  selected,
  onSelect,
}: {
  material: DiffusionMaterial
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group text-left rounded-md overflow-hidden border transition-all ${
        selected
          ? "border-foreground ring-1 ring-foreground"
          : "border-border hover:border-foreground/40"
      }`}
    >
      <div className="aspect-square">
        <LitSubject
          softness={material.softness}
          stops={material.stops}
          warmth={material.warmth}
          texture={material.texture}
          size={160}
          className="w-full h-full"
        />
      </div>
      <div className="p-2.5 bg-card">
        <div className="text-sm font-medium truncate">{material.name}</div>
        <div className="text-xs text-muted-foreground tabular-nums">
          {material.stops.toFixed(1)} st · {Math.round(material.softness * 100)}% soft
        </div>
      </div>
    </button>
  )
}
