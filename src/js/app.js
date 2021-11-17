import Slide from "./controller/controllerSlide.js";

const slide = new Slide('.slideWrapper', '.slideItems');
slide.init()

slide.changeSlide(0)
