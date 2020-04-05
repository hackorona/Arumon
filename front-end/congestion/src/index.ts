import axios from 'axios'
import * as moment from 'moment'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

import { Response, Body, Density } from './model'

const baseURL = 'https://btghcyhfwa.execute-api.ap-northeast-1.amazonaws.com/staging/density'

am4core.useTheme(am4themes_animated)

const currentScript = () => {
  if (document.currentScript) {
    return document.currentScript
  }
  return document.getElementById('bentogo-widget')
}

interface DensityTMP {
  from: string,
  to: string,
  numberOfPeople: number | string
}

const makeChart = (data: [DensityTMP]) => {
  console.log(data)

  const chart = am4core.create("bentogo-widget-chart", am4charts.XYChart)
  chart.data = data
  chart.dateFormatter.inputDateFormat = "HH:mm"
  chart.zoomOutButton.disabled = true
  
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
  dateAxis.dateFormats.setKey("day", "HH:mm")
  dateAxis.renderer.grid.template.location = 0
  dateAxis.renderer.minGridDistance = 30
  dateAxis.baseInterval = {
    "timeUnit": "minute",
    "count": 15
  }
  
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
  const series = chart.series.push(new am4charts.ColumnSeries())
  series.dataFields.valueY = "numberOfPeople"
  series.dataFields.dateX = "from"
  series.name = "Orders"
  series.columns.template.tooltipText = "[bold]{valueY}[/]"
  series.columns.template.fillOpacity = .8
  
  const columnTemplate = series.columns.template
  columnTemplate.strokeWidth = 2
  columnTemplate.strokeOpacity = 1
}

const main = async () => {
  const element = document.getElementById('bentogo-widget-area')
  const titlediv = document.createElement('div')
  titlediv.setAttribute('id','bentogo-widget-header')
  titlediv.innerHTML = '<h2>混雑状況 powerd by BenToGo</h2>'

  element.appendChild(titlediv)
  const chartdiv = document.createElement('div')
  chartdiv.setAttribute('id','bentogo-widget-chart')
  chartdiv.setAttribute("style", "width:100% height:250px")
  element.appendChild(chartdiv)

  const current = currentScript()
  const store_id = current.getAttribute('data-shop').replace('.myshopify.com','')

  const result = await axios.get(baseURL, {params: {store_id: store_id}})
  const data:Response = <Response>result.data
  const body:Body = <Body>JSON.parse(data.body)

  const from = moment().subtract(2, 'hours')
  const to = moment()

  const chartData:[DensityTMP] = body[0].density
    .map((v:Density) => {
    const time = v.timeZone.split('-')
    return <DensityTMP>{from: time[0], to: time[1], numberOfPeople: v.numberOfPeople}
    })
    .filter((v:DensityTMP) => (moment(v.from, "h:mm").isSameOrAfter(from) && moment(v.from, "h:mm").isSameOrBefore(to)))

  if(chartData.length > 0) {
    makeChart(chartData)
  } else {
    chartdiv.innerText = "We don't have enough data."
  }

}

main()