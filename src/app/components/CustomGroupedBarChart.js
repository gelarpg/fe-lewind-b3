/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

const CustomGroupedBarChart = ({
  chartId,
  generatedData,
  originalData,
  chartColor = "#EA4569",
  isGroupped = true,
}) => {
  let chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current && chartId) {
      chartRef.current = am4core.create(chartId, am4charts.XYChart);
    }

    // Add X Axis
    let categoryAxis = chartRef.current.xAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.truncate = true;
    categoryAxis.renderer.labels.template.maxWidth = 100;
    categoryAxis.renderer.labels.template.tooltipText = "{labelToShow}";
    categoryAxis.dataItems.template.text = "{labelToShow}";

    // Add Y Axis
    let valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

    // Create series
    let columnSeries = chartRef.current.series.push(
      new am4charts.ColumnSeries()
    );
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = "{tooltipMsg}: {valueY}";
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";
    columnSeries.fillOpacity = 1;
    columnSeries.fill = typeof chartColor === 'string' ? am4core.color(chartColor) : chartColor;
    columnSeries.strokeWidth = 0;

    let rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    // process data ant prepare it for the chart
    if (isGroupped) {
      for (var grouped in originalData) {
        // create range (the additional label at the bottom)
        let range = categoryAxis.axisRanges.create();
        range.category = originalData[grouped][0].category;
        range.endCategory =
          originalData[grouped][originalData[grouped].length - 1].category;
        range.label.text = originalData[grouped][0].month;
        range.label.dy = 30;
        range.label.truncate = true;
        range.label.tooltipText = originalData[grouped][0].month;
  
        range.label.adapter.add("maxWidth", function (maxWidth, target) {
          let range = target.dataItem;
          let startPosition = categoryAxis.categoryToPosition(range.category, 0);
          let endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
          let startX = categoryAxis.positionToCoordinate(startPosition);
          let endX = categoryAxis.positionToCoordinate(endPosition);
          return endX - startX;
        });
      }
    }

    // Add cursor
    chartRef.current.cursor = new am4charts.XYCursor();

    // Disable axis lines
    chartRef.current.cursor.lineX.disabled = true;
    chartRef.current.cursor.lineY.disabled = true;

    // Disable axis tooltips
    categoryAxis.cursorTooltipEnabled = false;
    valueAxis.cursorTooltipEnabled = false;

    // Disable zoom
    chartRef.current.cursor.behavior = "none";

    chartRef.current.paddingBottom = 20;

    // Enable Responsive
    chartRef.current.responsive.enabled = true;
    chartRef.current.responsive.rules.push({
      relevant: function (target) {
        return false;
      },
      state: function (target, stateId) {
        return;
      },
    });

    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = generatedData;
    }
  }, [generatedData]);

  useEffect(() => {
    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  return (
    <div
      id={chartId}
      style={{
        width: "100%",
        height: "300px",
      }}
    ></div>
  );
};

export default React.memo(CustomGroupedBarChart);
