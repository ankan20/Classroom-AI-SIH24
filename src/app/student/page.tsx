'use client'
import teachersData from "../../data/sample_data.json"
import { BackgroundGradient } from "../../components/ui/background-gradient"
import Link from "next/link";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  description: string;
}

function StudentPage() {
  const teachers: Teacher[] = teachersData.teachers;

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="md:mt-20">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">TEACHERS LIST</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Meet Your Teachers</p>
        </div>
      </div>
      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex justify-center">
              <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{teacher.name}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-extrabold">Subject: {teacher.subject}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{teacher.description}</p>
                  <Link href={`/analytics/${teacher.id}`}>
                    <p className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition duration-200">
                      View Analytics
                    </p>
                  </Link>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
