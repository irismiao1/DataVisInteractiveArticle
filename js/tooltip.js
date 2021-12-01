function renderTooltip() {
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "chart-tooltip shadow p-2 bg-white rounded");

  let tooltipSize;

  function show(html) {
    tooltip.html(html).classed("is-active", true);
    tooltipSize = tooltip.node().getBoundingClientRect();
  }

  function hide() {
    tooltip.classed("is-active", false);
  }

  function move(event) {
    let x = event.pageX;
    let y = event.pageY;

    // Ideally, the tooltip tip should be horizontally centered and 10px above the cursor
    x = x - tooltipSize.width / 2;
    y = y - tooltipSize.height - 10;

    // Adjust the tooltip position if it extends beyond the page
    if (x < 0) {
      x = 0;
    } else if (x + tooltipSize.width > document.documentElement.clientWidth) {
      x = document.documentElement.clientWidth - tooltipSize.width;
    }
    if (y < 0) {
      y = 0;
    }

    tooltip.style("transform", `translate(${x}px,${y}px)`);
  }

  return {
    show,
    hide,
    move,
  };
}
