// validasi_input.js
// Validasi form pendaftaran menggunakan event handling.
// Validasi berjalan real-time saat mengetik dan juga saat submit.

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  // Menampilkan pesan error di bawah input
  function setError(fieldId, message) {
    document.getElementById("error-" + fieldId).textContent = message;
  }

  // Fungsi validasi per field. Mengembalikan true bila valid.
  function validateUsername() {
    const value = document.getElementById("username").value.trim();
    if (value === "") {
      setError("username", "Username tidak boleh kosong.");
      return false;
    }
    if (value.length < 3) {
      setError("username", "Username minimal 3 karakter.");
      return false;
    }
    setError("username", "");
    return true;
  }

  function validatePassword() {
    const value = document.getElementById("password").value;
    if (value === "") {
      setError("password", "Password tidak boleh kosong.");
      return false;
    }
    if (value.length < 8) {
      setError("password", "Password minimal 8 karakter.");
      return false;
    }
    setError("password", "");
    return true;
  }

  function validateNama() {
    const value = document.getElementById("nama").value.trim();
    if (value === "") {
      setError("nama", "Nama tidak boleh kosong.");
      return false;
    }
    setError("nama", "");
    return true;
  }

  function validateTanggalLahir() {
    const value = document.getElementById("tanggal_lahir").value;
    if (value === "") {
      setError("tanggal_lahir", "Tanggal lahir tidak boleh kosong.");
      return false;
    }
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate > today) {
      setError("tanggal_lahir", "Tanggal lahir tidak boleh melebihi hari ini.");
      return false;
    }
    setError("tanggal_lahir", "");
    return true;
  }

  function validateAlamat() {
    const value = document.getElementById("alamat").value.trim();
    if (value === "") {
      setError("alamat", "Alamat tidak boleh kosong.");
      return false;
    }
    setError("alamat", "");
    return true;
  }

  function validateTelepon() {
    const value = document.getElementById("telepon").value.trim();
    if (value === "") {
      setError("telepon", "Nomor telepon tidak boleh kosong.");
      return false;
    }
    if (!/^\d+$/.test(value)) {
      setError("telepon", "Nomor telepon hanya boleh berisi angka.");
      return false;
    }
    if (!value.startsWith("62")) {
      setError("telepon", "Nomor telepon harus berawalan 62.");
      return false;
    }
    setError("telepon", "");
    return true;
  }

  // Pasang validasi real-time pada event input tiap field
  const validators = {
    username: validateUsername,
    password: validatePassword,
    nama: validateNama,
    tanggal_lahir: validateTanggalLahir,
    alamat: validateAlamat,
    telepon: validateTelepon,
  };

  Object.keys(validators).forEach(function (id) {
    document.getElementById(id).addEventListener("input", validators[id]);
  });

  // Validasi saat submit
  form.addEventListener("submit", function (event) {
    let valid = true;
    Object.keys(validators).forEach(function (id) {
      if (!validators[id]()) {
        valid = false;
      }
    });
    if (!valid) {
      event.preventDefault();
    }
  });

  // Toggle tampilkan/sembunyikan password
  const toggleBtn = document.getElementById("togglePassword");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const eyeOpen = document.getElementById("eyeOpen");
      const eyeClosed = document.getElementById("eyeClosed");
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      eyeOpen.classList.toggle("hidden", isHidden);
      eyeClosed.classList.toggle("hidden", !isHidden);
    });
  }
});
