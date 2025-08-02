'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState([])
    const [selected, setSelected] = useState(null)
    const [feedback, setFeedback] = useState('')
    const [status, setStatus] = useState('accepted')

    useEffect(() => {
        const fetchSubmissions = async () => {
            const res = await axios.get('/api/assignment-submissions')
            setSubmissions(res.data)
        }
        fetchSubmissions()
    }, [])

    const handleEvaluate = async () => {
        if (!selected) return

        const res = await axios.patch('/api/assignment-submissions', {
            submissionId: selected._id,
            feedback,
            status
        })

        console.log('Sending:', {
            submissionId: selected._id,
            feedback,
            status
        })

        if (res.data.success) {
            alert('Evaluation submitted')

            // Close modal first
            const modal = document.getElementById('evaluate_modal')
            modal.close()

            // Clear state
            setSelected(null)
            setFeedback('')
            setStatus('accepted')

            // Refetch submissions
            const refreshed = await axios.get('/api/assignment-submissions')
            setSubmissions(refreshed.data)
        }
    }

    return (
        <div className="p-4 w-full md:w-10/12 mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-center my-20">All Assignment Submissions</h2>

            <div className="overflow-x-auto my-20">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Assignment Title</th>
                            <th>Student</th>
                            <th>Submission Link</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub) => (
                            <tr key={sub._id}>
                                <td>{sub.assignmentTitle}</td>
                                <td>{sub.studentName} <br /> <small>{sub.studentEmail}</small></td>
                                <td><a href={sub.submissionLink} className="link" target="_blank">View</a></td>
                                <td>{sub.status}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelected(sub)
                                            setFeedback(sub.feedback || '')
                                           setStatus('accepted')
                                            document.getElementById('evaluate_modal').showModal()
                                        }}
                                        className="btn btn-sm btn-info rounded-lg text-white"
                                    >
                                        Evaluate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Evaluation Modal */}
            <dialog id="evaluate_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg mb-2">Evaluate Submission</h3>

                    {selected && (
                        <div className="space-y-2">
                            <p><strong>Assignment:</strong> {selected.assignmentTitle}</p>
                            <p><strong>Student:</strong> {selected.studentName} ({selected.studentEmail})</p>
                            <p><strong>Link:</strong> <a href={selected.submissionLink} className="link" target="_blank">Open Submission</a></p>
                            <p><strong>Note:</strong> {selected.note}</p>

                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Your feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />


                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border rounded px-2 py-1 select w-full"
                            >
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <div className="modal-action">
                                <button onClick={handleEvaluate} className="btn btn-success rounded-lg">Submit Evaluation</button>
                                <button
                                    className="btn rounded-lg"
                                    onClick={() => {
                                        document.getElementById('evaluate_modal').close()
                                        setSelected(null)
                                        setFeedback('')
                                        setStatus('accepted')
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    )
}
