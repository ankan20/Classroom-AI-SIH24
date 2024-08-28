"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { useRouter } from "next/navigation";
import { Boxes } from "./ui/background-boxes";

// Define the interface for the student data
interface Student {
  name: string;
  className: string;
}

// Sample student data (replace with your actual data)
const teachers: Student[] = [
    { name: "Dr. Alice Thompson", className: "Mathematics" },
    { name: "Prof. Robert Wilson", className: "Science" },
    { name: "Ms. Karen Martinez", className: "History" },
    { name: "Mr. David Lee", className: "English" },
    { name: "Dr. Laura Clark", className: "Physics" },
  ];
  

const StudentTable: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (className: string) => {
     // Debugging line
    router.push(`/teacher/${className}`);
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg ">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative p-6 -mt-24 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Teacher's Information
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-20 relative">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="p-4 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleCardClick(teacher.className)}
            >
              <h2 className="text-lg font-semibold text-black dark:text-white">
                {teacher.name}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Class: {teacher.className}
              </p>
            </div>
          ))}
        </div>
        {/* <BackgroundBeams /> */}
      </div>
    </div>
  );
};

export default StudentTable;
