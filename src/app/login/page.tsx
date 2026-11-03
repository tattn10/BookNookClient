import type { Metadata } from "next";
import LoginForm from "../../components/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your BookNook account.",
};

export default function LoginPage() {
  return (
    <main className="paper-grain flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
      <section
        aria-labelledby="login-heading"
        className="w-full max-w-lg border border-[var(--line)] bg-[var(--paper)] p-7 shadow-sm sm:p-10"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Welcome back, reader
        </p>
        <h1
          id="login-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          Login to BookNook
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
          Sign in to return to your corner of the bookshop.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
