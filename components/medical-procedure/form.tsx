"use client";
import React, { useState } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";

const anesthesiaMethods = [
  { key: "gm", label: "Gây mê" },
  { key: "gt", label: "Gây tê" },
  { key: "khac", label: "Khác" },
];

const Form = () => {
  // Thông tin bệnh nhân
  const [name, setName] = useState("Nguyễn Văn A");
  const [sex, setSex] = useState("Nam");
  const [age, setAge] = useState("35");
  const [reason, setReason] = useState("Chấn thương gãy xương");
  const [content, setContent] = useState("Phẫu thuật kết hợp xương đùi");

  // Sinh hiệu
  const [mach, setMach] = useState("80");
  const [nhietDo, setNhietDo] = useState("36.8");
  const [huyetAp, setHuyetAp] = useState("120/80");
  const [nhipTho, setNhipTho] = useState("18");
  const [weight, setWeight] = useState("65");
  const [height, setHeight] = useState("170");
  const [bmi, setBmi] = useState("");

  React.useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      const bmiValue = w / Math.pow(h / 100, 2);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi("");
    }
  }, [weight, height]);

  // Các trường chuyên biệt phẫu thuật - thủ thuật
  const [tienSuBenh, setTienSuBenh] = useState(
    "Không có tiền sử bệnh lý đặc biệt"
  );
  const [chanDoanTruocMo, setChanDoanTruocMo] = useState(
    "Gãy xương đùi trái kín"
  );
  const [chiDinhPhauThuat, setChiDinhPhauThuat] = useState(
    "Cần phẫu thuật kết hợp xương"
  );
  const [tenPhauThuat, setTenPhauThuat] = useState(
    "Kết hợp xương đùi bằng nẹp vít"
  );
  const [anesthesia, setAnesthesia] = useState("gm");
  const [thoiGianBatDau, setThoiGianBatDau] = useState("2024-06-01T08:00");
  const [thoiGianKetThuc, setThoiGianKetThuc] = useState("2024-06-01T10:00");
  const [kipMo, setKipMo] = useState(
    "BS. Trần Văn B (phẫu thuật viên), BS. Lê Thị C (gây mê), Điều dưỡng D (dụng cụ)"
  );
  const [moTaQuaTrinh, setMoTaQuaTrinh] = useState(
    "Tiến hành rạch da, bộc lộ xương, đặt nẹp vít cố định, kiểm tra cầm máu, đóng vết mổ"
  );
  const [ketQua, setKetQua] = useState(
    "Xương được cố định vững chắc, không phát hiện tổn thương thêm"
  );
  const [bienChung, setBienChung] = useState("Không có");
  const [huongDieuTriSauMo, setHuongDieuTriSauMo] = useState(
    "Theo dõi, dùng kháng sinh, giảm đau, tập vận động sớm"
  );
  const [ketLuan, setKetLuan] = useState("Ca mổ thành công, bệnh nhân ổn định");
  const [chiDinhTiepTheo, setChiDinhTiepTheo] = useState(
    "Tái khám sau 1 tuần, tiếp tục tập phục hồi chức năng"
  );
  const [giaTien, setGiaTien] = useState("15000000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu lên backend
    alert("Đã lưu phiếu phẫu thuật - thủ thuật!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-200 rounded-lg min-h-screen p-10 space-y-8 bg-white"
    >
      {/* Thông tin bệnh nhân */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Giới tính"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        />
        <Input
          label="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <Input
          label="Lý do phẫu thuật"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <Input
          label="Nội dung phẫu thuật"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
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
      {/* Tiền sử bệnh/dị ứng */}
      <div>
        <h2 className="font-bold text-lg mb-4">Tiền sử bệnh/dị ứng</h2>
        <Textarea
          label="Tiền sử bệnh/dị ứng"
          value={tienSuBenh}
          onChange={(e) => setTienSuBenh(e.target.value)}
        />
      </div>
      {/* Chẩn đoán trước mổ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Chẩn đoán trước mổ</h2>
        <Textarea
          label="Chẩn đoán trước mổ"
          value={chanDoanTruocMo}
          onChange={(e) => setChanDoanTruocMo(e.target.value)}
        />
      </div>
      {/* Chỉ định phẫu thuật/thủ thuật */}
      <div>
        <h2 className="font-bold text-lg mb-4">
          Chỉ định phẫu thuật/thủ thuật
        </h2>
        <Textarea
          label="Chỉ định phẫu thuật/thủ thuật"
          value={chiDinhPhauThuat}
          onChange={(e) => setChiDinhPhauThuat(e.target.value)}
        />
      </div>
      {/* Tên phẫu thuật/thủ thuật */}
      <div>
        <h2 className="font-bold text-lg mb-4">Tên phẫu thuật/thủ thuật</h2>
        <Input
          label="Tên phẫu thuật/thủ thuật"
          value={tenPhauThuat}
          onChange={(e) => setTenPhauThuat(e.target.value)}
        />
      </div>
      {/* Phương pháp vô cảm */}
      <div>
        <h2 className="font-bold text-lg mb-4">Phương pháp vô cảm</h2>
        <Select
          label="Phương pháp vô cảm"
          selectedKeys={anesthesia ? [anesthesia] : []}
          onSelectionChange={(keys) =>
            setAnesthesia(Array.from(keys)[0] as string)
          }
        >
          {anesthesiaMethods.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      {/* Thời gian bắt đầu/kết thúc */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Thời gian bắt đầu"
          type="datetime-local"
          value={thoiGianBatDau}
          onChange={(e) => setThoiGianBatDau(e.target.value)}
        />
        <Input
          label="Thời gian kết thúc"
          type="datetime-local"
          value={thoiGianKetThuc}
          onChange={(e) => setThoiGianKetThuc(e.target.value)}
        />
      </div>
      {/* Kíp mổ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Kíp mổ</h2>
        <Textarea
          label="Kíp mổ (bác sĩ phẫu thuật, phụ mổ, gây mê, dụng cụ,...)"
          value={kipMo}
          onChange={(e) => setKipMo(e.target.value)}
        />
      </div>
      {/* Mô tả quá trình phẫu thuật/thủ thuật */}
      <div>
        <h2 className="font-bold text-lg mb-4">
          Mô tả quá trình phẫu thuật/thủ thuật
        </h2>
        <Textarea
          label="Mô tả quá trình phẫu thuật/thủ thuật"
          value={moTaQuaTrinh}
          onChange={(e) => setMoTaQuaTrinh(e.target.value)}
        />
      </div>
      {/* Kết quả/phát hiện trong mổ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Kết quả/phát hiện trong mổ</h2>
        <Textarea
          label="Kết quả/phát hiện trong mổ"
          value={ketQua}
          onChange={(e) => setKetQua(e.target.value)}
        />
      </div>
      {/* Biến chứng */}
      <div>
        <h2 className="font-bold text-lg mb-4">Biến chứng (nếu có)</h2>
        <Textarea
          label="Biến chứng (nếu có)"
          value={bienChung}
          onChange={(e) => setBienChung(e.target.value)}
        />
      </div>
      {/* Hướng điều trị sau mổ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Hướng điều trị sau mổ</h2>
        <Textarea
          label="Hướng điều trị sau mổ"
          value={huongDieuTriSauMo}
          onChange={(e) => setHuongDieuTriSauMo(e.target.value)}
        />
      </div>
      {/* Kết luận */}
      <div>
        <h2 className="font-bold text-lg mb-4">Kết luận</h2>
        <Textarea
          label="Kết luận"
          value={ketLuan}
          onChange={(e) => setKetLuan(e.target.value)}
        />
      </div>
      {/* Chỉ định điều trị tiếp theo */}
      <div>
        <h2 className="font-bold text-lg mb-4">Chỉ định điều trị tiếp theo</h2>
        <Textarea
          label="Chỉ định điều trị tiếp theo"
          value={chiDinhTiepTheo}
          onChange={(e) => setChiDinhTiepTheo(e.target.value)}
        />
      </div>
      {/* Giá tiền */}
      <div>
        <h2 className="font-bold text-lg mb-4">Thông tin tài chính</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Giá tiền (VNĐ)"
            value={giaTien}
            onChange={(e) => setGiaTien(e.target.value)}
            type="number"
            min="0"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" color="primary">
          Lưu phiếu
        </Button>
      </div>
    </form>
  );
};

export default Form;
