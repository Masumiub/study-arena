// /app/login/page.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInUser } from '@/lib/auth'
import Lottie from "lottie-react";
import Img from '../../../public/assets/Animation - login.json'
import Link from 'next/link';



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
        <div className='w-full md:w-8/12 mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mt-5'>

            <div className="flex flex-col xl:flex-row items-center mb-20 py-25 px-10">

                <div className="w-full xl:w-1/2 mx-auto p-3">
                    <fieldset className="fieldset bg-base-200 rounded-box  p-4">
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

                        <div className='my-5 text-center'>
                            <p>Don't have an account? <Link href='/register' className='text-blue-500'>Register</Link></p>
                        </div>
                    </fieldset>
                </div>

                <div className='w-full xl:w-1/2 mx-auto'>
                    <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>
                </div>

            </div>
        </div>
    )
}
