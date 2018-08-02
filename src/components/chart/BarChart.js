import * as d3 from 'd3';
import Axios from '../axios/Axios';
import drawBar from '../bar/Hbar';

class Chart {
  constructor(id) {
    this.svg = d3.select('#' + id).append('svg');
  }

  set size(d) {
    this._width = d.width;
    this._height = d.height;
    this.draw();
  }
  get size() {
    return (
      this._width,
      this._height
    );
  }

  draw() {
    const me = this;
    const svg = me.svg;
    svg.attr('width', me._width)
      .attr('height', me._height);
    me.drawAxios(svg);
  }

  drawAxios(svg) {
    let axios = new Axios(svg);
    axios.gride = {
      width: this._width,
      height: this._height,
      left: 50,
      bottom: 30
    };

    axios.x = {
      type: 'linear',
      data: [1, 5],
      color: 'red',
      textColor: 'green',
      fontSize: '16px'
    };

    axios.y = {
      type: 'linear',
      data: [0, 100]
    };
    setTimeout(() => {
      this.drawBar(axios.getScale());
    }, 100)
  }

  drawBar(scale) {
    console.log(scale)
  }
};

export default Chart;
