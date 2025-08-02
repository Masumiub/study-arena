import { withAuth } from 'next-auth/middleware'
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export async function registerUser({ name, email, password, role }) {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  })
  return res

  
}

export async function signInUser({ email, password }) {
  const res = await nextAuthSignIn('credentials', {
    redirect: false,
    email,
    password,
  })
  return res
}


export function signOutUser() {
  nextAuthSignOut({ callbackUrl: '/' }) // Redirect after sign out
}



// export const config = {
//   matcher: ['/dashboard/:path*', '/create-assignment'],
// }