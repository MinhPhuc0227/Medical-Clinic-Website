import { fetchJson } from "../js/common.js";

export async function initAppForm() {
  const doctorSelect = document.getElementById("doctor-select");
  const doctorInput = document.getElementById("doctor-input");

  const departmentSelect = document.getElementById("department-select");
  const departmentInput = document.getElementById("department-input");

  if (!doctorSelect || !doctorInput || !departmentSelect || !departmentInput) {
    return;
  }

  // Lấy dữ liệu bác sĩ
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");

  const doctors = await fetchJson("/Doctors.json");

  loading.classList.add("hidden");

  // Lấy danh sách khoa không trùng
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

  // Kiểm tra giờ trùng lịch
  function updateAvailableTimes() {
    const date = document.getElementById("appointmentDate").value;
    const doctor = doctorInput.value;

    if (!date || !doctor) return;

    const bookings =
      JSON.parse(localStorage.getItem("appointmentFormData")) || [];

    const timeInput = document.getElementById("appointmentTime");

    if (!timeInput) return;

    const selectedTime = timeInput.value;

    const selectedMinutes =
      Number(selectedTime.split(":")[0]) * 60 +
      Number(selectedTime.split(":")[1]);

    const isBooked = bookings.some((booking) => {
      if (booking.date !== date || booking.doctor !== doctor) return false;

      const [hour, minute] = booking.time.split(":").map(Number);
      const bookingMinutes = hour * 60 + minute;

      return Math.abs(selectedMinutes - bookingMinutes) < 15;
    });

    if (selectedTime && isBooked) {
      timeInput.setCustomValidity(
        "Giờ này bác sĩ đã kín lịch, vui lòng chọn giờ khác.",
      );
    } else {
      timeInput.setCustomValidity("");
    }
  }

  // Lắng nghe thay đổi ngày, giờ, bác sĩ
  document
    .getElementById("appointmentDate")
    .addEventListener("change", updateAvailableTimes);

  document
    .getElementById("appointmentTime")
    .addEventListener("change", updateAvailableTimes);

  doctorSelect.addEventListener("change", updateAvailableTimes);

  addSubmitAppointmentFormEvent();
}

// Nút submit
function addSubmitAppointmentFormEvent() {
  const form = document.getElementById("appointmentForm");

  if (!form) return;

  form.setAttribute("novalidate", "true");

  // Hàm báo lỗi
  function showError(inputId, message) {
    const targetId =
      inputId === "doctor-input"
        ? "doctor-select"
        : inputId === "department-input"
          ? "department-select"
          : inputId;

    const inputElement = document.getElementById(targetId);
    const ariaElement = document.getElementById(inputId);

    if (!inputElement) return;

    // Đánh dấu field không hợp lệ
    if (ariaElement) {
      ariaElement.setAttribute("aria-invalid", "true");
    }

    inputElement.style.border = "1px solid #ef4444";

    let wrapper = inputElement.parentElement;

    if (!wrapper.classList.contains("custom-error-wrapper")) {
      wrapper = document.createElement("div");
      wrapper.className = "custom-error-wrapper";
      wrapper.style.position = "relative";
      wrapper.style.display = "block";
      wrapper.style.width = "100%";
      wrapper.style.height = "100%";

      inputElement.parentNode.insertBefore(wrapper, inputElement);
      wrapper.appendChild(inputElement);

      inputElement.style.width = "100%";
      inputElement.style.height = "100%";
      inputElement.style.boxSizing = "border-box";
      inputElement.style.paddingBottom = "18px";
    }

    let errorElement = wrapper.querySelector(".form-error-msg");

    if (!errorElement) {
      errorElement = document.createElement("span");
      errorElement.className = "form-error-msg";
      errorElement.style.color = "#ef4444";
      errorElement.style.fontSize = "12px";

      errorElement.style.position = "absolute";
      errorElement.style.bottom = "4px";
      errorElement.style.left = "15px";
      errorElement.style.zIndex = "10";
      errorElement.style.pointerEvents = "none";

      wrapper.appendChild(errorElement);
    }

    errorElement.innerText = message;
  }

  // Hàm xóa lỗi cũ
  function clearErrors() {
    const errorMessages = form.querySelectorAll(".form-error-msg");

    errorMessages.forEach((msg) => {
      msg.innerText = "";
    });

    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      input.style.border = "";

      // Đưa trạng thái ARIA về hợp lệ
      if (input.hasAttribute("aria-invalid")) {
        input.setAttribute("aria-invalid", "false");
      }
    });
  }

  // Xử lý submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("appointmentName").value.trim();
    const gender = document.getElementById("appointmentGender").value;
    const email = document.getElementById("appointmentEmail").value.trim();
    const phone = document.getElementById("appointmentPhone").value.trim();
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const doctor = document.getElementById("doctor-input").value.trim();
    const department = document
      .getElementById("department-input")
      .value.trim();

    const message = document.getElementById("appointmentMessage")
      ? document.getElementById("appointmentMessage").value.trim()
      : "";

    clearErrors();

    let isMissingField = false;

    // 1. Check rỗng
    if (!name) {
      showError("appointmentName", "Vui lòng nhập họ và tên.");
      isMissingField = true;
    }

    if (!gender) {
      showError("appointmentGender", "Vui lòng chọn giới tính.");
      isMissingField = true;
    }

    if (!email) {
      showError("appointmentEmail", "Vui lòng nhập email.");
      isMissingField = true;
    }

    if (!phone) {
      showError("appointmentPhone", "Vui lòng nhập số điện thoại.");
      isMissingField = true;
    }

    if (!date) {
      showError("appointmentDate", "Vui lòng chọn ngày.");
      isMissingField = true;
    }

    if (!time) {
      showError("appointmentTime", "Vui lòng chọn giờ.");
      isMissingField = true;
    }

    if (!doctor) {
      showError("doctor-input", "Vui lòng chọn bác sĩ.");
      isMissingField = true;
    }

    if (!department) {
      showError("department-input", "Vui lòng chọn khoa.");
      isMissingField = true;
    }

    if (isMissingField) {
      return;
    }

    let isFormatError = false;

    // 2. Check định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      showError("appointmentEmail", "Vui lòng nhập email hợp lệ.");
      isFormatError = true;
    }

    // 3. Check định dạng SĐT
    if (phone) {
      if (!/^\d+$/.test(phone)) {
        showError("appointmentPhone", "SĐT chỉ được chứa chữ số.");
        isFormatError = true;
      } else if (!phone.startsWith("0")) {
        showError("appointmentPhone", "SĐT phải bắt đầu bằng số 0.");
        isFormatError = true;
      } else if (phone.length !== 10) {
        showError("appointmentPhone", "SĐT phải có đúng 10 số.");
        isFormatError = true;
      }
    }

    // Check thời gian
    if (date && time) {
      const selectedDate = new Date(`${date}T00:00:00`);
      const dayOfWeek = selectedDate.getDay();

      if (dayOfWeek === 0) {
        alert("Chủ nhật phòng khám đóng cửa, vui lòng chọn ngày khác.");
        isFormatError = true;
      }

      // Ghép ngày và giờ
      const appointmentDateTime = new Date(`${date} ${time}`);

      // Lấy thời gian hiện tại
      const now = new Date();

      // Không cho đặt lịch trong quá khứ
      if (appointmentDateTime < now) {
        showError("appointmentDate", "Ngày giờ đã qua, vui lòng chọn lại.");
        showError("appointmentTime", "Thời gian không hợp lệ.");
        isFormatError = true;
      }

      // Kiểm tra giờ làm việc
      const [hour, minute] = time.split(":").map(Number);
      const totalMinutes = hour * 60 + minute;

      const openingTime = 9 * 60;
      const closingTime = 18.5 * 60;

      if (totalMinutes < openingTime || totalMinutes > closingTime) {
        showError("appointmentTime", "Ngoài giờ làm việc.");
        isFormatError = true;
      }
    }

    if (isFormatError) {
      return;
    }

    // Lưu data
    const appointments =
      JSON.parse(localStorage.getItem("appointmentFormData")) || [];

    const selectedMinutes =
      Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]);

    const isDuplicate = appointments.some((booking) => {
      if (booking.date !== date || booking.doctor !== doctor) return false;

      const [hour, minute] = booking.time.split(":").map(Number);
      const bookingMinutes = hour * 60 + minute;

      return Math.abs(selectedMinutes - bookingMinutes) < 15;
    });

    if (isDuplicate) {
      alert(
        "Giờ này bác sĩ đã có lịch hẹn, vui lòng chọn khoảng thời gian sớm hoặc trễ hơn 15 phút!",
      );

      showError("appointmentTime", "Trùng lịch đặt.");

      return;
    }

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

    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify(appointments),
    );

    alert("Appointment booked successfully!");

    form.reset();

    // Đảm bảo trạng thái ARIA trở về false sau khi reset
    clearErrors();
  });
}