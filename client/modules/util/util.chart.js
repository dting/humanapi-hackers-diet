import { scaleTime } from 'd3-scale';
import { timeDay } from 'd3-time';
import moment from 'moment';

/** Fill in gaps in time series data (https://github.com/recharts/recharts/issues/252) */
const filledData = function filledData(data, ticks) {
  const dataMap = new Map(data.map(i => [i.time, i]));
  return ticks.map(item => dataMap.get(item) || { time: item });
};

const getTicks = function getTicks(data) {
  if (!data || !data.length) { return []; }

  const domain = [new Date(data[0].time), new Date(data[data.length - 1].time)];
  const scale = scaleTime().domain(domain).range([0, 1]);
  const ticks = scale.ticks(timeDay, 1);

  return ticks.map(entry => +entry);
};

export const spanGaps = function spanGaps(weights) {
  const ticks = getTicks(weights);
  return { ticks, data: filledData(weights, ticks) };
};

export const formatters = {
  axisDate(time) {
    return moment(time).format('MMM DD');
  },
  tooltipDate(time) {
    return moment(time).format('MMM DD, YYYY');
  },
  weight(unit) {
    return weight => `${weight.toFixed(1)} ${unit}`;
  },
};
