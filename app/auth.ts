import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handlers, auth, signIn, signOut }
export const { GET, POST } = handlers