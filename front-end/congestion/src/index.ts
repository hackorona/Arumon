import axios from 'axios'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

import { Response, Body } from './model'

const baseURL = 'https://qakz6v6ril.execute-api.ap-northeast-1.amazonaws.com/dev/density'

am4core.useTheme(am4themes_animated)

const currentScript = () => {
  if (document.currentScript) {
    return document.currentScript
  }
  return document.getElementById('bentogo-widget')
}

const makeChart = (data) => {
  let chart = am4core.create("chartdiv", am4charts.XYChart)
  chart.hiddenState.properties.opacity = 0 // this creates initial fade-in

  chart.data = data

  chart.dateFormatter.inputDateFormat = "HH:mm"
  chart.zoomOutButton.disabled = true

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
  dateAxis.renderer.grid.template.strokeOpacity = 0
  dateAxis.renderer.minGridDistance = 0
  dateAxis.dateFormats.setKey("day", "HH:mm")
  dateAxis.tooltip.hiddenState.properties.opacity = 1
  dateAxis.tooltip.hiddenState.properties.visible = true

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
  valueAxis.renderer.inside = true
  valueAxis.renderer.labels.template.fillOpacity = 0.3
  valueAxis.renderer.grid.template.strokeOpacity = 0
  valueAxis.min = 0
  valueAxis.cursorTooltipEnabled = false

  let series = chart.series.push(new am4charts.ColumnSeries)
  series.dataFields.valueY = "numberOfPeople"
  series.dataFields.dateX = "timeZone"
  series.tooltipText = "{valueY.value}"

  let columnTemplate = series.columns.template
  columnTemplate.width = 50
  columnTemplate.column.cornerRadiusTopLeft = 10
  columnTemplate.column.cornerRadiusTopRight = 10
  columnTemplate.strokeOpacity = 0

  let cursor = new am4charts.XYCursor()
  cursor.behavior = "panX"
  chart.cursor = cursor
  cursor.lineX.disabled = true

  let middleLine = chart.plotContainer.createChild(am4core.Line)
  middleLine.strokeOpacity = 1
  middleLine.stroke = am4core.color("#000000")
  middleLine.strokeDasharray = "2,2"
  middleLine.align = "center"
  middleLine.zIndex = 1
  middleLine.adapter.add("y2", function (y2, target) {
    return target.parent.pixelHeight
  })
}

const main = async () => {
  const current = currentScript()
  const store_id = current.getAttribute('data-shop').replace('.myshopify.com','')
  const result = await axios.get(baseURL, {params: {store_id: store_id}})
  const data:Response = <Response>result.data
  const body:Body = <Body>JSON.parse(data.body)
  makeChart(body.data[0].density)
}

main()