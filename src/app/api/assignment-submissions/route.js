
import { connectDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const body = await req.json()
        const client = await connectDB()
        const db = client.db('studyArenaDB')

        const result = await db.collection('submissions').insertOne({
            assignmentId: new ObjectId(body.assignmentId),
            assignmentTitle: body.assignmentTitle,
            studentName: body.studentName,
            studentEmail: body.studentEmail,
            submissionLink: body.submissionLink,
            note: body.note,
            submittedAt: body.submittedAt,
            status: body.status || 'pending',
        })

        return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), {
            status: 200
        })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
            status: 500
        })
    }
}


export async function GET(req) {
    try {
        const client = await connectDB()
        const db = client.db('studyArenaDB')
        const submissions = await db
            .collection('submissions')
            .find({})
            .toArray()

        return NextResponse.json(submissions)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
    }
}


export async function PATCH(req) {
    try {
        const body = await req.json()
        const { submissionId, feedback, status } = body

        if (!submissionId || !status) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const client = await connectDB()
        const db = client.db('studyArenaDB')

        const result = await db.collection('submissions').updateOne(
            { _id: new ObjectId(submissionId) },
            {
                $set: {
                    feedback,
                    status,
                    evaluatedAt: new Date().toISOString(),
                },
            }
        )

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
    }
}