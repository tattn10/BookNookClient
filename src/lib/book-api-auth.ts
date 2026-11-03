import { authClient } from "@/lib/auth-client";

export async function getBookApiAuthorization() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Your login has expired. Please sign in again.");
  }

  return `Bearer ${data.token}`;
}