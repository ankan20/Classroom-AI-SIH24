'use client'
import WeeklyCard from "../../components/WeeklyCard";

const StudentWeeklyReportPage = () => {
  // Dummy data for demonstration
  const reportData = {
    studentName: "John Doe",
    distractionTime: "15%",
    totalInClass: "20 hours",
    attentive: "80%",
    responsive: "70%"
  };

  return (
    <div className="py-12 bg-gray-900 max-h-screen">
      <div className="text-center md:mt-20">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Weekly Report</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Student Performance</p>
      </div>
      <div className="-mt-12">
        <WeeklyCard {...reportData} />
      </div>
    </div>
  );
}

export default StudentWeeklyReportPage;
