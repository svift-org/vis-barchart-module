SVIFT.vis.barchart = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  module.setup = function () {
    module.g.append('rect')
      .attr('x', module.config.margin.left)
      .attr('y', module.config.margin.top)
      .style('stroke','#000')
      .style('fill','transparent');

    module.g.append('text')
      .style('fill','#000')
      .attr('dx',50)
      .attr('dy',50)
      .text('Hello World');
  };

  module.resize = function () {
    var bb = module.container.node();
    module.g.select('rect')
      .attr('width', bb.width)
      .attr('height', bb.height);
  };

  return module;
 });