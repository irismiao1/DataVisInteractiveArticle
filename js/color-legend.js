// Modified from https://observablehq.com/@d3/color-legend
function renderColorLegend({ container }) {
  const width = 400;
  const tickSize = 6;
  const height = 48 + tickSize;
  const marginTop = 18;
  const marginRight = 0;
  const marginBottom = 16 + tickSize;
  const marginLeft = 0;

  const svg = container
    .classed("chart-color-legend", true)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible");

  const gRects = svg.append("g");

  const gTicks = svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`);

  const titleText = svg
    .append("text")
    .attr("class", "legend-title")
    .attr("x", marginLeft)
    .attr("y", marginTop - 8)
    .attr("fill", "currentColor");

  function update({ color, title, format }) {
    const thresholds = color.thresholds();
    const tickValues = d3.range(thresholds.length);
    const tickFormat = (d) => format(thresholds[d]);

    const x = d3
      .scaleLinear()
      .domain([-1, color.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

    titleText.text(title);

    gRects
      .selectAll("rect")
      .data(color.range())
      .join("rect")
      .attr("x", (d, i) => x(i - 1))
      .attr("y", marginTop)
      .attr("width", (d, i) => x(i) - x(i - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", (d) => d);

    gTicks
      .call(
        d3
          .axisBottom(x)
          .tickValues(tickValues)
          .tickFormat(tickFormat)
          .tickSize(tickSize)
      )
      .call((g) =>
        g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height)
      )
      .call((g) => g.select(".domain").remove())
      .attr("font-family", null)
      .attr("font-size", null);
  }

  return { update };
}
