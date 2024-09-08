"use client"
import AdminVideoUpload from "@/components/AdminVideoUpload";
import BehaviorDetection from "@/components/BehaviorDetection";
import FireDetection from "@/components/FireDitection";
import NoiseDetection from "@/components/NoiseDetection"
import Projector from "@/components/Projector"


const page = () => {
  return (
    <div>
      <div>
        <AdminVideoUpload />
        <BehaviorDetection />
        <NoiseDetection />
        <Projector />
        <FireDetection />
      </div>
    </div>
  )
}

export default page
