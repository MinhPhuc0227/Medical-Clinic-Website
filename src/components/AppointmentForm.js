export async function initAppForm() {
  const doctorSelect = document.getElementById("doctor-select");
  const doctorInput = document.getElementById("doctor-input");

  const departmentSelect = document.getElementById("department-select");
  const departmentInput = document.getElementById("department-input");

  if (!doctorSelect || !doctorInput || !departmentSelect || !departmentInput) {
    return;
  }

  // Lấy dữ liệu bác sĩ
  const response = await fetch("/Doctors.json");
  const doctors = await response.json();

  // Lấy danh sách khoa (không trùng)
  const departments = [...new Set(doctors.map((doctor) => doctor.specialty))];

  // Hàm hiển thị Doctor
  function renderDoctors(list) {
    doctorSelect.innerHTML = '<option value="" selected disabled></option>';

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
    departmentSelect.innerHTML = '<option value="" selected disabled></option>';

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
      (doctor) => doctor.name === doctorSelect.value,
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
      (doctor) => doctor.specialty === selectedDepartment,
    );

    renderDoctors(filteredDoctors);

    doctorInput.value = "";
    doctorSelect.selectedIndex = 0;
  });

  addSubmitAppointmentFormEvent();
}
// nút submit
function addSubmitAppointmentFormEvent() {
  const form = document.getElementById("appointmentForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("appointmentName").value.trim();
    const gender = document.getElementById("appointmentGender").value;
    const email = document.getElementById("appointmentEmail").value.trim();
    const phone = document.getElementById("appointmentPhone").value.trim();
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const doctor = document.getElementById("doctor-input").value.trim();
    const department = document.getElementById("department-input").value.trim();
    const message = document.getElementById("appointmentMessage").value.trim();

    if (
      !name ||
      !gender ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !doctor ||
      !department
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    const appointments =
      JSON.parse(localStorage.getItem("appointmentFormData")) || [];

    const appointment = {
      id: crypto.randomUUID(),
      name,
      gender,
      email,
      phone,
      date,
      time,
      doctor,
      department,
      message,
      createdAt: new Date().toLocaleString("sv-SE"),
    };

    appointments.push(appointment);

    localStorage.setItem("appointmentFormData", JSON.stringify(appointments));

    alert("Appointment booked successfully!");

    form.reset();
  });
}
