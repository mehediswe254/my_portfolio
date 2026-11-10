
// 1. Mobile Menu
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("is-open");

        const isOpen = menu.classList.contains("is-open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// 2. Smooth Scrolling
document.querySelectorAll("[data-scroll-to]").forEach(function (button) {
    button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-scroll-to");
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// 3. Active Navbar Link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

// 4. Scroll Animation
const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .section-title"
);

revealElements.forEach(function (element) {
    element.classList.add("js-reveal");
});

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
});

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

// 5. EmailJS Initialization
emailjs.init({
    publicKey: "vZD1WiRgpdV00puRE"
});

// 6. Contact Form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        formStatus.textContent = "Sending message...";

        emailjs.sendForm(
            "service_3hxtdji",
            "template_zzemy1m",
            contactForm
        )
        .then(function () {
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        })
        .catch(function (error) {
            formStatus.textContent = "Message could not be sent!";
            console.log("EmailJS Error:", error);
        });
    });
}
