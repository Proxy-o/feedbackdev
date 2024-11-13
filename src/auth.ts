import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "./db"
import { users,accounts,sessions,verificationTokens } from "./db/schema"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Github],
})