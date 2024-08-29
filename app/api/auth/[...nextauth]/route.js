import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return session; // Modify as needed
    },
    async signIn({ user, account, profile }) {
      return true; // Modify as needed
    },
  },
  pages: {
    signIn: '/auth/signin',
    // You can customize other pages here if needed
  },
  session: {
    strategy: 'jwt', // Ensure this is a valid SessionStrategy
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };