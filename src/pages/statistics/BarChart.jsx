import React from 'react';
import PropTypes from 'prop-types';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart as BarChartModule } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, BarChartModule, SVGRenderer]);

const BarChart = ({ name, data, categories, getChartTextColor }) => {
  const option = {
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0,
        rotate: name === 'Statuses' ? '25' : '',
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Array.from(data.values()),
        type: 'bar',
        width: '100%',
        height: '100%',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    textStyle: {
      color: getChartTextColor(),
    },
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      lazyUpdate={true}
      style={{ height: '28vw', minHeight: '270px', width: '100%' }}
    />
  );
};

BarChart.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object,
  getChartTextColor: PropTypes.func,
  categories: PropTypes.array,
};

export default BarChart;
