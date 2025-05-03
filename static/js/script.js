// // Testimonial slider functionality
// const testimonials = document.querySelectorAll(".testimonial");
// const dots = document.querySelectorAll(".slider-dot");
// let currentTestimonial = 0;

// function showTestimonial(index) {
//   testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
//   dots.forEach((dot) => dot.classList.remove("active"));

//   testimonials[index].classList.add("active");
//   dots[index].classList.add("active");
//   currentTestimonial = index;
// }

// dots.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     showTestimonial(index);
//   });
// });

// // Auto-rotate testimonials
// setInterval(() => {
//   currentTestimonial = (currentTestimonial + 1) % testimonials.length;
//   showTestimonial(currentTestimonial);
// }, 5000);

//Login modal functionality
const modal = document.getElementById("adminModal");
const adminBtn = document.getElementById("adminBtn");
const closeModal = document.querySelector(".close-modal");

adminBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Toggle password visibility
document.getElementById("showPassword").addEventListener("change", function () {
  const passwordInput = document.getElementById("adminPassword");
  passwordInput.type = this.checked ? "text" : "password";
  passwordInput.focus();
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  contactForm.reset();
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if (targetId === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 10,
          behavior: "smooth",
        });
      }
    }
  });
});

// Navlink highlight current section
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function changeActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 90;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", changeActiveLink);

// Gallery Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Slide every 5 seconds
setInterval(function () {
  plusSlides(1);
}, 5000);

//Login
const firebaseConfig = {
  apiKey: "AIzaSyCac884UXSPfSWNEIeyZbrU7sEWWmgh99c",
  authDomain: "iwep-admin.firebaseapp.com",
  projectId: "iwep-admin",
  storageBucket: "iwep-admin.firebasestorage.app",
  messagingSenderId: "812101420301",
  appId: "1:812101420301:web:b20bde297c634c9bce1c44",
};

firebase.initializeApp(firebaseConfig);
document
  .getElementById("adminLoginForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        window.location.href = "/admin/dashboard";
      } else {
        alert("Invalid username/password");
      }
    } catch (error) {
      console.error("Login error:", error);
      // alert("Login failed: " + error.message);
    }
  });
