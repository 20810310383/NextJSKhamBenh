import React from "react";

interface DetailProps {
  data: any;
}

const Detail: React.FC<DetailProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="space-y-2 text-sm">
      <div>
        <b>Họ tên:</b> {data.tiepDon?.hoTen || ""}
      </div>
      <div>
        <b>SĐT:</b> {data.tiepDon?.soDienThoai || ""}
      </div>
      <div>
        <b>Địa chỉ:</b> {data.tiepDon?.diaChi || ""}
      </div>
      <div>
        <b>Ngày sinh:</b>{" "}
        {data.tiepDon?.ngaySinh
          ? new Date(data.tiepDon.ngaySinh).toLocaleDateString()
          : ""}
      </div>
      <div>
        <b>Lý do phẫu thuật:</b>
      </div>
      <div>
        <b>Nội dung phẫu thuật:</b>
      </div>
      <div>
        <b>Bác sĩ thực hiện:</b> {data.tiepDon?.bacSi?.hoTen || ""}
      </div>
      <div>
        <b>Ngày thực hiện:</b>{" "}
        {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : ""}
      </div>
      <div>
        <b>Phương pháp vô cảm:</b>
      </div>
      <div>
        <b>Mô tả quá trình:</b>
      </div>
      <div>
        <b>Ghi chú:</b> {data.ghiChu || "Không có"}
      </div>
      <div>
        <b>Kết quả:</b> {data.ketQua || "Chưa cập nhật"}
      </div>
      <div>
        <b>Chỉ định tiếp theo:</b>
      </div>
      <div>
        <b>Biến chứng:</b> {data.bienChung || "Không có"}
      </div>
      {data.fileDinhKem && (
        <div>
          <b>File đính kèm:</b>{" "}
          <a
            href={data.fileDinhKem}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Xem file
          </a>
        </div>
      )}
    </div>
  );
};

export default Detail;
