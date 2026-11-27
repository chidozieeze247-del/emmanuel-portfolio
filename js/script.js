
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









/* DYNAMIC PROJECT NUMBERING */

function updateProjectNumbers() {

    const visibleCards = Array.from(
        document.querySelectorAll(".project-card")
    ).filter(card => !card.classList.contains("is-filtered-out"));

    const totalProjects = visibleCards.length;

    visibleCards.forEach((card, index) => {

        const number = card.querySelector(".project-number");

        if (!number) return;

        const currentNumber = String(index + 1).padStart(2, "0");
        const totalNumber = String(totalProjects).padStart(2, "0");

        number.textContent = `${currentNumber} / ${totalNumber}`;

    });

}





/* PROJECT FILTERS */

const projectFilterButtons = document.querySelectorAll(".filter-btn");
const projectGrid = document.querySelector(".projects-grid");

// Function to update project numbers
function updateProjectNumbers() {

    const allProjectCards = document.querySelectorAll(".project-card");

    // Get only the cards currently visible
    const visibleProjectCards = Array.from(allProjectCards).filter((card) => {
        return !card.classList.contains("is-filtered-out");
    });

    const totalProjects = visibleProjectCards.length;

    visibleProjectCards.forEach((card, index) => {

        const projectNumber = card.querySelector(".project-number");

        if (!projectNumber) return;

        const currentNumber = String(index + 1).padStart(2, "0");
        const totalNumber = String(totalProjects).padStart(2, "0");

        projectNumber.textContent = `${currentNumber} / ${totalNumber}`;

    });
}


// Handle project filter buttons
projectFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Update active filter button
        projectFilterButtons.forEach((filterButton) => {

            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));

        });

        // Get all project cards
        const projectCards = document.querySelectorAll(".project-card");

        projectCards.forEach((card) => {

            const cardCategory = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                selectedFilter === cardCategory;

            card.classList.toggle("is-filtered-out", !shouldShow);

            // Close details when a card is filtered out
            if (!shouldShow) {

                const detailsButton = card.querySelector(
                    ".project-details-toggle"
                );

                const detailsPanel = card.querySelector(".project-details");

                if (detailsButton && detailsPanel) {

                    detailsButton.setAttribute("aria-expanded", "false");
                    detailsPanel.hidden = true;

                    const buttonText = detailsButton.querySelector(
                        "span:first-child"
                    );

                    if (buttonText) {
                        buttonText.textContent = "Explore project";
                    }

                }
            }

        });

        // Update numbering after filtering
        updateProjectNumbers();

    });

});


// Set correct numbering when the page first loads
updateProjectNumbers();





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








/* PROJECT CARD INTERACTIONS */

const projectsGrid = document.querySelector(".projects-grid");

if (projectsGrid) {
    projectsGrid.addEventListener("click", (event) => {

        // 1. Handle the Explore Project button
        const toggle = event.target.closest(".project-details-toggle");

        if (toggle) {
            const detailsId = toggle.getAttribute("aria-controls");
            const details = document.getElementById(detailsId);

            if (!details) return;

            const isExpanded =
                toggle.getAttribute("aria-expanded") === "true";

            toggle.setAttribute("aria-expanded", String(!isExpanded));
            details.hidden = isExpanded;

            const buttonText = toggle.querySelector("span:first-child");

            if (buttonText) {
                buttonText.textContent = isExpanded
                    ? "Explore project"
                    : "Show less";
            }

            return;
        }

        // 2. Handle clicking anywhere on a project card
        const card = event.target.closest(".project-card");

        if (!card) return;

        const projectLink = card.dataset.link;

        if (projectLink) {
            window.open(projectLink, "_blank", "noopener,noreferrer");
        }
    });
}




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
   FAQ ACCORDION INTERACTION
========================================= */

(() => {
    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {
            const isCurrentlyOpen = item.classList.contains("is-open");

            // Close all FAQ items first
            faqItems.forEach((otherItem) => {
                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                otherItem.classList.remove("is-open");

                otherQuestion.setAttribute("aria-expanded", "false");
                otherAnswer.setAttribute("aria-hidden", "true");
            });

            // Open the clicked item only if it was previously closed
            if (!isCurrentlyOpen) {
                item.classList.add("is-open");

                question.setAttribute("aria-expanded", "true");
                answer.setAttribute("aria-hidden", "false");
            }
        });
    });
})();









/* =========================================
   TESTIMONIALS SECTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("testimonialModal");
    const openBtn = document.getElementById("openTestimonialForm");
    const emptyBtn = document.getElementById("emptyTestimonialBtn");
    const closeBtn = document.getElementById("closeTestimonialForm");
    const overlay = document.getElementById("testimonialModalOverlay");

    const form = document.getElementById("testimonialForm");
    const ratingInput = document.getElementById("clientRating");
    const ratingButtons = document.querySelectorAll(
        ".testimonial-rating-input button"
    );

    const messageInput = document.getElementById("clientMessage");
    const charCount = document.getElementById("testimonialCharCount");

    const photoInput = document.getElementById("clientPhoto");
    const fileName = document.getElementById("testimonialFileName");

    const notice = document.getElementById("testimonialFormNotice");
    const submitBtn = document.getElementById("testimonialSubmitBtn");

    const track = document.getElementById("testimonialsTrack");
    const slider = document.getElementById("testimonialsSlider");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");

    const counter = document.getElementById("testimonialCounter");
    const progress = document.getElementById("testimonialProgress");
    const emptyState = document.getElementById("testimonialEmpty");

    if (!modal || !form || !track) return;


    /* -------------------------------------
       MODAL OPEN AND CLOSE
    ------------------------------------- */

    function openModal() {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            document.getElementById("clientName")?.focus();
        }, 150);
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    openBtn?.addEventListener("click", openModal);
    emptyBtn?.addEventListener("click", openModal);
    closeBtn?.addEventListener("click", closeModal);
    overlay?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });


    /* -------------------------------------
    STAR RATING
    ------------------------------------- */

    ratingButtons.forEach((button) => {

        // Prevent the star button from submitting the form
        button.setAttribute("type", "button");

        button.addEventListener("click", (event) => {
            event.preventDefault();

            const selectedRating = Number(button.dataset.rating);

            if (!selectedRating || selectedRating < 1 || selectedRating > 5) {
                return;
            }

            ratingInput.value = selectedRating;

            ratingButtons.forEach((star) => {
                const starRating = Number(star.dataset.rating);

                const isSelected = starRating <= selectedRating;

                star.classList.toggle("selected", isSelected);

                star.setAttribute(
                    "aria-checked",
                    String(starRating === selectedRating)
                );
            });

            notice.textContent = "";
        });

    });


    /* -------------------------------------
       CHARACTER COUNTER
    ------------------------------------- */

    messageInput?.addEventListener("input", () => {
        charCount.textContent = messageInput.value.length;
    });


    /* -------------------------------------
       PHOTO FILE NAME + VALIDATION
    ------------------------------------- */

    photoInput?.addEventListener("change", () => {
        const file = photoInput.files[0];

        if (!file) {
            fileName.textContent = "No file selected";
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            photoInput.value = "";
            fileName.textContent = "No file selected";
            alert("Please select a JPG, PNG or WebP image.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            photoInput.value = "";
            fileName.textContent = "No file selected";
            alert("Your photo must be smaller than 2MB.");
            return;
        }

        fileName.textContent = file.name;
    });


    /* -------------------------------------
       SLIDER
    ------------------------------------- */

    let currentIndex = 0;

    function getCards() {
        return [...track.querySelectorAll(".testimonial-card")];
    }

    function getMaxIndex() {
        const cards = getCards();

        if (!cards.length) return 0;

        const sliderWidth = slider.clientWidth;
        const trackWidth = track.scrollWidth;

        if (trackWidth <= sliderWidth) return 0;

        const lastCard = cards[cards.length - 1];
        const lastCardEnd = lastCard.offsetLeft + lastCard.offsetWidth;

        let max = cards.length - 1;

        while (
            max > 0 &&
            cards[max].offsetLeft >= lastCardEnd - sliderWidth
        ) {
            max--;
        }

        return Math.max(
            0,
            Math.min(max, cards.length - 1)
        );
    }

    function updateSlider() {
        const cards = getCards();

        if (!cards.length) {
            track.style.transform = "translateX(0)";
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            counter.textContent = "01 / 01";
            progress.style.width = "0%";
            return;
        }

        const maxIndex = getMaxIndex();
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        const target = cards[currentIndex];

        if (target) {
            track.style.transform =
                `translateX(-${target.offsetLeft}px)`;
        }

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        const total = Math.max(1, maxIndex + 1);
        const current = currentIndex + 1;

        counter.textContent =
            `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

        progress.style.width = `${(current / total) * 100}%`;
    }

    prevBtn?.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateSlider();
    });

    nextBtn?.addEventListener("click", () => {
        currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
        updateSlider();
    });

    window.addEventListener("resize", updateSlider);


    /* -------------------------------------
       PAUSE / RESUME AUTO SLIDING
    ------------------------------------- */

    let autoSlideTimer;

    function startAutoSlide() {
        clearInterval(autoSlideTimer);

        autoSlideTimer = setInterval(() => {
            const maxIndex = getMaxIndex();

            if (maxIndex === 0) return;

            currentIndex =
                currentIndex >= maxIndex ? 0 : currentIndex + 1;

            updateSlider();
        }, 5000);
    }

    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideTimer);
    });

    slider.addEventListener("mouseleave", startAutoSlide);

    slider.addEventListener("focusin", () => {
        clearInterval(autoSlideTimer);
    });

    slider.addEventListener("focusout", startAutoSlide);


    /* -------------------------------------
       TESTIMONIAL CARD CREATION
    ------------------------------------- */

    function createTestimonialCard(item) {
        const card = document.createElement("article");
        card.className = "testimonial-card";

        const top = document.createElement("div");
        top.className = "testimonial-card-top";

        const quote = document.createElement("div");
        quote.className = "testimonial-quote-icon";
        quote.innerHTML = '<i class="fas fa-quote-left"></i>';

        const stars = document.createElement("div");
        stars.className = "testimonial-stars";
        stars.setAttribute("aria-label", `${item.rating} out of 5 stars`);

        for (let i = 0; i < 5; i++) {
            const star = document.createElement("span");
            star.textContent = i < item.rating ? "★" : "☆";
            stars.appendChild(star);
        }

        top.append(quote, stars);

        const message = document.createElement("p");
        message.className = "testimonial-message";
        message.textContent = `“${item.message}”`;

        const bottom = document.createElement("div");
        bottom.className = "testimonial-card-bottom";

        const avatar = document.createElement("div");
        avatar.className = "testimonial-avatar";

        if (item.image_url) {
            const image = document.createElement("img");
            image.src = item.image_url;
            image.alt = `${item.client_name}'s profile photo`;
            image.loading = "lazy";
            image.onerror = () => {
                image.remove();
                avatar.textContent =
                    item.client_name.trim().charAt(0).toUpperCase();
            };
            avatar.appendChild(image);
        } else {
            avatar.textContent =
                item.client_name.trim().charAt(0).toUpperCase();
        }

        const info = document.createElement("div");
        info.className = "testimonial-client-info";

        const name = document.createElement("strong");
        name.className = "testimonial-client-name";
        name.textContent = item.client_name;

        const role = document.createElement("span");
        role.className = "testimonial-client-role";

        role.textContent = [
            item.client_role,
            item.company
        ].filter(Boolean).join(" · ");

        info.append(name, role);
        bottom.append(avatar, info);

        card.append(top, message, bottom);

        if (item.project_type) {
            const tag = document.createElement("span");
            tag.className = "testimonial-project-tag";
            tag.textContent = item.project_type;
            card.appendChild(tag);
        }

        return card;
    }


    /* -------------------------------------
       LOAD APPROVED TESTIMONIALS
    ------------------------------------- */

    async function loadTestimonials() {
        /*
          Supabase connection will be added in the next setup step.
          Until then, the empty state remains visible.
        */

        if (!window.testimonialSupabase) {
            updateSlider();
            return;
        }

        const { data, error } = await window.testimonialSupabase
            .from("testimonials")
            .select("id, client_name, client_role, company, project_type, rating, message, image_url")
            .eq("status", "approved")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Could not load testimonials:", error);
            return;
        }

        track.querySelectorAll(".testimonial-card").forEach(card => {
            card.remove();
        });

        if (!data || data.length === 0) {
            emptyState.hidden = false;
            updateSlider();
            return;
        }

        emptyState.hidden = true;

        data.forEach(item => {
            track.appendChild(createTestimonialCard(item));
        });

        currentIndex = 0;
        updateSlider();
        startAutoSlide();
    }


    /* -------------------------------------
       SUBMIT TESTIMONIAL
    ------------------------------------- */

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const rating = Number(ratingInput.value);
        const photo = photoInput.files[0];

        if (rating < 1 || rating > 5) {
            notice.textContent = "Please select a star rating.";
            return;
        }

        if (!document.getElementById("testimonialConsent").checked) {
            notice.textContent = "Please agree before submitting.";
            return;
        }

        if (!window.testimonialSupabase) {
            notice.textContent =
                "The submission service has not been connected yet. Please try again later.";
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Submitting...";

        notice.textContent = "Please wait while we submit your testimonial.";

        try {
            let imageUrl = null;

            if (photo) {
                const extension = photo.name.split(".").pop().toLowerCase();
                const filePath =
                    `${crypto.randomUUID()}.${extension}`;

                const { error: uploadError } =
                    await window.testimonialSupabase.storage
                        .from("testimonial-photos")
                        .upload(filePath, photo, {
                            cacheControl: "3600",
                            upsert: false,
                            contentType: photo.type
                        });

                if (uploadError) throw uploadError;

                const { data: imageData } =
                    window.testimonialSupabase.storage
                        .from("testimonial-photos")
                        .getPublicUrl(filePath);

                imageUrl = imageData.publicUrl;
            }

            const testimonial = {
                client_name: document.getElementById("clientName").value.trim(),
                client_role: document.getElementById("clientRole").value.trim(),
                company: document.getElementById("clientCompany").value.trim() || null,
                project_type: document.getElementById("projectType").value || null,
                rating,
                message: messageInput.value.trim(),
                image_url: imageUrl,
                status: "pending"
            };

            const { error } = await window.testimonialSupabase
                .from("testimonials")
                .insert([testimonial]);

            if (error) throw error;

            notice.textContent =
                "Thank you! Your testimonial has been submitted for review.";

            form.reset();
            ratingInput.value = "0";
            charCount.textContent = "0";
            fileName.textContent = "No file selected";

            ratingButtons.forEach(star => {
                star.classList.remove("selected");
                star.setAttribute("aria-checked", "false");
            });

            setTimeout(closeModal, 2200);

        } catch (error) {
            console.error("Testimonial submission failed:", error);
            notice.textContent =
                "Something went wrong. Please try again in a moment.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML =
                '<span>Submit testimonial</span><i class="fas fa-arrow-right"></i>';
        }
    });


    /* INITIALIZE */

    loadTestimonials();

});







