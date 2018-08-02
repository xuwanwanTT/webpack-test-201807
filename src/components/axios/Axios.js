import * as d3 from 'd3';
import { UiComponent } from '@jusfoun-vis/common';

class Axios extends UiComponent {
  constructor(svg) {
    super();
    this.svg = svg;
  }

  set gride(d) {
    this._height = d.height;
    this._width = d.width;
    this._dx = d.left;
    this._dy = d.bottom;
    this.updateSize();
  }
  get gride() {
    return (
      this._height,
      this._width,
      this._dx,
      this._dy
    );
  }

  set x(d) {
    this._xType = d.type;
    this._xData = d.data;
    this._xLineColor = d.color;
    this._xTextColor = d.textColor;
    this._xFontSize = d.fontSize;
    this.updateSize();
  }
  get x() {
    return (
      this._xType,
      this._xData,
      this._xLineColor,
      this._xTextColor,
      this._xFontSize
    );
  }

  set y(d) {
    this._yType = d.type;
    this._yData = d.data;
    this._yLineColor = d.color;
    this._yTextColor = d.textColor;
    this._yFontSize = d.fontSize;
    this.updateSize();
  }
  get y() {
    return (
      this._yType,
      this._yData,
      this._yLineColor,
      this._yTextColor,
      this._yFontSize
    );
  }

  updateSize() {
    this.isUpdateSize = true;
    this.invalidateProperties();
  }

  commitProperties() {
    const me = this;
    if (me.isUpdateSize) {
      me.isUpdateSize = false;
      me.draw();
    }
  }

  draw() {
    this.svgArrow();
    this.svgX();
    this.svgY();
  }

  // arrow
  svgArrow() {
    this.svg.append('defs').append('marker')
      .attr('id', 'svg-arrow')
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .attr('orient', 'auto')
      .attr('viewBox', '-4, -3, 12, 12')
      .append('path')
      .attr('d', 'M0 -4 L10 0 L0 4 L 3 0')
      .attr('transform', 'rotate(90) translate(-3 .5)')
      .style('fill', this._xLineColor || '#000')
      .style('stroke-width', 0);
  }

  scale(axios, type, len, data, dx) {
    let scale = null;
    if (type == 'linear') {
      scale = d3.scaleLinear();
    } else if (type == 'band') {
      scale = d3.scaleBand();
    }
    if (axios == 'x') {
      scale.domain(data)
        .range([0, len - 2 * dx]);
    } else if (axios == 'y') {
      scale.domain(data)
        .range([len - 2 * dx, 0]);
    }
    return scale
  }

  // xAxios
  drawAxiosX(type, data, color, textColor, fz) {
    const me = this;
    const svg = me.svg;
    const width = me._width;
    const height = me._height;
    const dx = me._dx;
    const dy = me._dy;
    let xScale = me.scale('x', type, width, data, dx);
    if (type == 'band') {
      me.xStep = xScale.step();
    }

    let xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(9)
      // .tickFormat(function (d) { return d + '%'; })
      .tickSize(0)
      .tickPadding(12);

    let x = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`)
      .call(xAxis);
    x.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', color || '#000');
    x.selectAll('text').attr('font-size', fz).attr('fill', textColor || '#000');

    me.xScale = xScale;
  }

  drawAxiosY(type, data, color, textColor, fz) {
    const me = this;
    const svg = me.svg;
    const height = me._height;
    const dx = me._dx;
    const dy = me._dy;
    let yScale = me.scale('y', type, height, data, dy);
    if (type == 'band') {
      me.yStep = yScale.step();
    }

    let yAxis = d3.axisLeft().scale(yScale)
      .tickSize(0)
      .tickPadding(12);

    let y = svg.append('g')
      .attr('transform', `translate(${dx} ${dy})`)
      .call(yAxis);

    y.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', color || '#000');
    y.selectAll('text').attr('font-size', fz).attr('fill', textColor || '#000');

    me.yScale = yScale;
  }

  // xAxios
  svgX() {
    const me = this;
    const type = me._xType;
    const data = me._xData;
    const color = me._xLineColor || me._yLineColor;
    const textColor = me._xTextColor || me._yTextColor;
    const fz = me._xFontSize || me._yFontSize;
    me.drawAxiosX(type, data, color, textColor, fz);
  }

  // yAxios
  svgY() {
    const me = this;
    const type = me._yType;
    const data = me._yData;
    const color = me._yLineColor || me._xLineColor;
    const textColor = me._yTextColor || me._xTextColor;
    const fz = me._yFontSize || me._xFontSize;
    me.drawAxiosY(type, data, color, textColor, fz);
  }

  getScale() {
    return {
      xScale: this.xScale,
      yScale: this.yScale,
      dx: this._dx,
      dy: this._dy
    };
  }

};

export default Axios;
