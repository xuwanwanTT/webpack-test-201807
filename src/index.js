import './index.css';
import './components/test/test-1';
import BarChart from './components/chart/BarChart';

let bar = new BarChart('svg-wrap');
bar.size = {
  width: 600,
  height: 400
};
