import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectDB } from '@/lib/mongodb'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'instructor') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, deadline, category, instructorEmail, totalMarks } = body

    if (!title || !description || !deadline || !instructorEmail || !category || !totalMarks) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    try {
        const client = await connectDB()
        const db = client.db('studyArenaDB')

        const assignmentsCollection = db.collection('assignments')

        const result = await assignmentsCollection.insertOne({
            title,
            description,
            deadline,
            category,
            totalMarks,
            instructorEmail,
            createdAt: new Date(),
        })

        return NextResponse.json({ message: 'Assignment created', insertedId: result.insertedId })
    } catch (err) {
        return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 })
    }
}
