import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import adminLayout from '../hoc/adminLayout'

const options = {
    title: {
      text: 'My stock chart'
    },
    series: [{
      data: [1, 2, 3]
    }]
  }

const AdminBlankPage = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
  {/* <HighchartsReact
  highcharts={Highcharts}
  constructorType={'stockChart'}
  options={options}
/> */}
</div>

// render(<AdminBlankPage />, document.getElementById('root'))
export default adminLayout(AdminBlankPage);