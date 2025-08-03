import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import logo from '../../public/assets/logo.png'


export default function Footer() {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content px-10 py-20 rounded-t-2xl">
                <aside>
                    <Image src={logo} className='w-14' alt='logo'></Image>
                    <Link href='/' className='text-2xl font-bold'>StudyArena</Link>
                    <p>
                        Empower your learning with curated resources <br /> and a passionate community.
                    </p>

                    <div>
                        <p>Follow us: </p>
                        <div className='flex gap-3'>
                            <FaGoogle size={15}/>
                            <FaFacebook size={15}/>
                            <FaLinkedinIn size={15}/>
                        </div>
                    </div>
                </aside>
                <nav>
                    
                    <Link href='/' className="link link-hover">Home</Link>
                    <a className="link link-hover">Assignments</a>
                    <a className="link link-hover">Create</a>
                    <a className="link link-hover">Submissions</a>
                </nav>
                <nav>
                   
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Blogs</a>
                </nav>
                <nav>
                   
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by StudyArena Ltd</p>
                </aside>
            </footer>
        </div>
    )
}
