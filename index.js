SVIFT.vis.barchart = (function (data, root) {
 
  // Module object
  var module = SVIFT.vis.base(data, root);
 
  module.setup = function () {
    module.svg.append('rect')
      .attr('x', module.config.margin.left)
      .attr('y', module.config.margin.top)
      .style('stroke','#000')
      .style('fill','transparent');

    module.svg.append('text')
      .style('fill','#000')
      .attr('dx',50)
      .attr('dy',50)
      .text('Hello World');
  };

  module.resize = function () {
    var bb = module.svg.node().getBBox();
    console.log(bb);
    module.svg.select('rect')
      .attr('width', bb.width)
      .attr('height', bb.height);
  };

  return module;
 });