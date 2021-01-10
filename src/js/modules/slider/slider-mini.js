import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  decorateSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    this.slides[0].classList.add(this.activeClass);

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    this.container.append(this.slides[0]);
    this.decorateSlides();

    if (this.slides[0].tagName === 'BUTTON') {
      for (let i = 0; i < 2; i++) {
        this.next.click();
      }
    }
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
      let active = this.slides[this.slides.length - 1];
      this.container.insertBefore(active, this.slides[0]);
      this.decorateSlides();

      if (this.slides[0].tagName === 'BUTTON') {
        for (let i = 0; i < 2; i++) {
          this.prev.click();
        }
      }
    });
  }

  autoPlay() {
    let start = setInterval(() => this.nextSlide(), 5000);

    this.slides.forEach(slide => {
      slide.addEventListener('mouseenter', () => {
        clearInterval(start);
      });
    });

    this.next.addEventListener('mouseenter', () => {
      clearInterval(start);
    });

    this.prev.addEventListener('mouseenter', () => {
      clearInterval(start);
    });
  }

  startAutoplay(item) {
    if (item.length > 0) {
      item.forEach(slide => {
        slide.addEventListener('mouseleave', () => {
          this.autoPlay();
        });
      });
    } else {
      item.addEventListener('mouseleave', () => {
        this.autoPlay();
      });
    }
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;

      this.bindTriggers();
      this.decorateSlides();



      if (this.autoplay) {
        this.autoPlay();

        this.startAutoplay(this.slides);
        this.startAutoplay(this.next);
        this.startAutoplay(this.prev);
      }
    } catch (error) { }
  }
}