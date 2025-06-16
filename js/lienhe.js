// Khởi tạo khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  // Hiệu ứng particle
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.01;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = "rgba(0, 221, 235, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();
      if (particle.size <= 0.2) {
        particles.splice(index, 1);
        particles.push(new Particle());
      }
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // Hiệu ứng parallax cho video background
  document.addEventListener("mousemove", (e) => {
    const video = document.querySelector(".video-bg");
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    video.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
  });

  // Toggle menu trên mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Xử lý form liên hệ
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      // Kiểm tra email hợp lệ
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = "Email không hợp lệ!";
        formMessage.classList.add("error");
        formMessage.classList.remove("success");
        return;
      }

      try {
        // Gửi email đến admin
        await emailjs.send(
          "YOUR_EMAILJS_SERVICE_ID",
          "YOUR_EMAILJS_TEMPLATE_ID",
          {
            name,
            email,
            phone,
            message,
          }
        );

        // Gửi email xác nhận đến người dùng
        await emailjs.send(
          "YOUR_EMAILJS_SERVICE_ID",
          "YOUR_CONFIRMATION_TEMPLATE_ID",
          {
            to_email: email,
            to_name: name,
            subject: "Xác nhận liên hệ",
            message: `Cảm ơn ${name} đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi bạn sớm nhất có thể.`,
          }
        );

        formMessage.textContent = "Tin nhắn đã được gửi thành công!";
        formMessage.classList.add("success");
        formMessage.classList.remove("error");
        contactForm.reset();
      } catch (error) {
        console.error("EmailJS error:", error);
        formMessage.textContent = "Có lỗi xảy ra, vui lòng thử lại!";
        formMessage.classList.add("error");
        formMessage.classList.remove("success");
      }
    });
  }
});
