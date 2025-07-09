// import React from "react";

// const starts = [
//   {
//     icon: (
//       <svg
//         width="32"
//         height="32"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         className="text-indigo-400"
//       >
//         <circle cx="12" cy="8" r="4" strokeWidth="2" />
//         <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" strokeWidth="2" />
//       </svg>
//     ),
//     value: 660,
//     label: "Bệnh nhân",
//     change: "+40",
//     sub: "tháng này",
//   },
//   {
//     icon: (
//       <svg
//         width="32"
//         height="32"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         className="text-indigo-400"
//       >
//         <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
//         <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
//       </svg>
//     ),
//     value: 230,
//     label: "Cuộc hẹn",
//     change: "+30",
//     sub: "tháng này",
//   },
//   {
//     icon: (
//       <svg
//         width="32"
//         height="32"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         className="text-indigo-400"
//       >
//         <circle cx="12" cy="12" r="10" strokeWidth="2" />
//         <path d="M12 8v4l3 2" strokeWidth="2" />
//       </svg>
//     ),
//     value: "$9900",
//     label: "Doanh thu",
//     change: "+20%",
//     sub: "tháng này",
//   },
//   {
//     icon: (
//       <svg
//         width="32"
//         height="32"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         className="text-indigo-400"
//       >
//         <path
//           d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//     value: 120,
//     label: "Ca điều trị",
//     change: "+10",
//     sub: "tháng này",
//   },
// ];

// const Cards = () => {
//   return (
//     <div className="flex flex-col gap-6 w-full mx-auto ">
//       {starts.map((stat, idx) => (
//         <div
//           key={stat.label}
//           className="flex items-center gap-4 border rounded-xl p-5 bg-white shadow-sm"
//         >
//           <div className="flex-shrink-0">{stat.icon}</div>
//           <div className="flex-1">
//             <div className="text-2xl font-bold">{stat.value}</div>
//             <div className="text-gray-500 text-sm">{stat.label}</div>
//             <div className="flex items-center gap-2 mt-2">
//               <span className="text-indigo-500 font-semibold">
//                 {stat.change}
//               </span>
//               <span className="bg-indigo-50 text-indigo-500 text-xs rounded px-2 py-0.5">
//                 {stat.sub}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cards;

"use client";
import React, { useEffect, useState } from "react";

const Cards = () => {
  const [stats, setStats] = useState({
    benhNhan: 0,
    cuocHen: 0,
    caDieuTri: 0,
    doanhThu: "0 VND",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/phieukham/baocao`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Lỗi fetch báo cáo:", err));
  }, []);

  const items = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-indigo-400"
        >
          <circle cx="12" cy="8" r="4" strokeWidth="2" />
          <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" strokeWidth="2" />
        </svg>
      ),
      value: stats.benhNhan,
      label: "Bệnh nhân",
      change: "+40",
      sub: "tháng này",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-indigo-400"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
        </svg>
      ),
      value: stats.cuocHen,
      label: "Cuộc hẹn",
      change: "+30",
      sub: "tháng này",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-indigo-400"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 8v4l3 2" strokeWidth="2" />
        </svg>
      ),
      value: stats.doanhThu,
      label: "Doanh thu",
      change: "+20%",
      sub: "tháng này",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-indigo-400"
        >
          <path
            d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"
            strokeWidth="2"
          />
        </svg>
      ),
      value: stats.caDieuTri,
      label: "Ca điều trị",
      change: "+10",
      sub: "tháng này",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {items.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 border rounded-xl p-5 bg-white shadow-sm"
        >
          <div className="flex-shrink-0">{stat.icon}</div>
          <div className="flex-1">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
            <div className="flex items-center gap-2 mt-2">
              {/* <span className="text-indigo-500 font-semibold">
                {stat.change}
              </span> */}
              <span className="bg-indigo-50 text-indigo-500 text-xs rounded px-2 py-0.5">
                {stat.sub}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
