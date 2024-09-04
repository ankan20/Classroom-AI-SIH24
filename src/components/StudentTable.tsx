"use client";
import React, {  useEffect, useState } from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { useRouter } from "next/navigation";
import { Boxes } from "./ui/background-boxes";
import axios from "axios";

// Define the interface for the student data
interface Student {
  username: string;
}

const StudentTable: React.FC = () => {
  const router = useRouter();
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [teacherName,setTeacherName] = useState();
  const [message,setMessage]=useState("");
  
  useEffect(() => {
    // Retrieve the teacher's username from local storage
    const teacherData = JSON.parse(localStorage.getItem('user') || '{}');
    const username = teacherData.username;
    setTeacherName(username);
    // Fetch student data from the backend
    const fetchStudents = async () => {
      try {
        const response = await axios.post(`/api/teacher/get-all-students`, {
          username,
        });
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
    if(students?.length==0){
      console.log(students.length)
      setMessage("No student available!")
    }
  }, []);

  const handleCardClick = (studentName: string) => {
    console.log(teacherName);
    router.push(`/teacher/subject/${studentName}`);
  };

  if (loading) return <div className="text-center mt-40">Loading...</div>;

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative p-6 -mt-24 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          All Student Information
        </h1>
        <div className="overflow-x-auto  shadow-md sm:rounded-lg z-20 relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Student Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((student) => (
                <tr
                  key={student.username}
                  className="bg-white border-b dark:bg-zinc-900 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleCardClick(student.username)}
                >
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {student.username}
                  </td>
                  <td className="py-4 px-6 text-blue-500 underline">
                    Click here to see report
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
          {
            <p className="text-red-200 mt-5 text-center">{message}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
