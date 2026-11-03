import type { Metadata } from "next";
import PasswordResetNotice from "../../components/features/auth/PasswordResetNotice";

export const metadata: Metadata = {
  title: "Password help",
  description: "Password recovery information for BookNook.",
};

export default function ForgotPasswordPage() {
  return <PasswordResetNotice />;
}
