import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'react-highcharts';

class Profit extends Component {
  componentDidMount() {
    // Fetch the JSON data
    fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json')
      .then((response) => response.json())
      .then((data) => {
        // Create the Highcharts chart
        Highcharts.stockChart('container', {
          title: {
            text: 'AAPL stock price by minute',
          },
          subtitle: {
            text: 'Using explicit breaks for nights and weekends',
          },
          xAxis: {
            breaks: [
              {
                // Nights
                from: Date.UTC(2011, 9, 6, 16),
                to: Date.UTC(2011, 9, 7, 8),
                repeat: 24 * 36e5,
              },
              {
                // Weekends
                from: Date.UTC(2011, 9, 7, 16),
                to: Date.UTC(2011, 9, 10, 8),
                repeat: 7 * 24 * 36e5,
              },
            ],
          },
          rangeSelector: {
            buttons: [
              {
                type: 'hour',
                count: 1,
                text: '1h',
              },
              {
                type: 'day',
                count: 1,
                text: '1D',
              },
              {
                type: 'all',
                count: 1,
                text: 'All',
              },
            ],
            selected: 1,
            inputEnabled: false,
          },
          series: [
            {
              name: 'AAPL',
              type: 'area',
              data: data,
              gapSize: 5,
              tooltip: {
                valueDecimals: 2,
              },
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1,
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [
                    1,
                    Highcharts.color(Highcharts.getOptions().colors[0])
                      .setOpacity(0)
                      .get('rgba'),
                  ],
                ],
              },
              threshold: null,
            },
          ],
        });
      });
  }

  render() {
    return (
      <div id="container" style={{ width: '100%', height: '400px' }}>
        {/* Highcharts chart will be rendered here */}
      </div>
    );
  }
}

export default Profit;
