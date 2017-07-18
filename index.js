SVIFT.vis.barchart = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  module.d3config = {
    axisWidth : 50,
    axisHeight : 50,
    ease:d3.easeCubicInOut, 
    yInterpolate:[], 
    hInterpolate:[]
  }

  module.setup = function () {

    module.d3config.x = d3.scaleBand().padding(0.1).domain(data.data.data.map(function(d) { return d[0]; }));
    module.d3config.xAxis = d3.axisBottom().scale(module.d3config.x);

    module.d3config.y = d3.scaleLinear().domain(data.data.data, function(d){return d[1]});
    module.d3config.yAxis = d3.axisLeft().scale(module.d3config.y);

    module.d3config.gXAxis = module.g.append('g')
    module.d3config.gYAxis = module.g.append('g')

    module.d3config.bars = module.g.append('g').selectAll('rect').data(data.data.data).enter().append('rect')
      .style('stroke','transparent')
      .style('fill','#000');
  };

  module.resize = function () {
    var width = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right,
      height = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom;

    module.d3config.x.range([0,width-module.d3config.axisWidth])
    module.d3config.y.range([height-module.d3config.axisHeight,0])

    module.d3config.gXAxis.attr('transform','translate('+module.d3config.axisWidth+','+(height-module.d3config.axisHeight)+')')

    module.d3config.bars
      .attr('x', function(d){ return module.d3config.x(d[0]); })
      .attr("width", module.d3config.x.bandwidth())

    data.data.data.forEach(function(d,i){
      module.d3config.yInterpolate[i] = d3.interpolate(height-module.d3config.axisHeight, height-module.d3config.axisHeight-module.d3config.y(d[1]));
      module.d3config.hInterpolate[i] = d3.interpolate(0, module.d3config.y(d[1]));
    })
    
    module.drawBars(module.playHead)
  };

  module.drawBars = function(t){
    module.timeline.bars
      .attr('y',      module.d3config.yinterpolate(module.d3config.ease(t)))
      .attr('height', module.d3config.hinterpolate(module.d3config.ease(t)));
  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.drawBars}
  };

  return module;
 });