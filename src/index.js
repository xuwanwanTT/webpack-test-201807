import './index.css';
import './components/test/test-1';
import BarChart from './components/chart/BarChart';
import Slider from './components/slider/Slider';

// let bar = new BarChart('svg-wrap');
// bar.size = {
//   width: 600,
//   height: 400
// };

let option = {
  width: 600,
  height: 400
};
let slider = new Slider(option);
document.querySelector('#canvas-wrap').appendChild(slider.dom);
