SVIFT.vis.barchart = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  module.timeline {
    rect: {start:0, end:5000, func:module.drawRect, obj:{ease:d3.easeCubicInOut, interpolate:null}}
  };

  module.setup = function () {
    module.g.append('rect')
      .attr('width', 50)
      .attr('height', 50)
      .attr('y', 50)
      .attr('x', 50)
      .style('stroke','#000')
      .style('fill','transparent');
  };

  module.resize = function () {
    var width = module.container.node().offsetWidth,
      height = module.container.node().offsetHeight;

    module.timeline.rect.obj.interpolate = d3.interpolate(50, width-100);
  };

  module.drawRect = function(t){
    module.g.select('rect').attr('x', module.timeline.rect.obj.interpolate(module.timeline.rect.obj.ease(t)));
  };

  return module;
 });