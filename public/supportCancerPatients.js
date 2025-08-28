// ================= Background Image Rotator (only for home page) =================
const images = [
  'cancer_pics6.webp',
  'patient_bg1.webp',
  'bg5.avif',
  'bg6.avif',
  'patient_bg2.webp',
  'patient4.jpg',
  'patient_bg5.webp',
  'patient_bg3.webp',
];

let currentIndex = 0;
const home = document.getElementById("home");

function changeBackground() {
  if (home) {
    home.style.backgroundImage = `url('${images[currentIndex]}')`;
    home.style.backgroundSize = "cover";
    currentIndex = (currentIndex + 1) % images.length;
  }
}

if (home) {
  changeBackground();
  setInterval(changeBackground, 3000);
}

// ================= Light/Dark Mode =================
const light_modeBtn = document.getElementById('light_modeBtn');
let isDark = false;

if (light_modeBtn) {
  light_modeBtn.addEventListener('click', () => {
    if (!isDark) {
      document.body.style.backgroundColor = "#0b2440ff";
      document.body.style.color = "#ffffff";
      light_modeBtn.style.backgroundColor = "#0000FF";
      light_modeBtn.style.color = "#fff";
      isDark = true;
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#222222";
      light_modeBtn.style.backgroundColor = "#ddd";
      light_modeBtn.style.color = "#000";
      isDark = false;
    }
  });
}

// ================= Contact Form + Modal =================
function validateForm() {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return false;
  }
  closeModal();
  return true;
}

function showModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.add('hidden');
}

const contactModal = document.getElementById('contactModal');
if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  });
}

// ================= Burger Menu =================
function openMenu() {
  const overlay = document.querySelector('.modal-overlay1');
  if (overlay) {
    overlay.classList.remove('hidden1');
    overlay.classList.remove('closing');
    overlay.classList.add('active');
  }
}

function closeMenu() {
  const overlay = document.querySelector('.modal-overlay1');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.classList.add('closing');
    overlay.addEventListener("animationend", () => {
      overlay.classList.add('hidden1');
      overlay.classList.remove('closing');
    }, { once: true });
  }
}

const navOverlay = document.querySelector('.modal-overlay1');
if (navOverlay) {
  navOverlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay1")) {
      closeMenu();
    }
  });
}

// ================= Unique Register Modal =================
function showUniqueRegisterModal() {
  const modal = document.getElementById('uniqueRegisterModal');
  if (modal) modal.classList.remove('hidden-register');
}

function closeUniqueRegisterModal() {
  const modal = document.getElementById('uniqueRegisterModal');
  if (modal) modal.classList.add('hidden-register');
}

const registerModal = document.getElementById('uniqueRegisterModal');
if (registerModal) {
  registerModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("register-modal-overlay")) {
      closeUniqueRegisterModal();
    }
  });
}

function validateUniqueRegisterForm() {
  const name = document.getElementById('uniqueRegName')?.value.trim();
  const email = document.getElementById('uniqueRegEmail')?.value.trim();
  const password = document.getElementById('uniqueRegPassword')?.value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return false;
  }
  closeUniqueRegisterModal();
  return true;
}

// ================= Donation Modal + Form =================
function toggleQR(event) {
  event.preventDefault();
  const qr = document.getElementById("qrSmallDisplay");
  if (qr) qr.classList.toggle("hidden");
}

function showDonationModal() {
  const modal = document.getElementById('donationModal');
  if (modal) modal.classList.remove('hidden');
}

function closeDonationModal() {
  const modal = document.getElementById('donationModal');
  if (modal) modal.classList.add('hidden');
}

const donationModal = document.getElementById('donationModal');
if (donationModal) {
  donationModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeDonationModal();
    }
  });
}

const donationForm = document.getElementById("donationForm");
if (donationForm) {
  donationForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        alert("❌ Failed to store donation.");
        return;
      }
      const result = await res.json();
      alert("✅ Donation stored successfully. Redirecting to payment...");
      this.reset();
      window.location.href = result.paymentLink;
    } catch (err) {
      console.error("Donation failed!", err);
      alert("Something went wrong!");
    }
  });
}

// ================= Register Form Submission =================
const registerForm = document.getElementById("uniqueRegisterForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      alert(result.message || "Registered successfully!");
      this.reset();
    } catch (err) {
      console.error("Register Error:", err);
      alert("Registration failed.");
    }
  });
}

// ================= Contact Form Submission =================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      alert(result.message || "Message sent successfully!");
      this.reset();
    } catch (err) {
      console.error("Contact Error:", err);
      alert("Message sending failed.");
    }
  });
}
