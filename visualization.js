const svg = d3
  .select('#map')
  .append('svg')
  // next two attributes make svg responsive
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr('viewBox', '0 0 600 400');

const projection = d3.geoAlbersUsa().scale(660).translate([300, 200]);

const path = d3.geoPath().projection(projection);

d3
  .queue()
  .defer(d3.json, 'us.json')
  .await(ready);

  function ready(error, us) {
    if (error) throw error;
    console.log(us);

    d3.json('us.json', us => {
      svg
        .selectAll('.states')
        .data(topojson.feature(us, us.objects.usStates).features)
        .enter()
        .append('path')
        .attr('class', 'states')
        .attr('d', path)
        .style('fill', '#008592');
    });
  }
