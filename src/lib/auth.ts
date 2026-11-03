import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/db";

const secret = process.env.BETTER_AUTH_SECRET;

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET must be set in FrontEnd/.env.local.");
}

const appUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "BookNook",
  baseURL: appUrl,
  secret,
  trustedOrigins: [appUrl],
  database: mongodbAdapter(
    client.db(process.env.MONGODB_DB ?? "booknook"),
    { client },
  ),
  emailAndPassword: {
    enabled: true,
  },
});
