

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

let home = document.getElementById("home");
function changeBackground() {
  home.style.backgroundImage = `url('${images[currentIndex]}')`;
  home.style.backgroundSize = "cover";

  currentIndex = (currentIndex + 1) % images.length;
}

// Initial background
changeBackground();

// Change every 2 seconds
setInterval(changeBackground, 3000);



const light_modeBtn = document.getElementById('light_modeBtn');
let isDark = false;

light_modeBtn.addEventListener('click', () => {
  if (!isDark) {
    // Apply Dark Mode
    document.body.style.backgroundColor = "#0b2440ff";  
    // document.body.style.backgroundColor = "#181C14"; 
    document.body.style.color = "#ffffff";           
    light_modeBtn.style.backgroundColor = "#0000FF";   
    light_modeBtn.style.color = "#fff";
    //  light_modeBtn.textContent="Light!"            
    isDark = true;
  } else {
    // Apply Light Mode
    document.body.style.backgroundColor = "#ffffff";  
    document.body.style.color = "#222222";           
    light_modeBtn.style.backgroundColor = "#ddd";    
    light_modeBtn.style.color = "#000";
    // light_modeBtn.textContent="dark!"  
    isDark = false;
  }
});


//  old burger part......................

// const burger = document.getElementById('burger');
// const navMenu = document.getElementById('navLinks');

// burger.addEventListener('click', function () {
//   if (navMenu.style.display === 'none' || navMenu.style.display === '') {
//     navMenu.style.display = 'block';
//   } else {
//     navMenu.style.display = 'none';
//   }
// });


// Form validation..........................................
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill out all fields.");
    return false;
  }


  closeModal();
  return true;

}

// Show modal function
function showModal() {
  document.getElementById('contactModal').classList.remove('hidden');
}

// Close modal function
function closeModal() {
  document.getElementById('contactModal').classList.add('hidden');
}

document.getElementById('contactModal').addEventListener("click", function(e) {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
});

 // new burger setting.......................................................

function openMenu() {
  const overlay = document.querySelector('.modal-overlay1');
  overlay.classList.remove('hidden1');
  overlay.classList.remove('closing');
  overlay.classList.add('active');
}

function closeMenu() {
  const overlay = document.querySelector('.modal-overlay1');
  overlay.classList.remove('active');
  overlay.classList.add('closing');

  // jab animation khatam ho tab overlay ko hide karo
  overlay.addEventListener("animationend", () => {
    overlay.classList.add('hidden1');
    overlay.classList.remove('closing');
  }, { once: true });
}

// background (overlay) click se band ho jaye
document.querySelector('.modal-overlay1').addEventListener("click", function(e) {
  if (e.target.classList.contains("modal-overlay1")) {
    closeMenu();
  }
});


// Show Register Modal...............................................................................

function showUniqueRegisterModal() {
  document.getElementById('uniqueRegisterModal').classList.remove('hidden-register');
}

// Close Register Modal
function closeUniqueRegisterModal() {
  document.getElementById('uniqueRegisterModal').classList.add('hidden-register');
}


//  overlay par click detect
document.getElementById('uniqueRegisterModal').addEventListener("click", function(e) {
  if (e.target.classList.contains("register-modal-overlay")) {
   closeUniqueRegisterModal();
  }
});

// Register Form Validation
function validateUniqueRegisterForm() {
  const name = document.getElementById('uniqueRegName').value.trim();
  const email = document.getElementById('uniqueRegEmail').value.trim();
  const password = document.getElementById('uniqueRegPassword').value.trim();

  if (name === "" || email === "" || password === "") {
    alert("Please fill in all fields.");
    return false;
  }

  closeUniqueRegisterModal();
  return true; 
}


   // donation setup.........................................

document.getElementById("donationForm").addEventListener("submit", async function (e) {
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
    
    // ✅ Form clear
    this.reset();
    // 🚀 Redirect to payment link
    window.location.href = result.paymentLink;

  } catch (err) {
    console.error("Donation failed!", err);
    alert("Something went wrong!");
    return false;
  }
});


// ✅ Toggle QR visibility
function toggleQR(event) {
  event.preventDefault();
  const qr = document.getElementById("qrSmallDisplay");
  qr.classList.toggle("hidden");
}

// Optional: Close modal

function showDonationModal() {
  document.getElementById('donationModal').classList.remove('hidden');
}

function closeDonationModal() {
  document.getElementById('donationModal').classList.add('hidden');
}

// ✅ overlay par click detect
document.getElementById('donationModal').addEventListener("click", function(e) {
  if (e.target.classList.contains("modal-overlay")) {
    closeDonationModal();
  }
});




// Register Form Submission.....................................

  document.getElementById("uniqueRegisterForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent default form submission

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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


  // Contact Form Submission
  document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
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



