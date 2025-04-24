(() => {
   
    const track = document.querySelector('.carousel-track');
    const prev = document.querySelector('.carousel-nav-prev');
    const next = document.querySelector('.carousel-nav-next');
    const itemWidth = document.querySelector('.carousel-item').offsetWidth + 20; // 20 = gap
    let currentIndex = 0;
  
    next.addEventListener('click', () => {
      const totalItems = document.querySelectorAll('.carousel-item').length;
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      }
    });
  
    prev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      }
    });
   
   
    const state = {
      currentSlide: 0,
      totalSlides: 3,
  
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        update();
      },
  
      prevSlide() {
        this.currentSlide =
          (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        update();
      },
  
      setSlide(index) {
        this.currentSlide = index;
        update();
      },
    };
  
    let nodesToDestroy = [];
    let pendingUpdate = false;
  
    function destroyAnyNodes() {
      nodesToDestroy.forEach((el) => el.remove());
      nodesToDestroy = [];
    }
  
    function update() {
      if (pendingUpdate) return;
      pendingUpdate = true;
  
      document.querySelectorAll("[data-el='div-1']").forEach((el) => {
        el.setAttribute("space", "48");
      });
  
      document.querySelectorAll("[data-el='div-2']").forEach((el) => {
        el.setAttribute("space", "1");
      });
  
      document.querySelectorAll("[data-el='div-3']").forEach((el) => {
        el.style.transform = `translateX(-${
          state.currentSlide * (window.innerWidth <= 640 ? 100 : 33.33)
        }%)`;
      });
  
      document.querySelectorAll("[data-el='for']").forEach((el) => {
        renderLoop(el, [0, 1, 2], "slideIndex");
      });
  
      document.querySelectorAll("[data-el='button-3']").forEach((el) => {
        const slideIndex = getScope(el, "slideIndex");
        el.style.background =
          state.currentSlide === slideIndex ? "#fff" : "rgba(255,255,255,0.5)";
        el.removeEventListener("click", onDotClick);
        el.addEventListener("click", onDotClick);
      });
  
      destroyAnyNodes();
      pendingUpdate = false;
    }
  
    function onPrevClick() {
      state.prevSlide();
    }
  
    function onNextClick() {
      state.nextSlide();
    }
  
    function onDotClick(event) {
      const slideIndex = getScope(event.currentTarget, "slideIndex");
      state.setSlide(slideIndex);
    }
  
    function renderLoop(template, array, itemName) {
      array.forEach((value, index) => {
        const element = template.content.cloneNode(true);
        const children = Array.from(element.childNodes);
  
        children.forEach((child) => {
          child.scope = { [itemName]: value };
          nodesToDestroy.push(child);
          template.parentNode.insertBefore(child, template);
        });
      });
    }
  
    function getScope(el, name) {
      while (el) {
        if (el.scope && name in el.scope) {
          return el.scope[name];
        }
        el = el.parentNode;
      }
    }
  
    // FAQ Functionality
    const faqQuestions = document.querySelectorAll(".faq-question");
  
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains("active");
  
        // Close all other answers
        document
          .querySelectorAll(".faq-question.active")
          .forEach((activeQuestion) => {
            if (activeQuestion !== question) {
              activeQuestion.classList.remove("active");
              activeQuestion.nextElementSibling.classList.remove("active");
            }
          });
  
        // Toggle current answer
        question.classList.toggle("active");
        answer.classList.toggle("active");
      });
    });
  
    // Scroll animation
    const animateElements = document.querySelectorAll("[data-animate]");
  
    function checkScroll() {
      animateElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (elementTop < windowHeight * 0.9) {
          element.classList.add("animate");
        }
      });
    }
  
    // Add data-animate attribute to elements
    document
      .querySelectorAll(
        ".profile-content, .carousel-section, .feature-image, .club-button, .faq-section",
      )
      .forEach((el) => el.setAttribute("data-animate", ""));
  
    // Initial check and event listener
    checkScroll();
    window.addEventListener("scroll", checkScroll);
  
    update();
  })();
  