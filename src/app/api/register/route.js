// /app/api/register/route.js
import { connectDB } from '@/lib/mongodb'
import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json()

    const client = await connectDB()
    const db = client.db('studyArenaDB')
    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      return new Response('User already exists', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return new Response('User registered successfully', { status: 201 })
  } catch (error) {
    return new Response('Registration failed', { status: 500 })
  }
}
