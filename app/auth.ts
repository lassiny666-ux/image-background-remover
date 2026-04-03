import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// 注意: D1 数据库需要通过 Cloudflare Dashboard 手动绑定
// 当前使用 JWT 策略，待 D1 绑定后恢复数据库策略
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
    strategy: 'jwt', // 临时使用 JWT，D1 绑定后改为 'database'
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
})

export { handlers, auth, signIn, signOut }
export const { GET, POST } = handlers