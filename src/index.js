// Variables
window.$minPad = 768;
window.$maxPad = 1023;
window.$minDesktop = 1024;

// IMPORT JS FILES HERE
import { Header } from "@scripts/header";
import { Slider } from "@scripts/slider";
import { LazyLoader } from "@scripts/lazyLoader";
import { ScrollAnimation } from "@scripts/scrollAnimation";

new Header();
new Slider();
document.addEventListener("DOMContentLoaded", () => {
    new LazyLoader();
    new ScrollAnimation();
});