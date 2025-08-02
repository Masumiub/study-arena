import { connectDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const client = await connectDB()
    const db = client.db('studyArenaDB')
    const userSubmissions = await db
      .collection('submissions')
      .find({ studentEmail: email })
      .toArray()

    return NextResponse.json(userSubmissions)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch user submissions' }, { status: 500 })
  }
}
