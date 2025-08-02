import { connectDB } from '@/lib/mongodb'

export async function GET(req) {
  const client = await connectDB()
  const db = client.db('studyArenaDB')
  const assignments = await db.collection('assignments').find().toArray()
  return new Response(JSON.stringify(assignments))
}

