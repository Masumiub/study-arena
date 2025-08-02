import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/mongodb'
import bcrypt from 'bcrypt'

// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             async authorize(credentials) {
//                 const { email, password } = credentials
//                 const client = await connectDB()
//                 const db = client.db('studyArenaDB')
//                 const user = await db.collection('users').findOne({ email })

//                 if (user && bcrypt.compareSync(password, user.password)) {
//                     return { id: user._id, name: user.name, email: user.email, role: user.role }
//                 }
//                 throw new Error('Invalid credentials')
//             },
//         }),
//     ],
//     callbacks: {
//         async session({ session, token }) {
//             session.user.role = token.role
//             return session
//         },
//         async jwt({ token, user }) {
//             if (user) token.role = user.role
//             return token
//         },
//     },
//     session: {
//         strategy: 'jwt',
//     },
//     pages: {
//         signIn: '/login',
//     },
// })


export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials
        const client = await connectDB()
        const db = client.db('studyArenaDB')
        const user = await db.collection('users').findOne({ email })

        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user._id, name: user.name, email: user.email, role: user.role }
        }
        throw new Error('Invalid credentials')
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
