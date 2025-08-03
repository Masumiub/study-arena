import { connectDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const client = await connectDB()
        const db = client.db('studyArenaDB')

        const counts = await db.collection('submissions').aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]).toArray()

        const result = counts.reduce((acc, item) => {
            acc[item._id] = item.count
            return acc
        }, {})

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get counts' }, { status: 500 })
    }
}
