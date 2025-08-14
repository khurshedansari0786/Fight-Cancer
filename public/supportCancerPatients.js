

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
    document.body.style.backgroundColor = "#0b2440ff";  // Dark grey
    // document.body.style.backgroundColor = "#181C14";  // Dark grey
    document.body.style.color = "#ffffff";            // White text
    light_modeBtn.style.backgroundColor = "#0000FF";     // Darker button bg
    light_modeBtn.style.color = "#fff";
    //  light_modeBtn.textContent="Light!"             // White button text
    isDark = true;
  } else {
    // Apply Light Mode
    document.body.style.backgroundColor = "#ffffff";  // White background
    document.body.style.color = "#222222";            // Dark text
    light_modeBtn.style.backgroundColor = "#ddd";     // Light button bg// Black button text   
    light_modeBtn.style.color = "#000";
    // light_modeBtn.textContent="dark!"  
    isDark = false;
  }
});

// Show modal function
function showModal() {
  document.getElementById('contactModal').classList.remove('hidden');
}

// Close modal function
function closeModal() {
  document.getElementById('contactModal').classList.add('hidden');
}


// Form validation
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







// Show Register Modal...............................................................................

function showUniqueRegisterModal() {
  document.getElementById('uniqueRegisterModal').classList.remove('hidden-register');
}

// Close Register Modal
function closeUniqueRegisterModal() {
  document.getElementById('uniqueRegisterModal').classList.add('hidden-register');
}


// Register Form Validation
function validateUniqueRegisterForm() {
  const name = document.getElementById('uniqueRegName').value.trim();
  const email = document.getElementById('uniqueRegEmail').value.trim();
  const password = document.getElementById('uniqueRegPassword').value.trim();

  if (name === "" || email === "" || password === "") {
    alert("Please fill in all fields.");
    return false;
  }

  // alert("Registered Successfully!");
  closeUniqueRegisterModal();
  return true; // Stop actual submit
}






// async function redirectToPayment(event) {
//   event.preventDefault();


//   const name = document.getElementById("donorName").value.trim();
//   const amount = document.getElementById("donationAmount").value.trim();
//   const message = document.getElementById("donationMessage").value.trim();

//   if (!name || !amount) {
//     alert("Please enter name and amount.");
//     return false;
//   }

//   // 🔄 Store donation via fetch
//   try {
//     const res = await fetch("/api/donation", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         donorName: name,
//         donationAmount: amount,
//         donationMessage: message
//       })
//     });

//     if (!res.ok) {
//       alert("❌ Failed to store donation.");
//       return false;
//     }
//     console.log("✅ Donation stored");
//     // alert("✅ Donation stored successfully. Redirecting to payment...");


//     // 🔁 UPI Payment Redirect
//     const upiID = "khurshedansari12403@okhdfcbank"; // ✅ Replace with your UPI ID
//     const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
//     window.location.href = upiLink;

//     return false;

//   } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong!");
//     return false;
//   }
// }



async function redirectToPayment(event) {
  event.preventDefault();

  const name = document.getElementById("donorName").value.trim();
  const amount = document.getElementById("donationAmount").value.trim();
  const message = document.getElementById("donationMessage").value.trim();

  if (!name || !amount) {
    alert("Please enter name and amount.");
    return false;
  }

  try {
    const res = await fetch("/api/donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donorName: name,
        donationAmount: amount,
        donationMessage: message
      })
    });

    if (!res.ok) {
      alert("❌ Failed to store donation.");
      return false;
    }

    const result = await res.json();

    alert("✅ Donation stored successfully. Redirecting to payment...");
    window.location.href = result.paymentLink; // 🚀 direct UPI redirect

    return false;

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
    return false;
  }
}


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




// burger part

const burger = document.getElementById('burger');
const navMenu = document.getElementById('navLinks');

burger.addEventListener('click', function () {
  if (navMenu.style.display === 'none' || navMenu.style.display === '') {
    navMenu.style.display = 'block';
  } else {
    navMenu.style.display = 'none';
  }
});



// Register Form Submission
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
    } catch (err) {
      console.error("Contact Error:", err);
      alert("Message sending failed.");
    }
  });



