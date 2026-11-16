
/* 1. SELECT WEBSITE ELEMENTS */

const app = document.getElementById("app");

const themeToggle = document.getElementById("themeToggle");

const themeIcon = document.getElementById("themeIcon");

const menuToggle = document.getElementById("menuToggle");

const menuIcon = document.getElementById("menuIcon");

const mobileNav = document.getElementById("mobileNav");

const mobileLinks = document.querySelectorAll(".mobile-nav-link");

const navLinks = document.querySelectorAll(".nav-link");


/* 2. THEME SWITCHING SYSTEM */

// Get saved theme from browser storage

const savedTheme = localStorage.getItem("portfolio-theme");

// Set initial theme

let currentTheme = savedTheme || "dark";


function applyTheme(theme) {

    currentTheme = theme;

    // Apply theme to entire website

    app.setAttribute("data-theme", theme);

    // Change icon

    themeIcon.textContent =
        theme === "dark" ? "☀" : "☾";

    // Update browser theme color

    document.querySelector(
        'meta[name="theme-color"]'
    ).setAttribute(
        "content",
        theme === "dark" ? "#0b1020" : "#f6f8fc"
    );

    // Save theme preference

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

}


// Apply saved theme when website loads

applyTheme(currentTheme);


// Switch theme when button is clicked

themeToggle.addEventListener("click", () => {

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);

});


/* 3. MOBILE NAVIGATION */

function closeMobileMenu() {

    mobileNav.classList.remove("open");

    menuIcon.textContent = "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


// Open and close mobile navigation

menuToggle.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("open");

    menuIcon.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// Close menu after clicking a link

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


// Close menu when switching back to desktop

window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {

        closeMobileMenu();

    }

});


/* 4. SCROLL REVEAL ANIMATIONS */

// Select all elements with reveal class

const revealElements = document.querySelectorAll(".reveal");


// Check whether browser supports IntersectionObserver

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}









/* HERO ROTATING TEXT */

const rotatingText = document.getElementById("rotatingText");

if (rotatingText) {

    const phrases = [
        "digital experiences",
        "smart web solutions",
        "creative designs",
        "marketing strategies"
    ];

    let currentPhrase = 0;

    setInterval(() => {

        rotatingText.classList.add("text-exit");

        setTimeout(() => {

            currentPhrase = (currentPhrase + 1) % phrases.length;

            rotatingText.textContent = phrases[currentPhrase];

            rotatingText.classList.remove("text-exit");
            rotatingText.classList.add("text-enter");

        }, 350);

    }, 2800);

}

/* 5. ACTIVE NAVIGATION LINK*/

/* const sections = document.querySelectorAll("main section[id]");


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );

                    });

                }

            });

        },

        {
            threshold: 0.4
        }

    );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

} */


/* 6. CONSOLE MESSAGE */





/*  ACTIVE NAVIGATION - CLICK & SCROLL */

const navigationLinks = document.querySelectorAll(
    ".desktop-nav .nav-link, .mobile-nav-link"
);

const pageSections = document.querySelectorAll(
    "main section[id]"
);

let pendingSection = null;

// Update the active navigation link
function setActiveNavigation(sectionId) {
    navigationLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Handle navigation clicks
navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const sectionId = link.getAttribute("href").substring(1);

        pendingSection = document.getElementById(sectionId);

        // Change active state immediately
        setActiveNavigation(sectionId);
    });
});

// Detect the section currently occupying the activation line
function updateActiveSection() {
    const activationLine = window.innerHeight * 0.35;

    // Keep the clicked link active while scrolling to its section
    if (pendingSection) {
        const rect = pendingSection.getBoundingClientRect();

        if (rect.top <= activationLine && rect.bottom > activationLine) {
            pendingSection = null;
        } else {
            setActiveNavigation(pendingSection.id);
            return;
        }
    }

    let currentSection = pageSections[0];

    pageSections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= activationLine) {
            currentSection = section;
        }
    });

    if (currentSection) {
        setActiveNavigation(currentSection.id);
    }
}

// Update navigation while scrolling
window.addEventListener("scroll", updateActiveSection, {
    passive: true
});

// Set the correct active link when the page loads
updateActiveSection();














/*  PROJECT FILTERS*/

const projectFilterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

projectFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Update active filter button
        projectFilterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        // Show matching project cards
        projectCards.forEach((card) => {

            const cardCategory = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                selectedFilter === cardCategory;

            card.classList.toggle("is-filtered-out", !shouldShow);

            // Close expanded details when hiding a card
            if (!shouldShow) {
                const detailsButton = card.querySelector(
                    ".project-details-toggle"
                );

                const detailsPanel = card.querySelector(".project-details");

                if (detailsButton && detailsPanel) {
                    detailsButton.setAttribute("aria-expanded", "false");
                    detailsPanel.hidden = true;
                }
            }

        });

    });

});









/* SERVICES SECTION INTERACTIONS */

const serviceToggles = document.querySelectorAll(".service-toggle");

serviceToggles.forEach((toggle) => {

    toggle.addEventListener("click", () => {

        const card = toggle.closest(".service-card");
        const detailId = toggle.getAttribute("aria-controls");
        const details = document.getElementById(detailId);

        if (!card || !details) return;

        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        // Toggle the selected service
        toggle.setAttribute("aria-expanded", String(!isOpen));

        details.hidden = isOpen;

        card.classList.toggle("is-open", !isOpen);

        // Update button text
        const buttonText = toggle.querySelector("span:first-child");

        if (buttonText) {
            buttonText.textContent = isOpen
                ? "Explore service"
                : "Show less";
        }

    });

});








/* PROJECTS SECTION INTERACTIONS */

const projectToggles = document.querySelectorAll(
    ".project-details-toggle"
);

projectToggles.forEach((toggle) => {

    toggle.addEventListener("click", () => {

        const detailsId = toggle.getAttribute("aria-controls");
        const details = document.getElementById(detailsId);

        if (!details) return;

        const isExpanded =
            toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        details.hidden = isExpanded;

        const buttonText = toggle.querySelector("span:first-child");

        if (buttonText) {
            buttonText.textContent = isExpanded
                ? "Explore project"
                : "Show less";
        }

    });

});







/* CONTACT FORM - EMAILJS INTEGRATION */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const feedback = document.getElementById("formFeedback");
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector("span");

        if (!name || !email || !subject || !message) {
            feedback.textContent = "Please complete all fields.";
            feedback.style.color = "#ef4444";
            return;
        }

        // Show sending status
        submitButton.disabled = true;
        buttonText.textContent = "Sending...";
        feedback.textContent = "";

        // Prepare message details
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        try {

            await emailjs.send(
                "service_wnnwiph",
                "template_vwed3s8",
                templateParams
            );

            feedback.textContent =
                "Your message has been sent successfully! I'll get back to you soon.";

            feedback.style.color = "#005bff";

            contactForm.reset();

            // Automatically hide success message after 5 seconds
            setTimeout(() => {
                feedback.textContent = "";
            }, 5000);

        } catch (error) {

            console.error("EmailJS Error:", error);

            feedback.textContent =
                "Message could not be sent. Please try again.";

            feedback.style.color = "#ef4444";

        } finally {

            submitButton.disabled = false;
            buttonText.textContent = "Send message";

        }

    });

}









/* FOOTER COPYRIGHT YEAR */

const copyrightYear = document.getElementById("copyrightYear");

if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}







/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

/* const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"], .mobile-nav a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    "main section[id]"
);

function setActiveNavigation(sectionId) {

    navigationLinks.forEach((link) => {

        const isActive =
            link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }

    });

} */

// Highlight the clicked navigation item immediately.
/* navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const sectionId = link.getAttribute("href").substring(1);

        setActiveNavigation(sectionId);

    });

}); */

// Update the active item while scrolling.
/* const sectionObserver = new IntersectionObserver(
    (entries) => {

        const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) =>
                b.intersectionRatio - a.intersectionRatio
            );

        if (visibleSections.length > 0) {
            setActiveNavigation(visibleSections[0].target.id);
        }

    },
    {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75]
    }
);

pageSections.forEach((section) => {
    sectionObserver.observe(section);
}); */
