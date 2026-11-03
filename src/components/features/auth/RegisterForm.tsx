"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

function getPasswordError(password: string) {
  const errors = [];

  if (password.length < 6) {
    errors.push("at least 6 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("an uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("a lowercase letter");
  }

  return errors.length
    ? `Password must include ${errors.join(", ").replace(/, ([^,]*)$/, " and $1")}.`
    : "";
}

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enteredPassword = String(formData.get("password"));
    const validationError = getPasswordError(enteredPassword);

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setPasswordError("");
    setIsSubmitting(true);

    try {
      const result = await authClient.signUp.email({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        password: enteredPassword,
        image: String(formData.get("photoUrl")),
        callbackURL: "/login",
      });

      if (result.error) {
        toast.error(result.error.message ?? "Could not register. Please try again.");
        return;
      }

      toast.success("Your account is ready. Please log in.");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Could not register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="mt-8 flex flex-col gap-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="photoUrl"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Photo URL
        </label>
        <input
          id="photoUrl"
          name="photoUrl"
          type="url"
          autoComplete="off"
          required
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
          placeholder="https://example.com/your-photo.jpg"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setPassword(value);
            if (passwordError) {
              setPasswordError(getPasswordError(value));
            }
          }}
          required
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? "password-error" : undefined}
          className="focus-ring min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--paper)] px-4 text-sm text-[var(--foreground)]"
        />
        {passwordError && (
          <p
            id="password-error"
            role="alert"
            className="mt-2 text-sm text-red-700"
          >
            {passwordError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[var(--accent)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
      >
        {isSubmitting ? "Creating account…" : "Register"}
      </button>

      <p className="text-center text-sm text-[var(--ink-soft)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="focus-ring rounded-sm text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--accent)]"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
