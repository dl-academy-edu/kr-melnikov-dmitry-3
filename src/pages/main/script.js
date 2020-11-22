// Slider
(function () {  
  slider({});
  // slider({sliderEl: ".slider2", defaultActiveSlide:10});

  function slider({sliderEl = ".slider", defaultActiveSlide = +localStorage.getItem("activeSlide") || 0 }) {
    const slider = document.querySelector(sliderEl);
    if (!slider) {
      console.warn (`Element "Slider" with querySelector "${sliderEl}" is NOT FOUND on this page, please check your querySelector.`)
      return
    };
    const wrapper = slider.querySelector(".slider__wrapper");
    const innerWrapper = slider.querySelector(".slider__inner-wrapper");
    const pagination = slider.querySelector(".slider__pagination");
    const buttonPrev = slider.querySelector(".slider__button_previous");
    const buttonNext = slider.querySelector(".slider__button_next");
    const slides = [...slider.querySelectorAll(".slider__slide")];
    const anyTime = 500;
    
    if (defaultActiveSlide < 0) {defaultActiveSlide = 0};
    if (defaultActiveSlide >= slides.length) {defaultActiveSlide = slides.length - 1};
  
    let activeSlide = defaultActiveSlide;
    let slideWidth = 0;
    let dots = [];
    let timerId = null;
  
    initSlidesWidth();
    createPagination();
    setActiveSlide(activeSlide, false);
  
    window.addEventListener("resize", function () {
      initSlidesWidth();
      setActiveSlide(activeSlide, false);
    })
  
    function addAnimation(duration) {
      clearTimeout(timerId);
      innerWrapper.style.transition = `transform ${duration}ms`;
      timerId = setTimeout(function () {
        innerWrapper.style.transition = "";
      }, duration);
    }
  
    function createPagination() {
      for (let i = 0; i < slides.length; i++) {
        let dot = createDot(i);
        pagination.insertAdjacentElement("beforeend", dot);
        dots.push(dot);
      }
    }
  
    function createDot(index) {
      let dot = document.createElement("button");
      dot.classList.add("slider__pagination__item");
      if (index === activeSlide) {
        dot.classList.add("slider__pagination__item_active");
      }
      dot.addEventListener("click", function () {
        setActiveSlide(index)
      })
      return dot;
    }
  
    function initSlidesWidth() {
      slideWidth = wrapper.clientWidth;
      for (let slide of slides) {
        slide.style.width = `${slideWidth}px`;
      }
    }
  
    function setActiveSlide(index, playAnimation = true) {
      if (index < 0 || index >= slides.length) {
        return
      }
  
      if (playAnimation) {
        addAnimation(anyTime);
      }
      dots[activeSlide].classList.remove("slider__pagination__item_active");
      dots[index].classList.add("slider__pagination__item_active");
  
      if (index === 0) {
        buttonPrev.setAttribute("disabled", "");
      } else {
        buttonPrev.removeAttribute("disabled");
      }
      if (index === slides.length - 1) {
        buttonNext.setAttribute("disabled", "");
      } else {
        buttonNext.removeAttribute("disabled");
      }
      innerWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
      activeSlide = index;
      localStorage.setItem("activeSlide", activeSlide);
    }
  
    buttonPrev.addEventListener("click", function () {
      setActiveSlide(activeSlide - 1);
    })
  
    buttonNext.addEventListener("click", function () {
      setActiveSlide(activeSlide + 1);
    })

    let x;
    let left = 0;
    let isTouch = false;
    let px = 300;
    let active = false;

    wrapper.addEventListener ("touchstart", function (event) {
      x = event.changedTouches[0].pageX;
      isTouch = true;
      active = true;
    });

    wrapper.addEventListener ("touchmove", function (event) {
      if(!isTouch){return}      
      let diffX;
      
      diffX = x - event.changedTouches[0].pageX;

      left = -diffX;
      
      if (left > px+diffX && active) {
          setActiveSlide(activeSlide - 1);
          active = false;
      }

      if (diffX > px+left && active) {
        setActiveSlide(activeSlide + 1);
        active = false;
    }
    });

    wrapper.addEventListener ("touchend", function (event) {
      left = 0;
      isTouch = false;
    });
  }
})();

// Progress Bar
(function () {
  const skillsPercent = [...document.querySelectorAll(".skills__percent")];

  let htmlBar = document.querySelector(".skills__bar__html");
  let cssBar = document.querySelector(".skills__bar__css");
  let jsBar = document.querySelector(".skills__bar__js");
  let gitBar = document.querySelector(".skills__bar__git");
  let figmaBar = document.querySelector(".skills__bar__figma");

  let html = skillsPercent[0],
  css = skillsPercent[1],
  js = skillsPercent[2],
  git = skillsPercent[3],
  figma = skillsPercent[4];

  let scrolling = true;

  skillsPercent.forEach(item => item.innerText = `0%`);
  
  function skillsAnimation() {
    if (window.pageYOffset >= 1000 && scrolling) {
      scrolling = false;
      htmlBar.classList.add ("skills__bar__html_animation");
      cssBar.classList.add ("skills__bar__css_animation");
      jsBar.classList.add("skills__bar__js_animation");
      gitBar.classList.add("skills__bar__git_animation");
      figmaBar.classList.add("skills__bar__figma_animation");

      setInterval(percent(0, 85, html), 100);
      setInterval(percent(0, 55, css), 150);
      setInterval(percent(0, 5, js), 1600);
      setInterval(percent(0, 15, git), 550);
      setInterval(percent(0, 80, figma), 100);

      function percent(num, maxNum, element) {
        return function () {
          num++
          if (num > maxNum) { 
            return clearTimeout(num);          
          }
          element.innerText = `${num}%`;
        }
      } 
    }
  }

  function clearSkills () {
    htmlBar.classList.remove ("skills__bar__html_animation");
    cssBar.classList.remove ("skills__bar__css_animation");
    jsBar.classList.remove("skills__bar__js_animation");
    gitBar.classList.remove("skills__bar__git_animation");
    figmaBar.classList.remove("skills__bar__figma_animation");
    skillsPercent.forEach(item => item.innerText = `0%`);
    setTimeout(skillsAnimation(scrolling = true), 100);      
  }

    window.addEventListener("scroll", skillsAnimation);
    setInterval(clearSkills, 15000);
})();

// Swiper
(function () {
let mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  }
});
})();