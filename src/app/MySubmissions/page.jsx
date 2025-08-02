'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function MySubmissions(){
  const { data: session } = useSession()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!session?.user?.email) return

      try {
        const res = await fetch(`/api/submissions/user?email=${session.user.email}`)
        const data = await res.json()
        setSubmissions(data)
      } catch (err) {
        console.error('Failed to fetch submissions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [session?.user?.email])

  if (loading) return <p>Loading your submissions...</p>

  return (
    <div className="p-4 w-full md:w-10/12 mx-auto">
      <h2 className="text-5xl font-semibold my-20 text-center">My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul className="space-y-3 mb-20">
          {submissions.map((submission) => (
            <li key={submission._id} className="p-4 rounded-md shadow">
              <p><strong>Assignment:</strong> {submission.assignmentTitle}</p>
              <p><strong>Status:</strong> {submission.status}</p>
              <p><strong>Link:</strong> <a href={submission.submissionLink} target="_blank" className="text-blue-600 underline">View</a></p>
              {submission.feedback && (
                <p><strong>Feedback:</strong> {submission.feedback}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


