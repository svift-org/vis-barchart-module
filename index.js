SVIFT.vis.barchart = (function (data, container) {
 
  // Module object
  var module = SVIFT.vis.base(data, container);
 
  module.d3config = {
    axisWidth : 50,
    axisHeight : 50,
    ease:d3.easeCubicInOut, 
    wInterpolate:[]
  }

  module.setup = function () {

    module.d3config.y = d3.scaleBand().padding(0.1).domain(data.data.data.map(function(d) { return d[0]; }));
    module.d3config.yAxis = d3.axisLeft();

    module.d3config.x = d3.scaleLinear().domain([0, d3.max(data.data.data, function(d){return d[1]})]);
    module.d3config.xAxis = d3.axisBottom();

    module.d3config.gXAxis = module.g.append('g')
    module.d3config.gYAxis = module.g.append('g').attr('transform','translate('+module.d3config.axisWidth+',0)')

    module.d3config.bars = module.g.append('g').selectAll('rect').data(data.data.data).enter().append('rect')
      .attr('x', module.d3config.axisWidth)
      .style('stroke','transparent')
      .style('fill','#000');
  };

  module.resize = function () {
    var width = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right - module.d3config.axisWidth,
      height = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom - module.d3config.axisHeight;

    module.d3config.x.range([0,width])
    module.d3config.y.range([0,height])

    module.d3config.xAxis.scale(module.d3config.x)
    module.d3config.gXAxis.call(module.d3config.xAxis)

    module.d3config.yAxis.scale(module.d3config.y)
    module.d3config.gYAxis.call(module.d3config.yAxis)

    module.d3config.gXAxis.attr('transform','translate('+module.d3config.axisWidth+','+height+')')

    module.d3config.bars
      .attr('y', function(d){ return module.d3config.y(d[0]); })
      .attr("height", module.d3config.y.bandwidth())

    data.data.data.forEach(function(d,i){
      module.d3config.wInterpolate[i] = d3.interpolate(0, module.d3config.x(d[1]));
    })
    
    module.drawBars(module.playHead)
  };

  module.drawBars = function(t){
    module.d3config.bars
      .attr('width', function(d,i){ return module.d3config.wInterpolate[i](module.d3config.ease(t)) });
  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.drawBars}
  };

  return module;
 });