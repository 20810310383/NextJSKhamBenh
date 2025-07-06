// "use client";
// import React, { useState } from "react";
// import { Button, Input, Textarea } from "@heroui/react";
// import { Select, SelectItem } from "@heroui/react";

// const genders = [
//   { key: "boy", label: "Nam" },
//   { key: "girl", label: "Nữ" },
//   { key: "undetermined", label: "Khác" },
// ];

// export default function ExaminationForm({
//   name = "",
//   sex = "",
//   age = "",
//   content = "",
//   dichVu = "",
//   _id = "",
//   onSubmit,
// }: {
//   name?: string;
//   sex?: string;
//   age?: string;
//   content?: string;
//   dichVu?: string;
//   _id?: string;
//   onSubmit?: () => void;
// }) {
//   // Sinh hiệu
//   const [mach, setMach] = useState("");
//   const [nhietDo, setNhietDo] = useState("");
//   const [huyetAp, setHuyetAp] = useState("");
//   const [nhipTho, setNhipTho] = useState("");
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [bmi, setBmi] = useState("");

//   React.useEffect(() => {
//     const w = parseFloat(weight);
//     const h = parseFloat(height);
//     if (w > 0 && h > 0) {
//       const bmiValue = w / Math.pow(h / 100, 2);
//       setBmi(bmiValue.toFixed(2));
//     } else {
//       setBmi("");
//     }
//   }, [weight, height]);

//   // Hỏi bệnh, khám bệnh, chẩn đoán, kết luận
//   const [tienSuBenh, setTienSuBenh] = useState("");
//   const [khamToanThan, setKhamToanThan] = useState("");
//   const [khamBoPhan, setKhamBoPhan] = useState("");
//   const [luuY, setLuuY] = useState("");

//   const [chanDoanSoBo, setChanDoanSoBo] = useState("");
//   const [chanDoanChinh, setChanDoanChinh] = useState("");
//   const [chanDoanKemTheo, setChanDoanKemTheo] = useState("");
//   const [moTaChiTiet, setMoTaChiTiet] = useState("");

//   const [ketLuan, setKetLuan] = useState("");

//   const treatments = [
//     { key: "1", label: "Thực hiện thủ thuật - phẫu thuật" },
//     { key: "2", label: "Thực hiện điều trị dài hạn" },
//     { key: "3", label: "Không có chỉ định" },
//   ];
//   const [treatment, setTreatment] = useState("");
//   const [treatmentError, setTreatmentError] = useState("");

//   const handleTreatmentChange = (keys: any) => {
//     const value = Array.from(keys)[0] as string;
//     setTreatment(value);
//     if (value) {
//       setTreatmentError("");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!treatment) {
//       setTreatmentError("Vui lòng chọn chỉ định");
//       return;
//     }
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/phieukham/create-phieu-kham`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             tiepDon: _id, // ID tiếp đón
//             mach,
//             nhietDo,
//             huyetAp,
//             nhipTho,
//             canNang: weight,
//             chieuCao: height,
//             bmi,

//             tienSuBenh,

//             khamToanThan,
//             khamBoPhan,
//             luuY,

//             chanDoanSoBo,
//             chanDoanChinh,
//             chanDoanKemTheo,
//             moTaChiTiet,

//             ketLuan,
//             chiDinh: treatment,
//           }),
//         }
//       );
//       if (!res.ok) {
//         const err = await res.json();
//         alert(`Lỗi: ${err.message}`);
//         return;
//       }
//       alert("Tạo phiếu khám thành công!");
//       if (onSubmit) onSubmit();
//     } catch (error) {
//       console.error("Lỗi:", error);
//       alert("Lỗi khi gọi API");
//     }
//   };
//   return (
//     <div className="border border-gray-200 rounded-lg min-h-screen p-10 space-y-8 bg-white">
//       {/* Thông tin bệnh nhân */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <Input label="Họ và tên" value={name} readOnly />
//         <Input
//           label="Giới tính"
//           value={genders.find((g) => g.key === sex)?.label || ""}
//           readOnly
//         />
//         <Input label="Tuổi" value={age} readOnly />
//         <Input label="Lý do khám" value={dichVu} readOnly />
//         <Input label="Nội dung khám" value={content} readOnly />
//       </div>
//       {/* Sinh hiệu */}
//       <div>
//         <h2 className="font-bold text-lg mb-4">Sinh hiệu</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Mạch"
//             value={mach}
//             onChange={(e) => setMach(e.target.value)}
//           />
//           <Input
//             label="Nhiệt độ"
//             value={nhietDo}
//             onChange={(e) => setNhietDo(e.target.value)}
//           />
//           <Input
//             label="Huyết áp"
//             value={huyetAp}
//             onChange={(e) => setHuyetAp(e.target.value)}
//           />
//           <Input
//             label="Nhịp thở"
//             value={nhipTho}
//             onChange={(e) => setNhipTho(e.target.value)}
//           />
//           <Input
//             label="Cân nặng"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             type="number"
//             min="0"
//           />
//           <Input
//             label="Chiều cao"
//             value={height}
//             onChange={(e) => setHeight(e.target.value)}
//             type="number"
//             min="0"
//           />
//           <Input label="BMI" value={bmi} readOnly />
//         </div>
//       </div>
//       {/* Hỏi bệnh */}
//       <div>
//         <h2 className="font-bold text-lg mb-4">Hỏi bệnh</h2>
//         <Textarea
//           label="Tiền sử bệnh/dị ứng"
//           value={tienSuBenh}
//           onChange={(e) => setTienSuBenh(e.target.value)}
//         />
//       </div>
//       {/* Khám bệnh */}
//       <div>
//         <h2 className="font-bold text-lg mb-4">Khám bệnh</h2>
//         <Textarea
//           label="Toàn thân"
//           value={khamToanThan}
//           onChange={(e) => setKhamToanThan(e.target.value)}
//           className="mb-4"
//         />
//         <Textarea
//           label="Các bộ phận"
//           value={khamBoPhan}
//           onChange={(e) => setKhamBoPhan(e.target.value)}
//           className="mb-4"
//         />
//         <Textarea
//           label="Lưu ý"
//           value={luuY}
//           onChange={(e) => setLuuY(e.target.value)}
//         />
//       </div>
//       {/* Chẩn đoán */}
//       <div>
//         <h2 className="font-bold text-lg mb-4">Chẩn đoán</h2>
//         <Textarea
//           label="Chẩn đoán sơ bộ"
//           value={chanDoanSoBo}
//           onChange={(e) => setChanDoanSoBo(e.target.value)}
//           className="mb-4"
//         />
//         <Textarea
//           label="Chẩn đoán bệnh chính"
//           value={chanDoanChinh}
//           onChange={(e) => setChanDoanChinh(e.target.value)}
//           className="mb-4"
//         />
//         <Textarea
//           label="Chẩn đoán bệnh kèm theo"
//           value={chanDoanKemTheo}
//           onChange={(e) => setChanDoanKemTheo(e.target.value)}
//           className="mb-4"
//         />
//         <Textarea
//           label="Mô tả chi tiết"
//           value={moTaChiTiet}
//           onChange={(e) => setMoTaChiTiet(e.target.value)}
//         />
//       </div>
//       {/* Kết luận */}
//       <h2 className="font-bold text-lg mb-4">Kết luận khám</h2>
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <Textarea
//             label="Kết luận khám"
//             value={ketLuan}
//             onChange={(e) => setKetLuan(e.target.value)}
//             className="w-full min-h-[120px]"
//           />
//         </div>
//         <div className="flex-1 flex flex-col justify-end">
//           <Select
//             label="Chỉ định"
//             selectedKeys={treatment ? [treatment] : []}
//             onSelectionChange={handleTreatmentChange}
//             isInvalid={!!treatmentError}
//             errorMessage={treatmentError}
//             className="w-full min-h-[120px]"
//           >
//             {treatments.map((item) => (
//               <SelectItem key={item.key}>{item.label}</SelectItem>
//             ))}
//           </Select>
//         </div>
//       </div>
//       <div className="flex justify-end mt-4">
//         <Button color="primary" onClick={handleSubmit}>
//           Lưu phiếu khám
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";

const genders = [
  { key: "boy", label: "Nam" },
  { key: "girl", label: "Nữ" },
  { key: "undetermined", label: "Khác" },
];

export default forwardRef(function ExaminationForm(
  {
    name = "",
    sex = "",
    age = "",
    content = "",
    dichVu = "",
    _id = "",
  }: {
    name?: string;
    sex?: string;
    age?: string;
    content?: string;
    dichVu?: string;
    _id?: string;
  },
  ref: ForwardedRef<any>
) {
  // Sinh hiệu
  const [mach, setMach] = useState("");
  const [nhietDo, setNhietDo] = useState("");
  const [huyetAp, setHuyetAp] = useState("");
  const [nhipTho, setNhipTho] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");

  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      const bmiValue = w / Math.pow(h / 100, 2);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi("");
    }
  }, [weight, height]);

  // Hỏi bệnh, khám bệnh, chẩn đoán, kết luận
  const [tienSuBenh, setTienSuBenh] = useState("");
  const [khamToanThan, setKhamToanThan] = useState("");
  const [khamBoPhan, setKhamBoPhan] = useState("");
  const [luuY, setLuuY] = useState("");

  const [chanDoanSoBo, setChanDoanSoBo] = useState("");
  const [chanDoanChinh, setChanDoanChinh] = useState("");
  const [chanDoanKemTheo, setChanDoanKemTheo] = useState("");
  const [moTaChiTiet, setMoTaChiTiet] = useState("");

  const [ketLuan, setKetLuan] = useState("");

  const treatments = [
    { key: "1", label: "Thực hiện thủ thuật - phẫu thuật" },
    { key: "2", label: "Thực hiện điều trị dài hạn" },
    { key: "3", label: "Không có chỉ định" },
  ];
  const [treatment, setTreatment] = useState("");
  const [treatmentError, setTreatmentError] = useState("");

  const handleTreatmentChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    setTreatment(value);
    if (value) {
      setTreatmentError("");
    }
  };

  // Expose getFormData
  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      mach,
      nhietDo,
      huyetAp,
      nhipTho,
      canNang: weight,
      chieuCao: height,
      bmi,
      tienSuBenh,
      khamToanThan,
      khamBoPhan,
      luuY,
      chanDoanSoBo,
      chanDoanChinh,
      chanDoanKemTheo,
      moTaChiTiet,
      ketLuan,
      chiDinh: treatment,
    }),
  }));

  return (
    <div className="border border-gray-200 rounded-lg min-h-screen p-10 space-y-8 bg-white">
      {/* Thông tin bệnh nhân */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input label="Họ và tên" value={name} readOnly />
        <Input
          label="Giới tính"
          value={genders.find((g) => g.key === sex)?.label || ""}
          readOnly
        />
        <Input label="Tuổi" value={age} readOnly />
        <Input label="Lý do khám" value={dichVu} readOnly />
        <Input label="Nội dung khám" value={content} readOnly />
      </div>
      {/* Sinh hiệu */}
      <div>
        <h2 className="font-bold text-lg mb-4">Sinh hiệu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Mạch"
            value={mach}
            onChange={(e) => setMach(e.target.value)}
          />
          <Input
            label="Nhiệt độ"
            value={nhietDo}
            onChange={(e) => setNhietDo(e.target.value)}
          />
          <Input
            label="Huyết áp"
            value={huyetAp}
            onChange={(e) => setHuyetAp(e.target.value)}
          />
          <Input
            label="Nhịp thở"
            value={nhipTho}
            onChange={(e) => setNhipTho(e.target.value)}
          />
          <Input
            label="Cân nặng"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            min="0"
          />
          <Input
            label="Chiều cao"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            min="0"
          />
          <Input label="BMI" value={bmi} readOnly />
        </div>
      </div>
      {/* Hỏi bệnh */}
      <div>
        <h2 className="font-bold text-lg mb-4">Hỏi bệnh</h2>
        <Textarea
          label="Tiền sử bệnh/dị ứng"
          value={tienSuBenh}
          onChange={(e) => setTienSuBenh(e.target.value)}
        />
      </div>
      {/* Khám bệnh */}
      <div>
        <h2 className="font-bold text-lg mb-4">Khám bệnh</h2>
        <Textarea
          label="Toàn thân"
          value={khamToanThan}
          onChange={(e) => setKhamToanThan(e.target.value)}
          className="mb-4"
        />
        <Textarea
          label="Các bộ phận"
          value={khamBoPhan}
          onChange={(e) => setKhamBoPhan(e.target.value)}
          className="mb-4"
        />
        <Textarea
          label="Lưu ý"
          value={luuY}
          onChange={(e) => setLuuY(e.target.value)}
        />
      </div>
      {/* Chẩn đoán */}
      <div>
        <h2 className="font-bold text-lg mb-4">Chẩn đoán</h2>
        <Textarea
          label="Chẩn đoán sơ bộ"
          value={chanDoanSoBo}
          onChange={(e) => setChanDoanSoBo(e.target.value)}
          className="mb-4"
        />
        <Textarea
          label="Chẩn đoán bệnh chính"
          value={chanDoanChinh}
          onChange={(e) => setChanDoanChinh(e.target.value)}
          className="mb-4"
        />
        <Textarea
          label="Chẩn đoán bệnh kèm theo"
          value={chanDoanKemTheo}
          onChange={(e) => setChanDoanKemTheo(e.target.value)}
          className="mb-4"
        />
        <Textarea
          label="Mô tả chi tiết"
          value={moTaChiTiet}
          onChange={(e) => setMoTaChiTiet(e.target.value)}
        />
      </div>
      {/* Kết luận */}
      <h2 className="font-bold text-lg mb-4">Kết luận khám</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Textarea
            label="Kết luận khám"
            value={ketLuan}
            onChange={(e) => setKetLuan(e.target.value)}
            className="w-full min-h-[120px]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <Select
            label="Chỉ định"
            selectedKeys={treatment ? [treatment] : []}
            onSelectionChange={handleTreatmentChange}
            isInvalid={!!treatmentError}
            errorMessage={treatmentError}
            className="w-full min-h-[120px]"
          >
            {treatments.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
});
