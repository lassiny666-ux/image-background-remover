import { handlers } from 'next-auth/handlers';
import Google from 'next-auth/providers/google';

export const { GET, POST } = handlers({
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
});