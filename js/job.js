document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles");
  if (canvas) {
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
  }

  const video = document.querySelector(".video-bg");
  if (video) {
    document.addEventListener("mousemove", (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      video.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  const jobs = [
    {
      id: 1,
      title: "Lập trình viên Frontend",
      location: "Hà Nội",
      salary: "20-30M",
      major: "Công nghệ thông tin",
      phone: "+84 963176945",
    },
    {
      id: 2,
      title: "Kỹ sư Backend",
      location: "TP.HCM",
      salary: "25-35M",
      major: "Công nghệ thông tin",
      phone: "+84 963176945",
    },
    {
      id: 3,
      title: "Kiến trúc sư",
      location: "Đà Nẵng",
      salary: "18-25M",
      major: "Kiến trúc",
      phone: "+84 963176945",
    },
    {
      id: 4,
      title: "Chuyên viên tài chính",
      location: "TP.HCM",
      salary: "20-30M",
      major: "Kinh tế",
      phone: "+84 963176945",
    },
    {
      id: 5,
      title: "Chuyên viên marketing",
      location: "Đà Nẵng",
      salary: "15-25M",
      major: "Marketing",
      phone: "+84 963176945",
    },
    {
      id: 6,
      title: "Quản lý logistics",
      location: "Hà Nội",
      salary: "18-28M",
      major: "Logistics",
      phone: "+84 963176945",
    },
  ];

  function attachJobCardEvents() {
    const jobButtons = document.querySelectorAll(".job-card button");
    if (jobButtons.length > 0) {
      jobButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const jobId = parseInt(button.getAttribute("data-job-id"));
          const job = jobs.find((j) => j.id === jobId);
          if (job) {
            const modalTitle = document.getElementById("modal-title");
            const modalLocation = document.getElementById("modal-location");
            const modalSalary = document.getElementById("modal-salary");
            const modalPhone = document.getElementById("modal-phone");
            const modal = document.getElementById("job-modal");

            if (
              modalTitle &&
              modalLocation &&
              modalSalary &&
              modalPhone &&
              modal
            ) {
              modalTitle.textContent = `Vị trí: ${job.title}`;
              modalLocation.textContent = `Địa điểm: ${job.location}`;
              modalSalary.textContent = `Mức lương: ${job.salary}`;
              modalPhone.textContent = `Số điện thoại: ${job.phone}`;
              modal.classList.add("show");
            }
          }
        });
      });
    }
  }

  const searchBtn = document.getElementById("search-btn");
  const searchLocation = document.getElementById("search-location");
  const searchMajor = document.getElementById("search-major");

  if (searchBtn && searchLocation && searchMajor) {
    searchBtn.addEventListener("click", () => {
      const location = searchLocation.value;
      const major = searchMajor.value;

      const jobCards = document.querySelectorAll(".job-card");
      jobCards.forEach((card) => {
        const jobId = parseInt(card.getAttribute("data-job-id"));
        const job = jobs.find((j) => j.id === jobId);
        const matchesLocation = location === "" || job.location === location;
        const matchesMajor = major === "" || job.major === major;
        card.style.display = matchesLocation && matchesMajor ? "block" : "none";
      });
    });
  }

  const modal = document.getElementById("job-modal");
  const closeBtn = document.querySelector(".close-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  attachJobCardEvents();
});
