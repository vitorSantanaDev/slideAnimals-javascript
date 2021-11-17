export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.distance = { finalPosition: 0, startX: 0, move: 0 };
  }

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : ""
  }

  onStart(event) {
    let mouseMoviment;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.distance.startX = event.clientX;
      mouseMoviment = "mousemove";
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      mouseMoviment = "touchmove";
    }
    this.wrapper.addEventListener(mouseMoviment, this.onMove);
    this.transition(false)
  }

  updatePosition(clienX) {
    this.distance.move = (this.distance.startX - clienX) * 1.6;
    return this.distance.finalPosition - this.distance.move;
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  changeSlideOnEnd() {
    if (this.distance.move > 120 && this.index.next !== undefined)
      this.activeNextSlide();
    else if (this.distance.move < -120 && this.index.prev !== undefined)
      this.activePrevSlide();
    else this.changeSlide(this.index.active);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }


  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  // Slides config
  slidePosition(slide) {
    const margen = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margen);
  }

  slidesIndexNav(index) {
    const lastItem = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === lastItem ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.distance.finalPosition = activeSlide.position;
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { element, position };
    });
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
