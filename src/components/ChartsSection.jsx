import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PieChart from './PieChart';
import BarChart from './BarChart';

const ChartsSection = ({ name, data, categories }) => {
  const makeSeries = (array, categories) => {
    const series = new Map(categories.map(key => [key, 0]));
    array.forEach(value => series.set(value, series.get(value) + 1));
    return series;
  };

  const getChartTextColor = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? '#fff'
      : '#000';
  };

  const series = useMemo(() => makeSeries(data, categories), [data, categories]);

  return (
    <section className="p-2 md:p-4">
      <h2 className="text-3xl text-center dark:text-white font-semibold">{name}</h2>
      <div className="flex flex-col sm:flex-row gap-3 ">
        <PieChart data={series} getChartTextColor={getChartTextColor} name={name} />
        <BarChart data={series} getChartTextColor={getChartTextColor} name={name} categories={categories} />
      </div>
    </section>
  );
};

ChartsSection.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  categories: PropTypes.array,
};

export default ChartsSection;
