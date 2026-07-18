export async function initAppForm() {
  const doctorSelect = document.getElementById("doctor-select");

  // Nếu chưa có select thì thoát
  if (!doctorSelect) return;

  // Lấy dữ liệu
  const response = await fetch("/Doctors.json");
  const doctors = await response.json();

  // Reset option mặc định
  doctorSelect.innerHTML = `
    <option value="" selected disabled></option>
  `;

  // Thêm danh sách bác sĩ
  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.name;
    option.textContent = doctor.name;

    doctorSelect.appendChild(option);
  });
}
