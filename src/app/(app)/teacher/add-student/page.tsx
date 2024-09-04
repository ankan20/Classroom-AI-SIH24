"use client"
import AddStudentForm1 from '@/components/AddStudentForm'; // Adjust the import path based on your folder structure

const AddStudentForm = () => {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg ">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <AddStudentForm1 />
    </div>
  );
};

export default AddStudentForm;
