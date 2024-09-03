"use client";
import TeacherTable from "@/components/TeacherTable";
import AdminVideoUpload from "@/components/AdminVideoUpload";
const page = () => {
  return (
    <div>
      <div >
      <AdminVideoUpload />
      </div>
     <TeacherTable />
    </div>
  )
}

export default page
