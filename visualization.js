const svg = d3.select('svg');

const path = d3.geoPath();

d3.json('us.json', function(error, us) {
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
    thirteen: regions.westSouthCentral,
    fifteen: [
      ...regions.eastSouthCentral,
      ...regions.southAtlantic,
      ...regions.eastNorthCentral,
      ...regions.midWest,
      ...regions.mountain,
      ...regions.pacific
    ],
    sixteen: [...regions.newEngland, ...regions.middleAtlantic]
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

  function assignClass(d) {
    for (let region in regions) {
      if (regions[region].includes(d.id)) {
        return region;
      }
    }
  }

  function handleMouseOver(d) {
    const currentClass = this.className.baseVal;

    d3
      .selectAll('.' + currentClass)
      .transition()
      .duration(300)
      .style('opacity', 0.8);

    d3
      .selectAll('.label.' + currentClass)
      .transition()
      .duration(300)
      .style('font-size', 28);

    d3
      .selectAll('.pin.' + currentClass)
      .transition()
      .duration(300)
      .style('r', 7);
  }

  function handleMouseOut(d) {
    const currentClass = this.className.baseVal;

    d3
      .selectAll('.' + currentClass)
      .transition()
      .duration(300)
      .style('opacity', 1);

    d3
      .selectAll('.label')
      .transition()
      .duration(300)
      .style('font-size', 22);

    d3
      .selectAll('.pin.' + currentClass)
      .transition()
      .duration(300)
      .style('r', 3);
  }

  svg
    .append('g')
    .attr('fill', '#000')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .enter()
    .append('path')
    .attr('class', assignClass)
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)
    .attr('d', path)
    .style('fill', chooseFill);

  svg
    .append('path')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      path(
        topojson.mesh(us, us.objects.states, function(a, b) {
          return a !== b;
        })
      )
    );

  const borderPairs = [
    ['06', '32'],
    ['06', '04'],
    ['32', '41'],
    ['16', '41'],
    ['16', '53'],
    ['30', '38'],
    ['30', '46'],
    ['56', '46'],
    ['56', '31'],
    ['08', '31'],
    ['08', '20'],
    ['08', '40'],
    ['35', '40'],
    ['35', '48'],
    ['27', '55'],
    ['19', '55'],
    ['19', '17'],
    ['29', '17'],
    ['29', '21'],
    ['29', '47'],
    ['29', '05'],
    ['20', '40'],
    ['40', '29'],
    ['05', '47'],
    ['05', '28'],
    ['22', '28'],
    ['36', '50'],
    ['36', '25'],
    ['36', '09'],
    ['42', '39'],
    ['42', '54'],
    ['42', '24'],
    ['42', '10'],
    ['01', '12'],
    ['01', '13'],
    ['47', '13'],
    ['47', '37'],
    ['47', '51'],
    ['21', '51'],
    ['21', '54'],
    ['21', '39'],
    ['21', '18'],
    ['21', '17'],
    ['39', '54']
  ];

  function border(id0, id1) {
    return function(a, b) {
      return (a.id === id0 && b.id === id1) || (a.id === id1 && b.id === id0);
    };
  }

  borderPairs.forEach(pair => {
    return svg
      .append('path')
      .attr('stroke', '#fff')
      .attr('stroke-width', 5)
      .attr(
        'd',
        path(topojson.mesh(us, us.objects.states, border(pair[0], pair[1])))
      );
  });
});
