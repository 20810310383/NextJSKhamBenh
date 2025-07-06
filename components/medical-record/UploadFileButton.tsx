import { Button } from "@heroui/button";
import React from "react";

function UploadFileButton({ phieuId }: { phieuId: string }) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phieukham/upload-file/${phieuId}`,
        { method: "POST", body: formData }
      );
      const result = await res.json();
      if (res.ok) {
        alert("Upload thành công");
        window.location.reload();
      } else {
        alert("Lỗi: " + (result.message || "Không xác định"));
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi upload file");
    }
  };

  return (
    <>
      <Button color="primary" size="sm" onPress={handleUploadClick}>
        Thêm file
      </Button>
      <input
        type="file"
        accept=".pdf,.docx"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
}
export default UploadFileButton;
