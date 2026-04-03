import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// 注意: D1 数据库需要通过 Cloudflare Dashboard 手动绑定
// 当前使用 JWT 策略，不依赖数据库
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
    strategy: 'jwt', // 使用 JWT 策略，不需要数据库
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      // 首次登录时，将用户信息保存到 token
      if (account && user) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    },
  },
})

export { handlers, auth, signIn, signOut }
export const { GET, POST } = handlers