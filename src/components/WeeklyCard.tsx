// 'use client'
// import React, { useRef } from "react";
// import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
// import html2canvas from "html2canvas"; 
// import jsPDF from "jspdf";

// interface WeeklyCardProps {
//   distractionTime: string;
//   totalInClass: string;
//   attentive: string;
//   responsive: string;
//   studentName: string;
// }

// const WeeklyCard: React.FC<WeeklyCardProps> = ({
//   distractionTime,
//   totalInClass,
//   attentive,
//   responsive,
//   studentName
// }) => {

//     const pdfRef = useRef<HTMLDivElement | null>(null);

//     const handleDownload = () => {
//         const input = pdfRef.current;
//         if (input) {
//           // Set a higher scale to improve the quality
//           html2canvas(input, { scale: 3 }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a4', true);
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = pdf.internal.pageSize.getHeight();
//             const imgWidth = canvas.width;
//             const imgHeight = canvas.height;
//             const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//             const imgX = (pdfWidth - imgWidth * ratio) / 2;
//             const imgY = 10; // Reduced top margin for better alignment
//             const fileName = `Weekly_Report_${studentName}.pdf`;
//             pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
//             pdf.save(fileName);
//           });
//         }
//       };
      
//   return (
//     <div>
//       <CardContainer className="inter-var">
//       <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
//         {/* Content to be captured in the PDF */}
//         <div ref={pdfRef}>
//           <CardItem
//             translateZ="50"
//             className="text-xl font-bold text-neutral-600 dark:text-white"
//           >
//             Weekly Performance Report
//           </CardItem>
//           <CardItem
//             as="p"
//             translateZ="60"
//             className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
//           >
//             Detailed insights into your weekly class performance, including attention, participation, and more.
//           </CardItem>
//           <CardItem translateZ="100" className="w-full mt-4">
//             <div className="mt-4">
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold text-neutral-600 dark:text-white">Student Name</span>
//                 <span className="text-neutral-500 dark:text-neutral-400">{studentName}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold text-neutral-600 dark:text-white">Distraction Time:</span>
//                 <span className="text-neutral-500 dark:text-neutral-400">{distractionTime}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold text-neutral-600 dark:text-white">Total Time in Class:</span>
//                 <span className="text-neutral-500 dark:text-neutral-400">{totalInClass}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold text-neutral-600 dark:text-white">Attentive Time:</span>
//                 <span className="text-neutral-500 dark:text-neutral-400">{attentive}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold text-neutral-600 dark:text-white">Responsive Time:</span>
//                 <span className="text-neutral-500 dark:text-neutral-400">{responsive}</span>
//               </div>
//             </div>
//           </CardItem>
//         </div>

//         {/* Exclude button from captured content */}
//         <div className="flex justify-between items-center mt-20">
//           <CardItem
//             translateZ={20}
//             as="button"
//             className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
//             onClick={handleDownload}
//           >
//             Download
//           </CardItem>
//         </div>
//       </CardBody>
//     </CardContainer>
//     </div>
//   );
// };

// export default WeeklyCard;



'use client'
import React, { useRef } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import html2canvas from "html2canvas"; 
import jsPDF from "jspdf";

interface WeeklyCardProps {
  distractionTime: string;
  totalInClass: string;
  attentive: string;
  responsive: string;
  studentName: string;
}

const WeeklyCard: React.FC<WeeklyCardProps> = ({
  distractionTime,
  totalInClass,
  attentive,
  responsive,
  studentName
}) => {

    const pdfRef = useRef<HTMLDivElement | null>(null);

    const handleDownload = () => {
        const input = pdfRef.current;
        if (input) {
          // Set a higher scale to improve the quality
          html2canvas(input, { scale: 3 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10; // Reduced top margin for better alignment
            const fileName = `Weekly_Report_${studentName}.pdf`;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(fileName);
          });
        }
      };

  return (
    <div className="">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border">
          {/* Content to be captured in the PDF */}
          <div ref={pdfRef} style={{ padding: '20px', backgroundColor: '#f8f9fa' }}> {/* Inline styles for PDF */}
            <CardItem
              translateZ="50"
              style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4a5568' }}  // Inline styles
            >
              Weekly Performance Report
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              style={{ color: '#718096', fontSize: '0.875rem', maxWidth: '20rem', marginTop: '8px' }}  // Inline styles
            >
              Detailed insights into your weekly class performance, including attention, participation, and more.
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <div className="mt-4">
                {/* Inline styles applied to ensure accurate rendering in PDF */}
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: '600', color: '#4a5568' }}>Student Name</span>
                  <span style={{ color: '#718096' }}>{studentName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: '600', color: '#4a5568' }}>Distraction Time:</span>
                  <span style={{ color: '#718096' }}>{distractionTime}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: '600', color: '#4a5568' }}>Total Time in Class:</span>
                  <span style={{ color: '#718096' }}>{totalInClass}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: '600', color: '#4a5568' }}>Attentive Time:</span>
                  <span style={{ color: '#718096' }}>{attentive}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: '600', color: '#4a5568' }}>Responsive Time:</span>
                  <span style={{ color: '#718096' }}>{responsive}</span>
                </div>
              </div>
            </CardItem>
          </div>

          {/* Exclude button from captured content */}
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              onClick={handleDownload}
            >
              Download
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default WeeklyCard;
