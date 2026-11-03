import type { Metadata } from "next";
import RegisterForm from "../../components/features/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your BookNook account.",
};

export default function RegisterPage() {
  return (
    <main className="paper-grain flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
      <section
        aria-labelledby="register-heading"
        className="w-full max-w-lg border border-[var(--line)] bg-[var(--paper)] p-7 shadow-sm sm:p-10"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Make yourself at home
        </p>
        <h1
          id="register-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          Join BookNook
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
          Create an account and find your place among the stories.
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
