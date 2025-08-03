'use client'
import Link from 'next/link'
import React from 'react'
import { signOutUser } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import logo from '../../public/assets/logo.png'

export default function Navbar() {
    const { data: session, status } = useSession()


    return (
        <div className="navbar bg-base-100 shadow-2xl w-full md:w-10/12 mx-auto rounded-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href='/'>Home</Link></li>
                        <li>
                            <Link href='/Assignments'>Assignments</Link>
                        </li>
                        
                        {
                            session?.user?.role == 'instructor' && (
                                <>
                                    <li><Link href='/CreateAssignment'>Create Assignment</Link></li>
                                    <li><Link href='/Submissions'>Submissions</Link></li>
                                     <li><Link href='/Stats'>Stats</Link></li>
                                </>
                            )

                        }

                        {
                            session?.user?.role == 'student' && (
                                <>
                                    <li><Link href='/MySubmissions'>My Submissions</Link></li>
                                </>
                            )

                        }
                    </ul>
                </div>
                <Image src={logo} className='w-14' alt='logo'></Image>
                <Link href='/' className="text-2xl font-bold ml-2">StudyArena</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/Assignments'>Assignments</Link>
                    </li>
                    

                    {
                        session?.user?.role == 'instructor' && (
                            <>
                                <li><Link href='/CreateAssignment'>Create Assignment</Link></li>
                                <li><Link href='/Submissions'>Submissions</Link></li>
                                <li><Link href='/Stats'>Stats</Link></li>
                            </>
                        )

                    }

                    {
                        session?.user?.role == 'student' && (
                            <>
                                <li><Link href='/MySubmissions'>My Submissions</Link></li>
                            </>
                        )

                    }

                </ul>
            </div>
            <div className="navbar-end">

                {
                    session ? (
                        <button onClick={signOutUser} className="btn btn-neutral rounded-lg">Sign out</button>
                    ) :
                        (
                            <div className='flex gap-2 '>
                                <Link href='/login' className="btn rounded-lg btn-primary">Login</Link>
                                <Link href='/register' className="btn rounded-lg">Register</Link>
                            </div>
                        )
                }

            </div>
        </div>
    )
}
