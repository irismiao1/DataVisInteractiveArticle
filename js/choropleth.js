// Modified from https://observablehq.com/@d3/state-choropleth?collection=@d3/d3-geo
function renderChoropleth({ container, us, data, tooltip }) {
  const width = 975;
  const height = 610;

  const path = d3.geoPath();

  const svg = container
    .classed("chart-choropleth", true)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const state = svg
    .append("g")
    .attr("class", "states-g")
    .selectAll(".state-g")
    .data(topojson.feature(us, us.objects.states).features, (f) => f.id)
    .join("g")
    .attr("class", "state-g")
    .on("mouseenter", entered)
    .on("mousemove", moved)
    .on("mouseleave", left);

  const statePath = state
    .append("path")
    .attr("class", "state-path")
    .attr("fill", "#fff")
    .attr("stroke", "currentColor")
    .attr("d", path);

  const stateNoDataLabel = state
    .append("text")
    .attr("class", "state-no-data-label")
    .attr("transform", (f) => `translate(${path.centroid(f)})`)
    .attr("dy", "0.32em")
    .attr("text-anchor", "middle")
    .attr("fill", "currentColor");

  function entered(event, fActive) {
    // Move the hovered state to the front so all borders of the hovered state can be seen
    state.filter((f) => f === fActive).raise();

    const stateName = fActive.properties.name;
    const formattedValue = fActive.formattedValue;
    const html = `
      <div class="text-center">
        <div>${stateName}</div>
        <div class="fs-4">${formattedValue}</div>
      </div>
    `;
    tooltip.show(html);
  }

  function moved(event, fActive) {
    tooltip.move(event);
  }

  function left(event, fActive) {
    // Reset the state order
    state.order();

    tooltip.hide();
  }

  function update({ color, columnName, format }) {
    // Add value to each state
    state.each((f) => {
      const value = data.find((d) => d.state === f.properties.name)[columnName];
      f.value = value;
      f.formattedValue = value ? format(value) : "";
    });

    // States with data are colored accordingly
    statePath.transition().attr("fill", (f) => {
      return f.value ? color(f.value) : "#fff";
    });

    // States without data, disable its tooltip
    state.attr("pointer-events", (f) => {
      return f.value ? null : "none";
    });

    // States without data are labeled with no data
    stateNoDataLabel.text((f) => {
      return f.value ? "" : "No Data";
    });
  }

  return { update };
}
