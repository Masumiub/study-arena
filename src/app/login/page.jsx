// /app/login/page.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInUser } from '@/lib/auth'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await signInUser(form)
        if (res.ok) {
            router.push('/')
        } else {
            alert('Invalid credentials.')
        }
    }

    return (
        <div className="w-full xl:w-1/2 mx-auto p-3">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                <form onSubmit={handleSubmit}>
                    <legend className="text-center text-4xl font-bold">Login</legend>

                    <label className="label mt-3">Email</label> <br />
                    <input placeholder="Email" type="email" required onChange={e => setForm({ ...form, email: e.target.value })} className='input w-full' />
                    <br></br>
                    <label className="label mt-3">Password</label> <br />
                    <input placeholder="Password" type="password" required onChange={e => setForm({ ...form, password: e.target.value })} className='input w-full' />
                    <br />
                    <button type="submit" className="btn btn-primary mt-4  rounded-full w-full">Login</button>
                </form>
            </fieldset>
        </div>
    )
}
