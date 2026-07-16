function loadDoctors() {
  const doctorSelect = document.getElementById("doctor-select");

  // Nếu chưa tìm thấy thẻ html, đợi 100ms rồi thử lại (tránh lỗi render chậm)
  if (!doctorSelect) {
    setTimeout(loadDoctors, 100);
    return;
  }

  // Fetch dữ liệu từ file json nằm ở thư mục public
  fetch("/Doctors.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Không tìm thấy file data.json (Mã lỗi: ${res.status})`,
        );
      }
      return res.json();
    })
    .then((data) => {
      // Xóa các option cũ nếu có (tránh bị lặp data khi lưu file)
      doctorSelect.innerHTML =
        '<option value="" class="text-black bg-white" selected disabled></option>';

      data.forEach((doctor) => {
        const option = document.createElement("option");
        option.value = doctor.name;
        option.textContent = doctor.name;
        option.className = "text-black bg-white";
        doctorSelect.appendChild(option);
      });
      console.log("Đã tải danh sách Doctor thành công!");
    })
    .catch((err) => {
      console.error("Lỗi Fetch Doctor cụ thể:", err);
      alert("Lỗi tải dữ liệu bác sĩ, hãy kiểm tra tab Console F12!");
    });
}

// Kích hoạt hàm chạy luôn
loadDoctors();
