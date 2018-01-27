const svg = d3.select("svg");

const path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  const regions = {
    eastSouthCentral: ['01', '21', '28', '47'],
    southAtlantic: ['12', '13', '45', '37', '51', '54', '24', '10'],
    middleAtlantic: ['36', '42', '34'],
    newEngland: ['09', '44', '25', '50', '33', '23'],
    eastNorthCentral: ['55', '26', '39', '18', '17'],
    westSouthCentral: ['48', '40', '05', '22'],
    midWest: ['20', '29', '31', '19', '46', '38', '27'],
    mountain: ['30', '16', '56', '04', '08', '35', '49', '32'],
    pacific: ['53', '41', '06', '02', '15']
  };

  const percent = {
    thirteen: ['48', '40', '05', '22'],
    fifteen: ['01', '21', '28', '47', '12', '13', '45', '37', '51', '54', '24', '10', '55', '26', '39', '18', '17', '48', '40', '05', '22', '20', '29', '31', '19', '46', '38', '27', '30', '16', '56', '04', '08', '35', '49', '32', '52', '41', '06', '02', '15', '53'],
    sixteen: ['09', '44', '25', '50', '33', '23', '36', '42', '34']
  };

  function chooseFill(d) {
    if (percent.thirteen.includes(d.id)) {
      return '#6db5be';
    } else if (percent.fifteen.includes(d.id)) {
      return '#008592';
    } else if (percent.sixteen.includes(d.id)) {
      return '#0c5967';
    }
  }

  svg.append("g")
      .attr("fill", "#000")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr('class', 'states')
      .attr("d", path)
      .style('fill', chooseFill)
    .append("title")
      .text(function(d) { return d.id; });

  svg.append("path")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  const pacificBorders = [
    ['06', '32'],
    ['06', '04'],
    ['32', '41'],
    ['16', '41'],
    ['16', '53']
  ];

  const mountainBorders = [
    ['30', '38'],
    ['30', '46'],
    ['56', '46'],
    ['56', '31'],
    ['08', '31'],
    ['08', '20'],
    ['08', '40'],
    ['35', '40'],
    ['35', '48']
  ];

  const midwestBorders = [
    ['27', '55'],
    ['19', '55'],
    ['19', '17'],
    ['29', '17'],
    ['29', '21'],
    ['29', '47'],
    ['29', '05'],
    ['20', '40'],
    ['40', '29']
  ];

  const wsCentralBorders = [
    ['05', '47'],
    ['05', '28'],
    ['22', '28']
  ];

  const newenglandBorders = [
    ['36', '50'],
    ['36', '25'],
    ['36', '09']
  ];

  const midAtlanticBorders = [
    ['42', '39'],
    ['42', '54'],
    ['42', '24'],
    ['42', '10']
  ];

  const esCentralBorders = [
    ['01', '12'],
    ['01', '13'],
    ['47', '13'],
    ['47', '37'],
    ['47', '51'],
    ['21', '51'],
    ['21', '54'],
    ['21', '39'],
    ['21', '18'],
    ['21', '17']
  ];

  const southAtlanticBorders = [
    ['39', '54']
  ];

  function border(id0, id1) {
    return function(a, b) {
      return a.id === id0 && b.id === id1
          || a.id === id1 && b.id === id0;
    };
  };

  pacificBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  mountainBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  midwestBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  wsCentralBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  newenglandBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  midAtlanticBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  esCentralBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });

  southAtlanticBorders.forEach(pair => {
    return svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("d", path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1]))))
  });
})
