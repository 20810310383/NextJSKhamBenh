"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";

const anesthesiaMethods = [
  { key: "Gây mê", label: "Gây mê" },
  { key: "Gây tê", label: "Gây tê" },
  { key: "Khác", label: "Khác" },
];

const Form = ({ id }: { id?: string }) => {
  // Thông tin bệnh nhân
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");
  const [content, setContent] = useState("");

  // Sinh hiệu
  const [mach, setMach] = useState("");
  const [nhietDo, setNhietDo] = useState("");
  const [huyetAp, setHuyetAp] = useState("");
  const [nhipTho, setNhipTho] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
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
  const [tienSuBenh, setTienSuBenh] = useState("");
  const [chanDoanTruocMo, setChanDoanTruocMo] = useState("");
  const [chiDinhPhauThuat, setChiDinhPhauThuat] = useState("");
  const [tenPhauThuat, setTenPhauThuat] = useState("");
  const [anesthesia, setAnesthesia] = useState("");
  const [thoiGianBatDau, setThoiGianBatDau] = useState("");
  const [thoiGianKetThuc, setThoiGianKetThuc] = useState("");
  const [kipMo, setKipMo] = useState("");
  const [moTaQuaTrinh, setMoTaQuaTrinh] = useState("");
  const [ketQua, setKetQua] = useState("");
  const [bienChung, setBienChung] = useState("");
  const [huongDieuTriSauMo, setHuongDieuTriSauMo] = useState("");
  const [ketLuan, setKetLuan] = useState("");
  const [chiDinhTiepTheo, setChiDinhTiepTheo] = useState("");
  const [giaTien, setGiaTien] = useState("0");
  const [giaTienDichVu, setGiaTienDichVu] = useState(0); // giữ giá dịch vụ gốc

  const sexx = [
    { key: "boy", label: "Nam" },
    { key: "girl", label: "Nữ" },
    {
      key: "undetermined",
      label: "Khác",
    },
  ];

  // Thêm state cho dụng cụ
  const [danhSachDungCu, setDanhSachDungCu] = useState<
    { _id: string; tenVatDung: string }[]
  >([]);
  const [dungCuDaChon, setDungCuDaChon] = useState<string[]>([]);

  const fetchDungCuSuDung = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dungcusudung/get-dungcusudung`
      );
      const result = await res.json();
      if (Array.isArray(result.data)) {
        setDanhSachDungCu(result.data);
      } else {
        console.warn("Dữ liệu không đúng định dạng:", result);
      }
    } catch (error) {
      console.error("Lỗi khi fetch dụng cụ sử dụng:", error);
    }
  };
  const formatVND = (value: number | string) => {
    const num = Number(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  useEffect(() => {
    fetchDungCuSuDung();
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/phieukham/get-phieu-kham-by-id/${id}`
    )
      .then((res) => res.json())
      .then((res) => {
        const item = res.data;
        console.log("Phiếu khám:", item);
        if (!item || !item.tiepDon) return;

        // Thông tin bệnh nhân
        setName(item.tiepDon.hoTen || "");
        setSex(item.tiepDon.gioiTinh || "");
        // ✅ Tính tuổi từ ngày sinh
        if (item.tiepDon.ngaySinh) {
          const birth = new Date(item.tiepDon.ngaySinh);
          const now = new Date();
          const ageCalculated =
            now.getFullYear() -
            birth.getFullYear() -
            (now <
            new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
              ? 1
              : 0);
          setAge(ageCalculated.toString());
        } else {
          setAge(""); // fallback nếu không có ngày sinh
        }

        setReason(item.tiepDon.dichVu?.tenDichVu || "");
        setContent(item.tiepDon.noiDung || "");

        // Sinh hiệu
        setMach(item.mach || "");
        setNhietDo(item.nhietDo || "");
        setHuyetAp(item.huyetAp || "");
        setNhipTho(item.nhipTho || "");
        setWeight(item.canNang || "");
        setHeight(item.chieuCao || "");
        setBmi(item.bmi || "");

        // Các trường chuyên biệt
        setTienSuBenh(item.tienSuBenh || "");
        setChanDoanTruocMo(item.chanDoanTruocMo || "");
        setChiDinhPhauThuat(item.chiDinhPhauThuat || "");
        setAnesthesia(item.phuongPhapVoCam || "Gây mê"); // key: gm / gt / khac
        setThoiGianBatDau(item.thoiGianBatDau || "");
        setThoiGianKetThuc(item.thoiGianKetThuc || "");
        setKipMo(item.kipMo || "");
        setMoTaQuaTrinh(item.moTaQuaTrinh || "");
        setKetQua(item.ketQuaTrongMo || "");
        setBienChung(item.bienChung || "");
        setHuongDieuTriSauMo(item.huongDieuTriSauMo || "");
        setKetLuan(item.ketLuanSauMo || "");
        setChiDinhTiepTheo(item.chiDinhDieuTriTiepTheo || "");
        setGiaTien(item.thanhToan || "0");
        setGiaTienDichVu(item.tiepDon?.dichVu?.giaTien || 0);
        setDungCuDaChon(item.dungCuSuDung || []);
      })
      .catch((err) => console.error("Lỗi khi load phiếu khám:", err));
  }, [id]);

  const handleGiaTienChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nhapTay = parseFloat(e.target.value) || 0;
    const tong = nhapTay + giaTienDichVu;
    setGiaTien(tong.toString());
    alert(
      `✅ Đã cập nhật tổng tiền!\n\n` +
        `• Giá nhập: ${formatVND(nhapTay)}\n` +
        `• Giá dịch vụ: ${formatVND(giaTienDichVu)}\n` +
        `→ Tổng cộng: ${formatVND(tong)}`
    );
  };

  const handleDungCuChange = (keys: any) => {
    setDungCuDaChon(Array.from(keys) as string[]);
  };

  const handleSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu lên backend
    alert(
      "Đã lưu phiếu phẫu thuật - thủ thuật!\nDụng cụ đã chọn: " +
        dungCuDaChon
          .map(
            (id) => danhSachDungCu.find((d) => d._id === id)?.tenVatDung || id
          )
          .join(", ")
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        mach,
        nhietDo,
        huyetAp,
        nhipTho,
        canNang: weight,
        chieuCao: height,
        bmi,
        tienSuBenh,
        chanDoanTruocMo,
        chiDinhPhauThuat,
        tenPhauThuat,
        phuongPhapVoCam: anesthesia,
        thoiGianBatDau,
        thoiGianKetThuc,
        kipMo,
        moTaQuaTrinh,
        ketQuaTrongMo: ketQua,
        bienChung,
        huongDieuTriSauMo,
        ketLuanSauMo: ketLuan,
        chiDinhDieuTriTiepTheo: chiDinhTiepTheo,
        dungCuSuDung: dungCuDaChon,
        thanhToan: parseFloat(giaTien),
        trangThai: "Đã Hoàn Thành", // Cập nhật trạng thái nếu cần
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/update-phieu-kham/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Lưu thất bại");

      alert("✅ Lưu phiếu thành công!");
      window.location.href = "/medical-procedure"; // Redirect sau khi lưu thành công
    } catch (error: any) {
      console.error("Lỗi lưu phiếu:", error);
      alert("❌ Lỗi khi lưu phiếu: " + error.message);
    }
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
      {/* Dụng cụ */}
      <div>
        <h2 className="font-bold text-lg mb-4">Dụng cụ sử dụng</h2>
        <Select
          label="Chọn dụng cụ sử dụng"
          selectionMode="multiple"
          selectedKeys={dungCuDaChon}
          onSelectionChange={handleDungCuChange}
        >
          {danhSachDungCu.map((item) => (
            <SelectItem key={item._id}>{item.tenVatDung}</SelectItem>
          ))}
        </Select>
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
          {/* <Input
            label="Giá tiền (VNĐ)"
            value={giaTien}
            onChange={(e) => setGiaTien(e.target.value)}
            type="number"
            min="0"
          /> */}
          <Input
            label="Giá tiền (VNĐ)"
            value={giaTien}
            onChange={(e) => setGiaTien(e.target.value)}
            onBlur={handleGiaTienChange} // ✅ tự cộng khi rời khỏi input
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
