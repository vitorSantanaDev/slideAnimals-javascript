export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.distance = { finalPosition: 0, startX: 0, move: 0 };
  }

  onStart(event) {
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
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
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.distance.finalPosition = this.distance.movePosition;
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
