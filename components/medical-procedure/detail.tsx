import React from "react";

interface DetailProps {
  data: any;
}

const formatDate = (dateStr?: string) =>
  dateStr ? new Date(dateStr).toLocaleString("vi-VN") : "";

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
        <b>Ngày sinh:</b> {formatDate(data.tiepDon?.ngaySinh)}
      </div>
      <div>
        <b>Lý do phẫu thuật:</b> {data.chanDoanTruocMo || "Chưa cập nhật"}
      </div>
      <div>
        <b>Nội dung phẫu thuật:</b> {data.chiDinhPhauThuat || "Chưa cập nhật"}
      </div>
      <div>
        <b>Bác sĩ thực hiện:</b> {data.tiepDon?.bacSi?.hoTen || ""}
      </div>
      <div>
        <b>Ngày thực hiện:</b> {formatDate(data.createdAt)}
      </div>
      <div>
        <b>Phương pháp vô cảm:</b> {data.phuongPhapVoCam || ""}
      </div>
      <div>
        <b>Mô tả quá trình:</b> {data.moTaQuaTrinh || ""}
      </div>
      <div>
        <b>Kết quả trong mổ:</b> {data.ketQuaTrongMo || ""}
      </div>
      <div>
        <b>Biến chứng:</b> {data.bienChung || "Không có"}
      </div>
      <div>
        <b>Hướng điều trị sau mổ:</b> {data.huongDieuTriSauMo || ""}
      </div>
      <div>
        <b>Kết luận sau mổ:</b> {data.ketLuanSauMo || ""}
      </div>
      <div>
        <b>Chỉ định điều trị tiếp theo:</b> {data.chiDinhDieuTriTiepTheo || ""}
      </div>
      <div>
        <b>Thời gian bắt đầu:</b> {formatDate(data.thoiGianBatDau)}
      </div>
      <div>
        <b>Thời gian kết thúc:</b> {formatDate(data.thoiGianKetThuc)}
      </div>
      <div>
        <b>Tổng chi phí:</b>{" "}
        {data.thanhToan?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }) || "0 ₫"}
      </div>
      {data.dungCuSuDung?.length > 0 && (
        <div>
          <b>Dụng cụ sử dụng:</b>
          <ul className="list-disc list-inside">
            {data.dungCuSuDung.map((d: any, index: number) => (
              <li key={index}>{d.tenVatDung}</li>
            ))}
          </ul>
        </div>
      )}

      {data.fileKetQua && (
        <div>
          <b>File đính kèm:</b>{" "}
          <a
            href={data.fileKetQua}
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
