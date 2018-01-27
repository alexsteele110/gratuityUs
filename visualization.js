var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("fill", "#000")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr('class', 'states')
      .attr("d", path)
      .style('fill', '#008592')
    .append("title")
      .text(function(d) { return d.id; });

  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  // California-Nevada border
  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("d", path(topojson.mesh(us, us.objects.states, border("06", "32"))));

  // California-Arizona border
  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("d", path(topojson.mesh(us, us.objects.states, border("06", "04"))));

  // Nevada-Oregon border
  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("d", path(topojson.mesh(us, us.objects.states, border("32", "41"))));

  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("d", path(topojson.mesh(us, us.objects.states, border("16", "41"))));

  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("d", path(topojson.mesh(us, us.objects.states, border("16", "53"))));
});

function border(id0, id1) {
  return function(a, b) {
    return a.id === id0 && b.id === id1
        || a.id === id1 && b.id === id0;
  };
}
