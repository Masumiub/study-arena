import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '../../public/assets/hero-banner2.png'


const Header = () => {
  return (
    <header className="py-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Column */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Study Arena!
          </h1>
          <p className=" text-gray-600 mb-6">
            Empower your learning with curated resources and a passionate community.  It aims to equip individuals with knowledge, skills, and critical thinking abilities to navigate life effectively and contribute to society. 
          </p>
          <Link href="/login">
            <button className="btn btn-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Join Now
            </button>
          </Link>
        </div>

        {/* Right Column (Image) */}
        <div className="flex-1">
          <Image
            src={Banner}
            alt="Study Illustration"
            className="w-full"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
