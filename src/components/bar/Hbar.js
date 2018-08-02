import * as d3 from 'd3';

const drawBar = function (svg, x, y, dx, dy, width, height, id) {
  const me = this;
  let data = me.data.data;
  let len = data.length - 1;
  let barh = me._barH;
  let g = svg.append('g')
    .attr('transform', `translate(${dx} ${height - dy})`);
  let bar = g.selectAll('g').data(data).enter()
    .append('g');

  // bar2 bg
  bar.append('path')
    .attr('d', function (d, i) {
      let h = height - 2 * dy - (y(d.name) + me.yStep / 2);
      let l = x(me.data.dataX[1])
      return `M1,${-(h - barh / 2)} H${l} V${-(h + barh / 2)} H1`
    })
    .style('fill', me._colorBg || 'rgba(36,169,224,.3)');

  // bar1
  bar.append('path')
    .style('fill', function (d, i) {
      let index = len - i;
      return `url(#${index > (id.length - 2) ? id[id.length - 1] : id[index]})`
    })
    .style('cursor', 'pointer')
    .on('mouseover', function (d, i) {
      let h = y(d.name) + me.yStep / 2;
      let l = x(d.value) + dx;
      me.tooltip.transition()
        .duration(400)
        .attr('opacity', 1)
        .attr('transform', `translate(${l - me._tooltipL},${h + me._tooltipH / 2})`);
      me.tooltip.select('text').text(`${d.value + me._unit}`)
    })
    .on('mouseout', function (d, i) {
      me.tooltip.transition()
        .duration(400)
        .attr('opacity', 0);
    })
    .transition()
    .duration(1000)
    .attrTween('d', function (d) {
      let h = height - 2 * dy - (y(d.name) + me.yStep / 2);
      let l = x(d.value) - barh / 2;
      let i = d3.interpolate(0, l);
      return function (t) {
        return `M1,${-(h - barh / 2)} H${i(t)} A${barh / 2},${barh / 2} 0 1,0 ${i(t)},${-(h + barh / 2)} H1`;
      }
    });
}

export default drawBar;
