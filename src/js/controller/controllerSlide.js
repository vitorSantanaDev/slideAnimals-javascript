export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {}

  onEnd(event) {
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
