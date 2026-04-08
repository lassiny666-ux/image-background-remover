import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"

// 获取 D1 数据库实例 - 延迟到请求时获取
function getDB() {
  try {
    // @ts-ignore - Cloudflare D1 绑定
    const db = process.env.DB
    if (!db) {
      console.warn("[Auth] D1 database not bound, using JWT session")
      return null
    }
    return drizzle(db, { schema })
  } catch (e) {
    console.warn("[Auth] Failed to initialize D1:", e)
    return null
  }
}

const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const db = getDB()
  console.log("[Auth] DB bound:", !!db, "Session strategy:", db ? 'database' : 'jwt')

  // 构建时使用占位值，运行时从环境变量读取
  const clientId = process.env.GOOGLE_CLIENT_ID || 'build-time-placeholder'
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'build-time-placeholder'

  return {
    // 只在 DB 绑定时使用 adapter
    ...(db ? { adapter: DrizzleAdapter(db) } : {}),
    providers: [
      Google({
        clientId,
        clientSecret,
      }),
    ],
    pages: {
      signIn: '/',
    },
    session: {
      // 没有 DB 时使用 JWT
      strategy: db ? 'database' : 'jwt',
    },
    // Cloudflare Pages 需要信任主机
    trustHost: true,
    callbacks: {
      async session({ session, user, token }) {
        if (session.user) {
          // database 策略用 user.id，jwt 策略用 token.sub
          (session.user as any).id = user?.id || token?.sub
        }
        return session
      },
    },
  }
})

export { handlers, auth, signIn, signOut }
export const { GET, POST } = handlers