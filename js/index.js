Promise.all([
  d3.csv(
    "https://raw.githubusercontent.com/fivethirtyeight/data/master/hate-crimes/hate_crimes.csv",
    d3.autoType
  ),
  d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"),
]).then(([data, us]) => {
  // Variable choices
  const variables = {
    hateCrimes: {
      columnName: "avg_hatecrimes_per_100k_fbi",
      displayName:
        "Average annual hate crimes per 100,000 population, FBI, 2010-2015",
      tickFormat: d3.format(".0f"),
      tooltipFormat: d3.format(".1f"),
      colorRange: d3.schemeReds[5],
    },
    votedTrump: {
      columnName: "share_voters_voted_trump",
      displayName:
        "Share of 2016 U.S. presidential voters who voted for Donald Trump",
      tickFormat: d3.format(".0%"),
      tooltipFormat: d3.format(".0%"),
      colorRange: d3.schemeRdBu[8].reverse(),
    },
    giniIndex: {
      columnName: "gini_index",
      displayName: "Income Inequality (Gini Index, 2015)",
      tickFormat: d3.format(".2f"),
      tooltipFormat: d3.format(".3f"),
      colorRange: d3.schemeReds[8],
    },
    highSchoolDegree: {
      columnName: "share_population_with_high_school_degree",
      displayName:
        "Share of adults 25 and older with a high-school degree, 2009",
      tickFormat: d3.format(".2f"),
      tooltipFormat: d3.format(".3f"),
      colorRange: d3.schemeBlues[6],
    },
  };

  // Variable toggle
  d3.select("#variable-toggles")
    .selectAll(".form-check")
    .data(Object.keys(variables))
    .join((enter) =>
      enter
        .append("div")
        .attr("class", "form-check")
        .call((div) =>
          div
            .append("input")
            .attr("class", "form-check-input")
            .attr("type", "radio")
            .attr("name", "variable-toggle")
            .attr("id", (d, i) => `variable-toggle-${i + 1}`)
            .attr("value", (d) => d)
            .attr("checked", (d, i) => (i === 0 ? "checked" : null))
        )
        .call((div) =>
          div
            .append("label")
            .attr("class", "form-check-label")
            .attr("for", (d, i) => `variable-toggle-${i + 1}`)
            .text((d) => variables[d].displayName)
        )
    )
    .on("change", (event) => {
      const selectedVariable = event.target.value;
      toggleVariable(selectedVariable);
    });

  function toggleVariable(selectedVariable) {
    const variable = variables[selectedVariable];

    // Update color scale
    const extent = d3.extent(
      // Exclude DC from the extent values calculation because on the choropleth map DC can't be seen
      data.filter((d) => d.state !== "District of Columbia"),
      (d) => d[variable.columnName]
    );
    color.domain(extent).range(variable.colorRange);

    // Update color legend
    colorLegend.update({
      color,
      title: variable.displayName,
      format: variable.tickFormat,
    });

    // Update choropleth
    choropleth.update({
      color,
      columnName: variable.columnName,
      format: variable.tooltipFormat,
    });
  }

  // Color and color legend
  const color = d3.scaleQuantize();

  const colorLegend = renderColorLegend({
    container: d3.select("#legend-container"),
  });

  // Tooltip
  const tooltip = renderTooltip();

  // Choropleth
  const choropleth = renderChoropleth({
    container: d3.select("#chart-container"),
    us,
    data,
    tooltip,
  });

  // Initialization
  const initialSelectedVariable = d3
    .select("input[name='variable-toggle']:checked")
    .property("value");
  toggleVariable(initialSelectedVariable);
});
