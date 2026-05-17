"use client"

import { LitSubject } from "./lit-subject"
import { STACKUPS } from "./materials"

export function Stackups() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {STACKUPS.map((s) => (
        <article
          key={s.id}
          className="rounded-lg border border-border bg-card overflow-hidden flex flex-col"
        >
          <div className="aspect-[16/10] border-b border-border">
            <LitSubject
              softness={s.softness}
              stops={s.stops}
              warmth={s.warmth}
              size={400}
              className="w-full h-full"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{s.name}</h3>
              <div className="text-xs text-muted-foreground mt-0.5">{s.tagline}</div>
            </div>
            <ol className="text-sm space-y-1 text-foreground/80">
              {s.layers.map((layer, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted-foreground tabular-nums text-xs pt-0.5">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span>{layer}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
