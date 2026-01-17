// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">ResumeATS Pro</h1>
          <Link href="/analyze" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Optimize Now
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Beat every ATS. <span className="text-indigo-600">Land interviews.</span>
        </h2>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          AI-powered, privacy-first resume optimizer. Zero logs, zero tracking, maximum interview rate.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/analyze"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Upload Resume
          </Link>
          <span className="text-sm text-slate-500">Free scan • Instant results</span>
        </div>

        <ul className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <Feature icon="🔒" title="Zero Logging" desc="AES-256 encryption, no data retention, GDPR/CCPA compliant." />
          <Feature icon="⚡" title="Edge Fast" desc="Sub-second analysis running on Vercel Edge functions." />
          <Feature icon="📈" title="Proven Results" desc="Average 67 % increase in ATS pass rate." />
        </ul>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ResumeATS Pro • <Link href="/privacy" className="underline">Privacy</Link>
      </footer>
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-slate-600">{desc}</p>
      </div>
    </li>
  );
}
