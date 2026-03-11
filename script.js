// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    // Intro video logic
    const introContainer = document.getElementById('intro-container');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-btn');

    function closeIntro() {
        if (introContainer && !introContainer.classList.contains('hidden')) {
            introContainer.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            // Pause and clean up video to save memory after fade transition
            setTimeout(() => {
                introContainer.style.display = 'none';
                if (introVideo) {
                    introVideo.pause();
                    introVideo.removeAttribute('src');
                    introVideo.load();
                }
                // Refresh GSAP ScrollTrigger after the intro is removed to ensure animations trigger properly
                ScrollTrigger.refresh();
            }, 1000);
        }
    }

    if (introContainer && introVideo && skipBtn) {
        introVideo.addEventListener('ended', closeIntro);
        skipBtn.addEventListener('click', closeIntro);

        // Failsafe: Handle autoplay block or video load error
        introVideo.addEventListener('error', closeIntro);
        const playPromise = introVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Autoplay blocked or failed:", error);
                closeIntro();
            });
        }
    } else {
        // Failsafe if intro elements are missing
        document.body.classList.remove('no-scroll');
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Parallax effect for hero image
    gsap.to('.hero-bg img', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Fade in up for section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Profile card animation
    gsap.from('.glass-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".profile-section",
            start: "top 75%",
        }
    });

    // Album cards stagger animation
    gsap.from('.album-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: ".discography-section",
            start: "top 70%",
        }
    });
});
