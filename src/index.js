// IMPORT SCSS FILES HERE
// -> converted to css in prod
// -> converted to js in dev
import "./styles/_main.scss";

// IMPORT JS FILES HERE
import { Slider } from "./scripts/slider";
const slider = new Slider();

slider.init();