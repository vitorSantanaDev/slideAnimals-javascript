import { SlideNav } from "./controller/controllerSlide.js";

const slide = new SlideNav(".slideWrapper", ".slideItems");
slide.init();
slide.addArrow(".prev", ".next");
slide.addControll('.customControll');
