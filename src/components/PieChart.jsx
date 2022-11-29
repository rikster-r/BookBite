import React from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ name, data, getChartTextColor }) => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name,
        type: 'pie',
        radius: '50%',
        data: Array.from(data, ([name, value]) => ({ name, value })),
        width: '100%',
        height: '100%',
      },
    ],
    textStyle: {
      color: getChartTextColor(),
    },
  };

  return (
    <ReactECharts
      option={option}
      lazyUpdate={true}
      style={{ height: '28vw', minHeight: '300px', width: '100%' }}
    />
  );
};

PieChart.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object,
  getChartTextColor: PropTypes.func,
};

export default PieChart;
