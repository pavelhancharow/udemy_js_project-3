import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns, nextmodule, prevmodule) {
    super(btns, nextmodule, prevmodule);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = '0';

      if (n === 2) {
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('animated', 'slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
        this.hanson.style.opacity = 0;
      }
    } catch (error) { }

    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  bindModules(module) {
    module.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (module === this.prevmodule) {
          this.plusSlides(-1);
        } else {
          this.plusSlides(1);
        }
      });
    });
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        this.plusSlides(1);
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();

        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.bindModules(this.prevmodule);
    this.bindModules(this.nextmodule);
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (error) { }

      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}