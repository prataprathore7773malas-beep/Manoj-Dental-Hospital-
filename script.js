/*========================================
MANOJ DENTAL HOSPITAL
MAIN JAVASCRIPT
========================================*/

document.addEventListener("DOMContentLoaded", function () {


    /*========================================
    ELEMENTS
    ========================================*/

    const header = document.querySelector(".header");

    const menuBtn = document.querySelector(".menu-btn");

    const nav = document.querySelector("nav");

    const appointmentForm =
        document.getElementById("appointmentForm");

    const backToTop =
        document.getElementById("backToTop");



    /*========================================
    MOBILE MENU
    ========================================*/

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", function () {

            nav.classList.toggle("active");

            const icon =
                menuBtn.querySelector("i");

            if (nav.classList.contains("active")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });


        /* Close menu after clicking a link */

        const mobileLinks =
            document.querySelectorAll("nav ul li a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("active");

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

    }



    /*========================================
    STICKY HEADER
    ========================================*/

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeader
    );

    handleHeader();



    /*========================================
    SMOOTH SCROLL
    ========================================*/

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener("click", function (e) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                e.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight -
                    10;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });



    /*========================================
    ACTIVE NAVIGATION
    ========================================*/

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav ul li a");

    function updateActiveNav() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();



    /*========================================
    FAQ ACCORDION
    ========================================*/

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) return;


        question.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("active");


            /* Close all other FAQs */

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    if (otherAnswer) {

                        otherAnswer.style.maxHeight =
                            null;

                    }

                }

            });


            /* Open selected FAQ */

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                item.classList.remove("active");

                answer.style.maxHeight =
                    null;

            }

        });

    });



    /*========================================
    APPOINTMENT FORM → WHATSAPP
    ========================================*/

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                /* Get values */

                const name =
                    document
                        .getElementById("patientName")
                        ?.value
                        .trim();

                const phone =
                    document
                        .getElementById("patientPhone")
                        ?.value
                        .trim();

                const date =
                    document
                        .getElementById("appointmentDate")
                        ?.value;

                const time =
                    document
                        .getElementById("appointmentTime")
                        ?.value;

                const treatment =
                    document
                        .getElementById("treatmentRequired")
                        ?.value;

                const message =
                    document
                        .getElementById("patientMessage")
                        ?.value
                        .trim();


                /* Basic validation */

                if (!name) {

                    alert(
                        "Please enter your name."
                    );

                    return;

                }


                if (!phone) {

                    alert(
                        "Please enter your phone number."
                    );

                    return;

                }


                if (phone.length < 10) {

                    alert(
                        "Please enter a valid phone number."
                    );

                    return;

                }


                if (!date) {

                    alert(
                        "Please select your preferred date."
                    );

                    return;

                }


                if (!treatment) {

                    alert(
                        "Please select a treatment."
                    );

                    return;

                }


                /* Format date */

                let formattedDate =
                    date;

                if (date) {

                    const dateObject =
                        new Date(
                            date + "T00:00:00"
                        );

                    formattedDate =
                        dateObject.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            }
                        );

                }


                /* WhatsApp message */

                const whatsappMessage =

`Hello Manoj Dental Hospital,

I would like to enquire about a dental appointment.

━━━━━━━━━━━━━━━━━━

PATIENT DETAILS

Name: ${name}

Phone: ${phone}

Preferred Date: ${formattedDate}

Preferred Time: ${time || "Not specified"}

Treatment Required: ${treatment}

Message:
${message || "No additional message"}

━━━━━━━━━━━━━━━━━━

Please contact me regarding my appointment.

Thank you.`;


                /* Clinic WhatsApp Number */

                const clinicNumber =
                    "919887694148";


                /* WhatsApp URL */

                const whatsappURL =
                    "https://wa.me/" +
                    clinicNumber +
                    "?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                /* Open WhatsApp */

                window.open(
                    whatsappURL,
                    "_blank"
                );


                /* Reset form */

                appointmentForm.reset();

            }
        );

    }



    /*========================================
    COUNTER ANIMATION
    ========================================*/

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        if (!counters.length) return;


        const statsSection =
            document.querySelector(".stats");

        if (!statsSection) return;


        const sectionTop =
            statsSection.getBoundingClientRect().top;


        if (
            sectionTop >
            window.innerHeight - 100
        ) {
            return;
        }


        countersStarted = true;


        counters.forEach(function (counter) {

            const target =
                parseInt(
                    counter.dataset.target
                );


            if (isNaN(target)) return;


            let current = 0;

            const duration = 1800;

            const startTime =
                performance.now();


            function updateCounter(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) /
                        duration,
                        1
                    );


                /* Smooth easing */

                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                current =
                    Math.floor(
                        eased * target
                    );


                counter.textContent =
                    current.toLocaleString(
                        "en-IN"
                    );


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target.toLocaleString(
                            "en-IN"
                        );

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }


    window.addEventListener(
        "scroll",
        animateCounters
    );

    animateCounters();



    /*========================================
    SCROLL REVEAL
    ========================================*/

    const revealElements =
        document.querySelectorAll(
            ".why-card, " +
            ".service-card, " +
            ".doctor-card, " +
            ".treatment-item, " +
            ".process-card, " +
            ".gallery-item, " +
            ".review-card, " +
            ".faq-item, " +
            ".contact-card"
        );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:0.12
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );



    /*========================================
    BACK TO TOP
    ========================================*/

    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY >
                    500
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }
        );

    }



    /*========================================
    PREVENT PAST DATE
    ========================================*/

    const dateInput =
        document.getElementById(
            "appointmentDate"
        );


    if (dateInput) {

        const today =
            new Date();


        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        dateInput.min =
            `${year}-${month}-${day}`;

    }



    /*========================================
    PHONE NUMBER INPUT
    ========================================*/

    const phoneInput =
        document.getElementById(
            "patientPhone"
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^0-9+ ]/g,
                        ""
                    );

            }
        );

    }



    /*========================================
    CURRENT YEAR
    ========================================*/

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll(
            ".current-year"
        )
        .forEach(function (element) {

            element.textContent =
                currentYear;

        });



    /*========================================
    LOGO → HOME
    ========================================*/

    const logo =
        document.querySelector(".logo");


    if (logo) {

        logo.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }
        );

    }



    /*========================================
    ESC KEY → CLOSE MOBILE MENU
    ========================================*/

    document.addEventListener(
        "keydown",
        function (e) {

            if (
                e.key === "Escape" &&
                nav
            ) {

                nav.classList.remove(
                    "active"
                );


                if (menuBtn) {

                    const icon =
                        menuBtn.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


});
