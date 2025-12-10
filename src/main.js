import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Basic mobile menu styling injection for simplicity if not fully in CSS
      if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      } else {
        navLinks.style.display = ''; // Reset to css default
      }
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navLinks.style.display = '';
        }
      }
    });
  });

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      accordions.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // Schedule Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.schedule-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId)?.classList.add('active');
    });
  });

  // Modal Logic
  const modal = document.getElementById('universalModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.querySelector('.close');

  window.openModal = function (type) {
    let content = '';
    if (type === 'paper') {
      content = `<h3>Paper Presentation Guidelines</h3>
              <ul>
                <li>IEEE format (max 6 pages), original work only</li>
                <li>Team: 1–2 members</li>
                <li>Bring soft + 2 printed copies</li>
                <li>8 min presentation + 2 min Q&A</li>
              </ul>
              <div style="margin-top: 2rem; text-align: right;">
                <a href="#register" class="btn btn-primary" onclick="document.getElementById('universalModal').style.display='none'">Register</a>
              </div>`;
    } else if (type === 'poster') {
      content = `<h3>Poster Presentation Guidelines</h3>
              <ul>
                <li>A1 size (24×36 inches), printed only</li>
                <li>Team: max 2</li>
                <li>5 minutes presentation</li>
                <li>Must include title, names, problem, solution, visuals</li>
              </ul>
              <div style="margin-top: 2rem; text-align: right;">
                <a href="#register" class="btn btn-primary" onclick="document.getElementById('universalModal').style.display='none'">Register</a>
              </div>`;
    } else if (type === 'startup') {
      content = `<h3>Startup Expo Guidelines</h3>
              <ul>
                <li>Prototype / Model / PoC required</li>
                <li>10 min + live demo</li>
                <li>Stall provided</li>
                <li>Judged on innovation, feasibility, pitch</li>
              </ul>
              <div style="margin-top: 2rem; text-align: right;">
                <a href="#register" class="btn btn-primary" onclick="document.getElementById('universalModal').style.display='none'">Register</a>
              </div>`;
    }
    if (modalBody) {
      modalBody.innerHTML = content;
      modal.style.display = 'block';
    }
  };

  // Committee Modal Logic
  document.querySelectorAll('.member').forEach(member => {
    member.addEventListener('click', () => {
      const person = member.getAttribute('data-person');
      let content = '';
      if (person === 'vc') {
        content = `<h3>Mr. Sardar Gagandeep Singh Kohli</h3>
                  <div class="designation">Vice Chairman • Chief Patron</div>
                  <div class="keynote">
                    "The future belongs to those who dare to innovate. AI Summit 2026 is a golden platform for young minds to showcase their creativity and shape tomorrow's technology. I extend my best wishes to all participants."
                  </div>`;
      } else if (person === 'md') {
        content = `<h3>Dr. H.S. Saini</h3>
                  <div class="designation">Managing Director • Patron</div>
                  <div class="keynote">
                    "Innovation and knowledge are the twin engines of progress. This summit will ignite young engineers' passion for AI and inspire them to solve real-world challenges."
                  </div>`;
      } else if (person === 'director') {
        content = `<h3>Dr. S. Sreenatha Reddy</h3>
                  <div class="designation">Director, GNITC • Chairman</div>
                  <div class="keynote">
                    "GNITC has always nurtured technical excellence. AI Summit 2026 reflects our commitment to fostering innovation and industry-ready talent in Artificial Intelligence."
                  </div>`;
      } else if (person === 'ad') {
        content = `<h3>Dr. Rishi Sayal</h3>
                  <div class="designation">Associate Director • Co-Chairman</div>
                  <div class="keynote">
                    "This summit is more than an event — it's a launchpad for future AI leaders. Let your ideas take flight."
                  </div>`;
      } else if (person === 'hod') {
        content = `<h3>Dr. S. Madhu</h3>
                  <div class="designation">HoD - AI&DS • Convenor</div>
                  <div class="keynote">
                    "AI is not just a subject — it's the future of engineering. This summit brings together brilliant minds to learn, compete, and grow together."
                  </div>`;
      } else if (person === 'c1') {
        content = `<h3>Dr. P. Pavan Kumar</h3>
                  <div class="designation">Asst. Professor, AIML • Coordinator</div>
                  <div class="keynote">
                    "Every great innovation begins with a bold idea. AI Summit 2026 gives you the stage to present yours."
                  </div>`;
      } else if (person === 'c2') {
        content = `<h3>Dr. A. Krishna</h3>
                  <div class="designation">Asst. Professor, IoT • Coordinator</div>
                  <div class="keynote">
                    "The fusion of AI and IoT is redefining the world. This summit is your opportunity to lead the change."
                  </div>`;
      } if (modalBody) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
      }
    });
  });


  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = 'none';
    }
  }

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  }
});
