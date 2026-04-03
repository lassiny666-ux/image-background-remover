import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"

// D1 类型声明
type D1Database = {
  exec: (sql: string) => Promise<{ results?: any[]; success: boolean }>
  prepare: (sql: string) => { bind: (...args: any[]) => { run: () => Promise<any>; all: () => Promise<any> } }
}

const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(
    // @ts-ignore - Cloudflare D1 绑定
    process.env.DB 
      ? drizzle(process.env.DB as unknown as D1Database, { schema })
      : undefined
  ),
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
    strategy: 'database', // 使用数据库存储 session
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        (session.user as any).id = user.id
      }
      return session
    },
  },
})

export { handlers, auth, signIn, signOut }
export const { GET, POST } = handlers