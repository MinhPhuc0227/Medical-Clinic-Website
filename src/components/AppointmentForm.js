export async function initAppForm() {
  const doctorSelect = document.getElementById("doctor-select");
  const doctorInput = document.getElementById("doctor-input");

  const departmentSelect = document.getElementById("department-select");
  const departmentInput = document.getElementById("department-input");

  if (
    !doctorSelect ||
    !doctorInput ||
    !departmentSelect ||
    !departmentInput
  ) {
    return;
  }

  // Lấy dữ liệu bác sĩ
  const response = await fetch("/Doctors.json");
  const doctors = await response.json();

  // Lấy danh sách khoa (không trùng)
  const departments = [...new Set(doctors.map((doctor) => doctor.specialty))];

  // Hàm hiển thị Doctor
  function renderDoctors(list) {
    doctorSelect.innerHTML =
      '<option value="" selected disabled></option>';

    list.forEach((doctor) => {
      const option = document.createElement("option");
      option.value = doctor.name;
      option.textContent = doctor.name;
      option.className = "text-black bg-white";

      doctorSelect.appendChild(option);
    });
  }

  // Hàm hiển thị Department
  function renderDepartments(list) {
    departmentSelect.innerHTML =
      '<option value="" selected disabled></option>';

    list.forEach((department) => {
      const option = document.createElement("option");
      option.value = department;
      option.textContent = department;
      option.className = "text-black bg-white";

      departmentSelect.appendChild(option);
    });
  }

  // Hiển thị ban đầu
  renderDoctors(doctors);
  renderDepartments(departments);

  // Chọn Doctor trước
  doctorSelect.addEventListener("change", () => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor.name === doctorSelect.value
    );

    if (!selectedDoctor) return;

    doctorInput.value = selectedDoctor.name;

    departmentSelect.value = selectedDoctor.specialty;
    departmentInput.value = selectedDoctor.specialty;
  });

  // Chọn Department trước
  departmentSelect.addEventListener("change", () => {
    const selectedDepartment = departmentSelect.value;

    departmentInput.value = selectedDepartment;

    const filteredDoctors = doctors.filter(
      (doctor) => doctor.specialty === selectedDepartment
    );

    renderDoctors(filteredDoctors);

    doctorInput.value = "";
    doctorSelect.selectedIndex = 0;
  });
}