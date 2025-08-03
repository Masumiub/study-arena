'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { registerUser } from '@/lib/auth'
import Lottie from 'lottie-react';
import Img from '../../../public/assets/Animation - signup.json'
import Link from 'next/link'


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

    <div className="w-full md:w-8/12 mx-auto bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl mt-5">

      <div className="flex flex-col xl:flex-row items-center mb-20 py-25 px-10">
        <div className="w-full xl:w-1/2 mx-auto p-3">

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <form onSubmit={handleSubmit}>
              <h1 className='text-4xl font-bold my-5 text-center'>Register</h1>

              <label className="label mt-2">Name</label> <br />
              <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} className="input w-full" /> <br />

              <label className="label mt-2">Email</label> <br />
              <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="input w-full" /> <br />

              <label className="label mt-2">Password</label> <br />
              <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="input w-full" /> <br />

              <label className="label mt-2">Select a Role</label> <br />
              <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="select w-full">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>

              <button type="submit" className='btn mt-6 w-full btn-primary rounded-full'>Register</button>

            </form>
            <div className='my-5 text-center'>
              <p>Already have an account? <Link href='/login' className='text-blue-500'>Login</Link></p>
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


