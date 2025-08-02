'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


const schema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
  description: z.string().min(10),
  deadline: z.string(),
})



export default function CreateAssignment() {

  const { data: session, status } = useSession()
  const router = useRouter()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'instructor') {
      router.push('/')
      toast.error('Access denied! Instructor only.')
    }
  }, [status, session, router])

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/create-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, instructorEmail: session?.user?.email }),
      })

      const result = await res.json()
      if (res.ok) {
        toast.success('Assignment created!')
        router.push('/Assignments')
      } else {
        toast.error(result.message || 'Failed to create assignment')
      }
    } catch (err) {
      toast.error('Something went wrong!')
    }
  }

  if (status === 'loading') return <p>Loading...</p>


  return (
    <div className='w-full md:w-10/12 mx-auto mb-20'>
      <div>
        <h1 className='font-bold text-center my-20 text-5xl'>Create Assignment</h1>
      </div>


      <section className="max-w-xl mx-auto p-6 mt-10 bg-base-100 rounded-xl shadow">


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              {...register('title')}
              className="w-full input px-4 py-2 rounded"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register('description')}
              className="w-full textarea px-4 py-2 rounded"
              rows="4"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              {...register('category')}
              className="w-full input px-4 py-2 rounded"
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>



          <div>
            <label className="block font-medium">Total Marks</label>
            <input
              type="number"
              {...register('totalMarks')}
              className="w-full input px-4 py-2 rounded"
            />
            {errors.totalMarks && <p className="text-red-500">{errors.totalMarks.message}</p>}
          </div>

          <div>
            <label className="block font-medium">Deadline</label>
            <input
              type="date"
              {...register('deadline')}
              className="w-full  input px-4 py-2 rounded"
            />
            {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
            Submit
          </button>
        </form>
      </section>

    </div>
  )
}
