"use client"

import StudentTable from "@/components/StudentTable"

const page = ({teacherName}:{teacherName:string}) => {
  return (
    <div>
      <StudentTable teacherName={teacherName}/>
    </div>
  )
}

export default page
