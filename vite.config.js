import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "About.html"),
        // Thêm các trang khác tại đây:
        appointment: resolve(__dirname, "Appointment.html"),
        contact: resolve(__dirname, "Contact.html"),
        doctordetail: resolve(__dirname, "DoctorDetail.html"),
        doctors: resolve(__dirname, "Doctors.html"),
        news: resolve(__dirname, "News.html"),
        newsdetail: resolve(__dirname, "NewsDetail.html"),
        servicedetail: resolve(__dirname, "ServiceDetail.html"),
        services: resolve(__dirname, "Services.html"),
        specialtydetail: resolve(__dirname, "SpecialtyDetail.html"),
      },
    },
  },
});
