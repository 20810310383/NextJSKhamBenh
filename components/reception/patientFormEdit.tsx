"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import { DatePicker } from "@heroui/react";
import {
  now,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  parseAbsolute,
} from "@internationalized/date";
import { Select, SelectItem } from "@heroui/react";
import { log } from "console";

export const sex = [
  { key: "boy", label: "Nam" },
  { key: "girl", label: "Nữ" },
  {
    key: "undetermined",
    label: "Khác",
  },
];

export const old = [
  { key: "Infant", label: "Trẻ sơ sinh" },
  { key: "child", label: "Thiếu nhi" },
  { key: "young", label: "Thanh thiếu niên" },
  { key: "adult", label: "Người trưởng thành" },
  { key: "Senior", label: "Người cao tuổi" },
];

// export const service = [
//   { key: "general", label: "Kiểm tra tổng quát" },
//   { key: "implant", label: "Cấy ghép Implant" },
//   { key: "orthodontics", label: "Chỉnh nha" },
//   { key: "periodontics", label: "Nha Chu" },
//   { key: "oralSurgery", label: "Tiểu phẫu - Răng khôn" },
// ];

// export const doctors1 = [
//   { key: "1", label: "Bác sĩ 1" },
//   { key: "2", label: "Bác sĩ 2" },
//   { key: "3", label: "Bác sĩ 3" },
//   { key: "4", label: "Bác sĩ 4" },
//   { key: "5", label: "Bác sĩ 5" },
// ];
export type TiepDonItem = {
  _id: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  gioiTinh: string;
  canCuocCongDan: string;
  diaChi: string;
  ngaySinh: string;
  doiTuong: string;
  dichVu?: { _id: string; tenDichVu: string };
  thoiGianHen: string;
  noiDung: string;
  bacSi?: { _id: string; hoTen: string };
  trangThai: string;
};

type PatientFormProps = {
  data: TiepDonItem;

  onSubmit?: () => void;
  onCancel?: () => void;
};

type DichVu = {
  _id: string;
  tenDichVu: string;
  moTa: string;
  giaTien: number;
};
type BacSi = {
  _id: string;
  hoTen: string;
  chuyenKhoa: string;
};
const PatientFormEdit = ({ data, onSubmit, onCancel }: PatientFormProps) => {
  const [dob, setDob] = useState<any>(null);
  const [objectType, setObjectType] = useState<string>("");

  // State cho các trường và lỗi
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [gioiTinhError, setGioiTinhError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [idCard, setIdCard] = useState("");
  const [idCardError, setIdCardError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [dobError, setDobError] = useState("");
  const [objectTypeError, setObjectTypeError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [appointmentTimeError, setAppointmentTimeError] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorError, setDoctorError] = useState("");
  const [appointmentTime, setAppointmentTime] = useState<any>(
    now(getLocalTimeZone())
  );
  const [content, setContent] = useState("");
  const [trangThai, setTrangThai] = useState("Chờ Khám");
  const [dichvus, setDichvus] = useState<DichVu[]>([]);
  const [loading, setLoading] = useState(true);
  const [bacsis, setBacsi] = useState<BacSi[]>([]);
  const [doctorStatus, setDoctorStatus] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const checkDoctorStatus = async () => {
    if (!doctor || !appointmentTime) {
      setDoctorStatus("");
      return;
    }

    const start = new Date(
      Date.UTC(
        appointmentTime.year,
        appointmentTime.month - 1,
        appointmentTime.day,
        appointmentTime.hour || 0,
        appointmentTime.minute || 0
      )
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tiepdon/check-busy?` +
        new URLSearchParams({
          bacSiId: doctor,
          startTime: start.toISOString(),
        })
    );

    const data = await res.json();
    setDoctorStatus(data.status || "");
  };

  useEffect(() => {
    checkDoctorStatus();
  }, [doctor, appointmentTime]);

  useEffect(() => {
    if (data) {
      setName(data.hoTen || "");
      setEmail(data.email || "");
      setPhone(data.soDienThoai || "");
      setGioiTinh(data.gioiTinh || "");
      setIdCard(data.canCuocCongDan || "");
      setAddress(data.diaChi || "");
      setContent(data.noiDung || "");
      setSelectedService(data.dichVu?._id || "");
      setDoctor(data.bacSi?._id || "");
      setObjectType(data.doiTuong || "");
      // Ngày sinh (chỉ ngày)
      setDob(data.ngaySinh ? parseDate(data.ngaySinh.split("T")[0]) : null);
      // Thời gian hẹn (có giờ phút)
      setAppointmentTime(
        data.thoiGianHen
          ? parseAbsolute(data.thoiGianHen, getLocalTimeZone())
          : now(getLocalTimeZone())
      );
      setTrangThai(data.trangThai || "Chờ Khám");

      setTimeout(() => {
        checkDoctorStatus();
      }, 0);
    }
  }, [data]);

  useEffect(() => {
    if (selectedService && dichvus.length) {
      const selected = dichvus.find((d) => d._id === selectedService);
      if (selected) {
        setServicePrice(
          Number(selected.giaTien).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
          })
        );
      } else {
        setServicePrice("");
      }
    } else {
      setServicePrice("");
    }
  }, [selectedService, dichvus]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dichvu/get-all-dich-vu`)
      .then((res) => res.json())
      .then((data) => {
        console.log("===> API Response:", data); // Log ra console trình duyệt
        setDichvus(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải dịch vụ:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bacsi/get-all-bac-si`)
      .then((res) => res.json())
      .then((data) => {
        console.log("===> API Response:", data); // Log ra console trình duyệt
        setBacsi(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải bác sĩ:", err);
        setLoading(false);
      });
  }, []);

  const service = dichvus?.map((item) => ({
    key: item._id,
    label: item.tenDichVu,
  }));

  const doctors = bacsis?.map((item) => ({
    key: item._id,
    label: item.hoTen,
  }));

  const getAge = (date: any): number | null => {
    if (!date) return null;
    const today = new Date();
    const birthDate = new Date(date.year, date.month - 1, date.day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getObjectTypeByAge = (age: number | null): string => {
    if (age === null) return "";
    if (age < 6) return "Infant";
    if (age < 16) return "child";
    if (age < 30) return "young";
    if (age < 60) return "adult";
    return "Senior";
  };

  const handleDobChange = (date: any) => {
    setDob(date);
    const age = getAge(date);
    const type = getObjectTypeByAge(age);
    setObjectType(type);
    // Clear error when user selects a date
    if (date) {
      setDobError("");
    }
  };

  const handleObjectTypeChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    setObjectType(value);
    if (value) {
      setObjectTypeError("");
    }
  };

  // Clear errors when user types
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.trim()) {
      setNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.trim()) {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (e.target.value.trim()) {
      setPhoneError("");
    }
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdCard(e.target.value);
    if (e.target.value.trim()) {
      setIdCardError("");
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (e.target.value.trim()) {
      setAddressError("");
    }
  };

  const handleGioiTinhChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    setGioiTinh(value);
    if (value) {
      setGioiTinhError("");
    }
  };

  // Xử lý thay đổi dịch vụ
  const handleServiceChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    setSelectedService(value);
    if (value) {
      setServiceError("");
      const selected = dichvus.find((d) => d._id === value);
      if (selected) {
        setServicePrice(
          Number(selected.giaTien).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
          })
        );
      } else {
        setServicePrice("");
      }
    }
  };

  const handleDoctorChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    setDoctor(value);
    if (value) {
      setDoctorError("");
    }
  };

  const handleAppointmentTimeChange = (date: any) => {
    setAppointmentTime(date);
    if (date) {
      setAppointmentTimeError("");
    }
  };

  // Validate các trường
  const validate = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError("Họ và tên không được để trống");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email không được để trống");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Email không đúng định dạng");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!phone.trim()) {
      setPhoneError("Số điện thoại không được để trống");
      valid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
      setPhoneError("Số điện thoại phải đủ 10 số và bắt đầu bằng 0");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!idCard.trim()) {
      setIdCardError("Căn cước không được để trống");
      valid = false;
    } else if (!/^\d{9}$/.test(idCard) && !/^\d{12}$/.test(idCard)) {
      setIdCardError("Căn cước phải đủ 9 hoặc 12 số");
      valid = false;
    } else {
      setIdCardError("");
    }

    if (!address.trim()) {
      setAddressError("Địa chỉ không được để trống");
      valid = false;
    } else {
      setAddressError("");
    }

    if (!gioiTinh) {
      setGioiTinhError("Giới tính không được để trống");
      valid = false;
    } else {
      setGioiTinhError("");
    }

    if (!dob) {
      setDobError("Ngày sinh không được để trống");
      valid = false;
    } else {
      setDobError("");
    }

    if (!objectType) {
      setObjectTypeError("Đối tượng không được để trống");
      valid = false;
    } else {
      setObjectTypeError("");
    }

    if (!selectedService) {
      setServiceError("Dịch vụ không được để trống");
      valid = false;
    } else {
      setServiceError("");
    }

    if (!doctor) {
      setDoctorError("Bác sĩ không được để trống");
      valid = false;
    } else {
      setDoctorError("");
    }

    if (!appointmentTime) {
      setAppointmentTimeError("Thời gian hẹn không được để trống");
      valid = false;
    } else {
      setAppointmentTimeError("");
    }

    return valid;
  };

  // Xử lý submit
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validate()) {
      const payload = {
        hoTen: name,
        email,
        soDienThoai: phone,
        gioiTinh,
        canCuocCongDan: idCard,
        diaChi: address,
        ngaySinh: dob ? new Date(dob.year, dob.month - 1, dob.day) : null,
        doiTuong: objectType, // Lưu key
        dichVu: selectedService,
        thoiGianHen: appointmentTime
          ? new Date(
              appointmentTime.year,
              appointmentTime.month - 1,
              appointmentTime.day,
              appointmentTime.hour || 0,
              appointmentTime.minute || 0
            )
          : null,
        noiDung: content,
        bacSi: doctor,
      };

      console.log("Form data:", payload);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tiepdon/update-tiep-don/${data._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              trangThai,
            }),
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Lỗi tạo tiếp đón:", errorData);
          alert(`Lỗi: ${errorData.message}`);
          return;
        }

        const result = await res.json();
        console.log("Tạo tiếp đón thành công:", result);

        alert("Tiếp đón thành công!");
        if (onSubmit) onSubmit();
      } catch (err) {
        console.error("Lỗi kết nối API:", err);
        alert("Đã có lỗi khi gọi API.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex gap-8 rounded-2xl px-14 py-8 pt-14 justify-between">
          <div className="w-full">
            <Input
              label="Họ và tên"
              type="text"
              value={name}
              onChange={handleNameChange}
              isInvalid={!!nameError}
              errorMessage={nameError}
            />
          </div>
          <div className="w-full">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!emailError}
              errorMessage={emailError}
            />
          </div>
          <div className="w-full">
            <Input
              label="Số điện thoại"
              value={phone}
              onChange={handlePhoneChange}
              isInvalid={!!phoneError}
              errorMessage={phoneError}
            />
          </div>
          <div className="w-full">
            <Select
              label="Giới tính"
              selectedKeys={gioiTinh ? [gioiTinh] : []}
              onSelectionChange={handleGioiTinhChange}
              isInvalid={!!gioiTinhError}
              errorMessage={gioiTinhError}
            >
              {sex.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-8 rounded-2xl px-14 py-8 justify-between">
          <div className="w-full">
            <Input
              label="Căn cước công dân"
              value={idCard}
              onChange={handleIdCardChange}
              isInvalid={!!idCardError}
              errorMessage={idCardError}
            />
          </div>
          <div className="w-full">
            <Input
              label="Địa chỉ"
              value={address}
              onChange={handleAddressChange}
              isInvalid={!!addressError}
              errorMessage={addressError}
            />
          </div>
          <div className="w-full">
            <DatePicker
              showMonthAndYearPickers
              label="Ngày tháng năm sinh"
              variant="bordered"
              value={dob}
              onChange={handleDobChange}
              isInvalid={!!dobError}
              errorMessage={dobError}
            />
          </div>
          <div className="w-full">
            <Input
              label="Đối tượng"
              value={
                objectType
                  ? old.find((item) => item.key === objectType)?.label || ""
                  : ""
              }
              readOnly
              className="bg-gray-100 cursor-not-allowed rounded-lg"
              isInvalid={!!objectTypeError}
              errorMessage={objectTypeError}
            />
          </div>
        </div>
        <div className="px-14 py-8 flex justify-between gap-8">
          <div className="w-full">
            <Select
              label="Dịch vụ"
              selectedKeys={selectedService ? [selectedService] : []}
              onSelectionChange={handleServiceChange}
              isInvalid={!!serviceError}
              errorMessage={serviceError}
            >
              {service.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full">
            <Input label="Giá tiền" value={servicePrice} readOnly></Input>
          </div>
          <div className="w-full">
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              value={appointmentTime}
              onChange={handleAppointmentTimeChange}
              label="Thời gian hẹn"
              variant="bordered"
              isInvalid={!!appointmentTimeError}
              errorMessage={appointmentTimeError}
            />
          </div>
        </div>
        <div className="px-14 py-8 flex justify-between gap-8">
          <div className="w-full">
            <Input
              label="Nội dung"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Select
              label="Bác sĩ"
              selectedKeys={doctor ? [doctor] : []}
              onSelectionChange={handleDoctorChange}
              isInvalid={!!doctorError}
              errorMessage={doctorError}
            >
              {doctors.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
            {doctorStatus && (
              <p className="mt-1 text-sm">
                Trạng thái lịch hẹn:{" "}
                <span
                  className={
                    doctorStatus === "Vắng"
                      ? "text-green-600"
                      : doctorStatus === "Bình thường"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }
                >
                  {doctorStatus}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 px-14">
          <span className="font-medium text-green-500">
            Trạng thái: {trangThai}
          </span>
          {/* <button
            type="button"
            onClick={() =>
              setTrangThai((prev) =>
                prev === "Chờ Khám" ? "Đã Khám" : "Chờ Khám"
              )
            }
            className="px-4 py-2 rounded-full bg-blue-500 text-white"
          >
            Chuyển trạng thái
          </button> */}
        </div>

        <div className="flex justify-between mt-8 px-14 pb-8">
          <button
            type="button"
            className="w-1/5 rounded-full py-2 font-semibold transition"
            style={{
              background: "var(--color-tertiary)",
              color: "var(--color-button-text)",
            }}
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="w-1/5 rounded-full py-2 font-semibold transition"
            style={{
              background: "var(--color-button)",
              color: "var(--color-button-text)",
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientFormEdit;
