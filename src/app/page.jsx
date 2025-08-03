'use client'
import Image from "next/image";
import { useSession, signIn } from 'next-auth/react'
import Header from "@/components/Header";
import Features from "@/components/Features";
import FAQs from "@/components/FAQs";
import Testimonials from "@/components/Testimonials";
import LatestAssignments from "@/components/LatestAssignments";


export default function Home() {
  return (
    <div className="w-full md:w-10/12 mx-auto">
      <Header></Header>
      <Features></Features>
      <LatestAssignments></LatestAssignments>
      <Testimonials></Testimonials>
      <FAQs></FAQs>
    </div>

  );
}
