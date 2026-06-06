import { FormEvent } from "react"

type LoginPageProps = {
  email: string
  name: string
  onEmailChange: (value: string) => void
  onNameChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const journeySteps = [
  {
    description:
      "Catch the thought, conversation, or small moment that feels worth keeping.",
    step: "01",
    title: "Notice",
  },
  {
    description:
      "Let names, events, and recurring themes begin to connect into a clearer shape.",
    step: "02",
    title: "Gather",
  },
  {
    description:
      "Come back later and move through your own story with more context and ease.",
    step: "03",
    title: "Return",
  },
]

function LoginPage({
  email,
  name,
  onEmailChange,
  onNameChange,
  onSubmit,
}: LoginPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute left-[-6rem] top-[8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(240,176,111,0.42),transparent_68%)] blur-2xl" />
        <div className="animate-float absolute bottom-[8%] right-[-4rem] h-88 w-88 rounded-full bg-[radial-gradient(circle,rgba(135,175,156,0.34),transparent_68%)] blur-2xl [animation-delay:-4s]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-[min(1180px,calc(100%-1rem))] items-center py-6 lg:w-[min(1180px,calc(100%-2rem))]">
        <div className="grid w-full gap-8 lg:grid-cols-[1.18fr_0.92fr] lg:gap-12">
          <div className="animate-rise space-y-8 py-4">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(7,18,17,0.28)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-32 bg-[radial-gradient(circle,rgba(240,176,111,0.18),transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute inset-y-8 left-8 w-px bg-gradient-to-b from-white/10 via-[#e9d7b5]/50 to-[#9cc2ad]/10" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
                    The journey
                  </p>
                  <h2 className="max-w-[18ch] font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[0.98] tracking-[-0.04em] text-[#fff8f0]">
                    A gentle path from a single note to a fuller story.
                  </h2>
                </div>

                <div className="hidden rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/70 sm:block">
                  3 simple steps
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {journeySteps.map((step, index) => (
                  <article
                    key={step.step}
                    className="animate-rise relative rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_16px_40px_rgba(5,15,13,0.2)]"
                    style={{ animationDelay: `${index * 160}ms` }}
                  >
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-18 bg-[radial-gradient(circle,rgba(240,176,111,0.16),transparent_72%)] blur-lg" />
                    <div className="relative flex items-start gap-4">
                      <div className="animate-pulse-ring mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(241,210,158,0.98),rgba(156,194,173,0.82))] text-[0.72rem] font-bold tracking-[0.16em] text-[#15302b] shadow-[0_0_28px_rgba(235,188,112,0.18)]">
                        {step.step}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#fff8f0]">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-6 text-white/72">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-5 px-1">
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
                Log Life
              </p>
              <div className="space-y-4">
                <h1 className="max-w-[11ch] font-serif text-[clamp(3.2rem,7vw,6rem)] leading-[0.94] tracking-[-0.06em] text-[#f8efe6]">
                  A calmer home for your days, people, and moments.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/74">
                  Write what happened, keep what mattered, and return later
                  with more clarity than you started with.
                </p>
              </div>
            </section>
          </div>

          <section
            aria-labelledby="login-heading"
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="animate-rise w-full max-w-[31rem] rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(7,18,17,0.28)] backdrop-blur-xl">
              <p className="mb-4 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
                Begin your space
              </p>
              <h2
                id="login-heading"
                className="mb-4 text-[clamp(2.1rem,4vw,2.9rem)] font-semibold tracking-[-0.04em] text-[#fff8f0]"
              >
                Sign in to continue
              </h2>
              <p className="mb-6 text-lg leading-8 text-white/72">
                Start with your name and email. We&apos;ll take you straight
                into your personal reflection space.
              </p>

              <form className="grid gap-4" onSubmit={onSubmit}>
                <label className="grid gap-2">
                  <span className="text-sm text-[#f8ebd7]">Name</span>
                  <input
                    autoComplete="name"
                    className="h-14 rounded-[1.15rem] border border-white/12 bg-white/6 px-5 text-[#fff9f1] outline-none transition duration-200 placeholder:text-white/35 focus:-translate-y-px focus:border-[#f1d6af]/65 focus:bg-white/10"
                    name="name"
                    placeholder="Aarav Sharma"
                    type="text"
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-[#f8ebd7]">Email</span>
                  <input
                    autoComplete="email"
                    className="h-14 rounded-[1.15rem] border border-white/12 bg-white/6 px-5 text-[#fff9f1] outline-none transition duration-200 placeholder:text-white/35 focus:-translate-y-px focus:border-[#f1d6af]/65 focus:bg-white/10"
                    name="email"
                    placeholder="aarav@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                  />
                </label>

                <button
                  className="mt-2 h-14 rounded-full bg-[linear-gradient(135deg,#f0c685_0%,#ddb26a_100%)] px-6 font-medium text-[#17302c] shadow-[0_16px_36px_rgba(235,188,112,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(235,188,112,0.32)]"
                  type="submit"
                >
                  Enter Log Life
                </button>
              </form>

              <div className="mt-6 border-t border-white/8 pt-5">
                <span className="mb-3 inline-flex rounded-full border border-[#9cc2ad]/20 bg-[#9cc2ad]/14 px-3 py-1 text-sm text-[#dcefe4]">
                  Private by design
                </span>
                <p className="text-base leading-7 text-white/68">
                  Your entries are meant to feel personal, grounded, and easy
                  to return to over time.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
