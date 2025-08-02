'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { registerUser } from '@/lib/auth'

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
    const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await registerUser(form)
    if (res.ok) {
      router.push('/login')
    } else {
      alert('Registration failed.')
    }
  }

    return (
        <div className='w-full md:w-10/12 mx-auto py-10'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <form onSubmit={handleSubmit}>
                <h1 className='text-4xl font-bold my-5'>Register</h1>
                <label className="label mt-2">Name</label>
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />

                <label className="label mt-2">Email</label>
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />

                <label className="label mt-2">Password</label>
                <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />

                <label className="label mt-2">Select a Role</label>
                <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="select">
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>

                <button type="submit" className='btn mt-6 w-full'>Register</button>
            </form>
        </fieldset>
        </div>
    )
}


