import Link from "next/link"
import { ApparentSource } from "@/components/diffusion/apparent-source"
import { LitSubject } from "@/components/diffusion/lit-subject"
import { MaterialGallery } from "@/components/diffusion/material-gallery"
import { Stackups } from "@/components/diffusion/stackups"

export const metadata = {
  title: "Diffusion — A field guide to making light soft",
  description:
    "How grid cloth, opal, Magic Cloth, 216, silk and muslin actually work — an interactive explainer for film and video lighting.",
}

const HERO_STEPS = [
  { softness: 0.02, stops: 0, label: "Bare bulb" },
  { softness: 0.32, stops: 0.5, label: "1/4 Diffusion" },
  { softness: 0.7, stops: 1.3, label: "Full 216" },
  { softness: 0.92, stops: 2.4, label: "Bounced + grid" },
]

export default function DiffusionPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Home
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <section className="mb-20">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
            Lighting · Field Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
            Diffusion
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty max-w-3xl mb-12">
            A field guide to making light soft. From a bare bulb to a wall of bounced
            cathedral light, everything you need to know about grid cloth, opal, Magic Cloth,
            and the gels that make faces look the way they do on film.
          </p>

          <div className="grid grid-cols-4 gap-2 md:gap-4 rounded-lg overflow-hidden border border-border">
            {HERO_STEPS.map((s) => (
              <figure key={s.label} className="bg-card">
                <div className="aspect-square">
                  <LitSubject
                    softness={s.softness}
                    stops={s.stops}
                    size={200}
                    className="w-full h-full"
                  />
                </div>
                <figcaption className="p-2.5 text-xs text-muted-foreground border-t border-border text-center">
                  {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Same subject, same light, four amounts of diffusion.
          </p>
        </section>

        {/* The core idea */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="The core idea"
            title="Diffusion makes the source bigger."
          />
          <div className="space-y-4 mb-10 text-base md:text-lg leading-relaxed text-foreground/85 max-w-3xl">
            <p>
              Every piece of diffusion on a film set is doing the same thing: it converts a
              small, bright source into a larger, dimmer one. A 1 kW bulb is a point of
              light; that bulb behind a 4×4 frame of 216 becomes a 4×4 panel of light. The
              bulb is no longer the source — the <em>fabric</em> is.
            </p>
            <p>
              What you feel when you call light &ldquo;soft&rdquo; is the angular size of the
              source as the subject sees it. A bigger angle means more rays arrive from
              more directions, which means shadows have wider penumbras, highlights spread,
              and faces wrap. There is no other knob.
            </p>
          </div>

          <ApparentSource />

          <p className="text-sm text-muted-foreground mt-6 max-w-2xl">
            Drag the sliders. Notice that you can get the same softness from a small frame
            held close or a big frame held far away — what matters is the angle subtended,
            not the absolute size of the diffuser.
          </p>
        </section>

        {/* Material catalog */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="The catalog"
            title="What every material actually does."
          />
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-3xl">
            Different materials trade softness, light loss, color and texture in different
            ways. The numbers below are good rules of thumb — every gaffer&rsquo;s book has
            slightly different values and the truth is always whatever the meter reads on
            the day.
          </p>
          <MaterialGallery />
        </section>

        {/* Real-world stack-ups */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="In the wild"
            title="Four stack-ups that show up on real sets."
          />
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-3xl">
            Nobody uses one piece of diffusion in isolation. The real craft is in the
            combinations — bouncing into one surface, reading it through another, skirting
            the spill with a third.
          </p>
          <Stackups />
        </section>

        {/* Rules of thumb */}
        <section className="mb-12">
          <SectionHeader eyebrow="Rules of thumb" title="Things to keep in your head." />
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
            <Rule
              title="Move it closer before you go bigger."
              body="Halving the distance to the subject does more for softness than doubling the diffuser. Distance is free. Bigger frames cost grip, time, and stops."
            />
            <Rule
              title="Density is light loss, not softness."
              body="A heavier diffusion (full vs quarter) costs you stops but barely changes the apparent source size. If you want softer, get bigger or closer — don't just stack."
            />
            <Rule
              title="Bigger source = faster falloff at the edges."
              body="Counterintuitive but true. A close, big source wraps faces but dies quickly across a wide set. A small distant source is harder but more even across a room."
            />
            <Rule
              title="Diffusion changes the source, not the fixture."
              body="Once the light passes through diffusion, the bulb's color, beam shape and intensity no longer matter independently — you have a new source defined by the fabric."
            />
            <Rule
              title="Texture lives in the highlight."
              body="The choice between Magic Cloth, muslin, and 216 doesn't change the soft shadow much — it changes the character of the specular hit on skin, eyes, and rim."
            />
            <Rule
              title="A meter beats a memory."
              body="The stop loss numbers are nominal. Old gels, dirty cloth, distance and angle all eat light. Measure once at the start of the day and you'll never have to guess."
            />
          </div>
        </section>

        <footer className="border-t border-border pt-10 mt-20 text-sm text-muted-foreground">
          <p>
            The renderings on this page are stylized — they communicate the{" "}
            <em>character</em> of each material rather than a physically accurate
            simulation. Real diffusion has texture, color shift, and behaviour that has to
            be felt on a set with a meter and a face in front of it.
          </p>
        </footer>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{title}</h2>
    </div>
  )
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}
