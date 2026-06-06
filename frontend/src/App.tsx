import { FormEvent, type ReactNode, useState } from "react"
import LoginPage from "./components/LoginPage"

type UserProfile = {
  email: string
  name: string
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail) {
      return
    }

    setUser({
      email: trimmedEmail,
      name: trimmedName,
    })
  }

  if (user) {
    return <HomePage user={user} onLogout={() => setUser(null)} />
  }

  return (
    <LoginPage
      email={email}
      name={name}
      onEmailChange={setEmail}
      onNameChange={setName}
      onSubmit={handleLogin}
    />
  )
}

function HomePage({
  onLogout,
  user,
}: {
  onLogout: () => void
  user: UserProfile
}) {
  return (
    <main className="relative min-h-screen overflow-hidden px-2 py-6 sm:px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute left-[-6rem] top-[8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(240,176,111,0.42),transparent_68%)] blur-2xl" />
        <div className="animate-float absolute bottom-[8%] right-[-4rem] h-88 w-88 rounded-full bg-[radial-gradient(circle,rgba(135,175,156,0.34),transparent_68%)] blur-2xl [animation-delay:-4s]" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-[1180px] space-y-4">
        <section className="animate-rise rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(7,18,17,0.28)] backdrop-blur-xl sm:p-8">
          <nav className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
                Log Life
              </p>
              <h1 className="font-serif text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] tracking-[-0.05em] text-[#f8efe6]">
                Welcome back, {user.name}.
              </h1>
            </div>

            <button
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-[#fff7ee] transition duration-200 hover:-translate-y-0.5 hover:bg-white/8"
              type="button"
              onClick={onLogout}
            >
              Log out
            </button>
          </nav>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
                Today&apos;s pace
              </p>
              <h2 className="max-w-[10ch] font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.04em] text-[#fff8f0]">
                Keep the important parts of life from drifting away.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/74">
                Create a new log, revisit recent entries, and gradually build
                a clearer picture of your days, relationships, and turning
                points.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="h-14 rounded-full bg-[linear-gradient(135deg,#f0c685_0%,#ddb26a_100%)] px-6 font-medium text-[#17302c] shadow-[0_16px_36px_rgba(235,188,112,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(235,188,112,0.32)]">
                  New text log
                </button>
                <button className="h-14 rounded-full border border-white/15 bg-white/5 px-6 text-[#fff7ee] transition duration-200 hover:-translate-y-0.5 hover:bg-white/8">
                  Start voice log
                </button>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_16px_40px_rgba(5,15,13,0.18)]">
              <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
                Your space
              </p>
              <ul className="space-y-3 pl-5 text-base leading-7 text-white/72">
                <li>Capture moments as they happen or later in the evening.</li>
                <li>See recurring people, events, and feelings across time.</li>
                <li>Return to your own story with more context.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <InfoCard
            eyebrow="Quick start"
            title="Create your first entry"
          >
            Begin with a day log, a memory, or a note about something you do
            not want to lose.
          </InfoCard>
          <InfoCard
            eyebrow="People and moments"
            title="Build meaningful connections"
          >
            Over time, your logs can surface the names, places, and events
            that keep shaping your life.
          </InfoCard>
          <InfoCard
            eyebrow="A gentler routine"
            title="Keep it light and consistent"
          >
            The goal is not perfection. It is a simple habit of checking in
            and keeping track of what mattered.
          </InfoCard>
        </section>
      </section>
    </main>
  )
}

function InfoCard({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode
  eyebrow: string
  title: string
}) {
  return (
    <article className="animate-rise rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-[0_16px_40px_rgba(5,15,13,0.18)] backdrop-blur-xl">
      <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-[#f1d6af]">
        {eyebrow}
      </p>
      <h3 className="mb-3 text-[1.35rem] font-semibold tracking-[-0.03em] text-[#fff8f0]">
        {title}
      </h3>
      <p className="text-base leading-7 text-white/72">{children}</p>
    </article>
  )
}

export default App
