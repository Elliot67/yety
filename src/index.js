// Variables
window.$minPad = 768;
window.$maxPad = 1023;
window.$minDesktop = 1024;


// IMPORT IMAGES
import './assets/favicon.png';

// IMPORT JS FILES HERE
import { Header } from "@scripts/header";
import { Slider } from "@scripts/slider";
import { LazyLoader } from "@scripts/lazyLoader";
import { ScrollAnimation } from "@scripts/scrollAnimation";
import { Members } from "@scripts/members";
import { SubmitFormAnimation } from "@scripts/submitFormAnimation";

new Header();
new Slider();
new Members();

const formContainers = document.querySelectorAll('.JS-FormContainer');
for(const container of formContainers) {
    new SubmitFormAnimation(container);
}

document.addEventListener("DOMContentLoaded", () => {
    new LazyLoader();
    new ScrollAnimation();
});