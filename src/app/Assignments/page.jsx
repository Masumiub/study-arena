'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Img from '../../../public/assets/hero-banner.png'
import Image from 'next/image'


export default function Assignmentspage() {
    const [selectedAssignment, setSelectedAssignment] = useState(null)
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await fetch('/api/assignments')
                if (!res.ok) throw new Error('Failed to fetch assignments')
                const data = await res.json()
                setAssignments(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchAssignments()
    }, [])

    const handleOpenModal = (assignment) => {
        setSelectedAssignment(assignment)
        document.getElementById('assignment_modal').showModal()
    }

    if (loading) return <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>


    return (
        <div>
            <div className="w-full md:w-10/12 mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-6 text-center my-20">All Assignments</h1>
                {assignments.length === 0 ? (
                    <p>No assignments found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20">
                        {assignments.map((assignment) => (
                            <div key={assignment._id} className="p-4 rounded-2xl shadow-lg">
                                <Image src={Img} alt="Img" className='w-full p-8' />
                                <h2 className="text-xl font-semibold">{assignment.title}</h2>

                                <button className="btn btn-xs btn-primary btn-outline rounded-full my-3">{assignment.category}</button>

                                <p className="text-gray-700">{assignment.description}</p>

                                <p className="text-sm text-gray-500">
                                    Marks: {assignment.totalMarks} | Due: {new Date(assignment.createdAt).toLocaleDateString()}
                                </p>

                                <div className='mt-5'>
                                    {session?.user ? (
                                        <button
                                            className='btn btn-primary btn-sm rounded-lg'
                                            onClick={() => handleOpenModal(assignment)}
                                        >
                                            Take Assignment
                                        </button>
                                    ) : (
                                        <button
                                            className='btn btn-outline btn-sm rounded-lg'
                                            onClick={() => {
                                                window.location.href = '/login'
                                            }}
                                        >
                                            Login to Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}


                        <dialog id="assignment_modal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg mb-2">
                                    Submit Assignment: {selectedAssignment?.title}
                                </h3>

                                <form
                                    className="space-y-3"
                                    onSubmit={async (e) => {
                                        e.preventDefault()
                                        const form = e.target
                                        const submissionLink = form.submissionLink.value
                                        const note = form.note.value

                                        const res = await axios.post('/api/assignment-submissions', {
                                            assignmentId: selectedAssignment._id,
                                            assignmentTitle: selectedAssignment.title,
                                            studentName: session?.user?.name,
                                            studentEmail: session?.user?.email,
                                            submissionLink,
                                            note,
                                            submittedAt: new Date().toISOString(),
                                            status: 'pending'
                                        })

                                        if (res.status === 200) {
                                            alert('Assignment submitted successfully!')
                                            form.reset()
                                            document.getElementById('assignment_modal').close()
                                        }
                                    }}
                                >
                                    <input
                                        name="submissionLink"
                                        type="url"
                                        placeholder="Submission Link"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <textarea
                                        name="note"
                                        placeholder="Your Note"
                                        className="textarea textarea-bordered w-full"
                                        rows={4}
                                        required
                                    ></textarea>

                                    <div className="modal-action">
                                        <button type="submit" className="btn btn-primary rounded-lg">Submit</button>
                                        <button type="button" className="btn rounded-lg" onClick={() => document.getElementById('assignment_modal').close()}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>
                )}
            </div>
        </div>
    )
}
