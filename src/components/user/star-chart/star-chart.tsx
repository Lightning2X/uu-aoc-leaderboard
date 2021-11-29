import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMediaQueryContext } from "shared/utilities/useMediaQuery";
import { mapToChartdata as mapToChartData } from "./star-chart-utils";
import { StarChartProps } from "./star-chart.types";
function StarChart(props: StarChartProps) {
  const { data, className } = props;
  const { mobile } = useMediaQueryContext();

  const DESKTOP_WIDTH = 750;
  const DESKTOP_HEIGHT = 400;

  const getSize = (size: number) => {
    if (mobile) {
      return size / 2;
    }
    return size;
  };
  return (
    <LineChart
      className={className}
      width={getSize(DESKTOP_WIDTH)}
      height={getSize(DESKTOP_HEIGHT)}
      data={mapToChartData(data)}
      margin={{
        top: 15,
        right: 10,
        left: 10,
        bottom: 15,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis name="minutes" />
      <Tooltip />
      <Legend />
      <Line
        connectNulls
        type="monotone"
        name="First Star"
        dataKey="star1"
        stroke="#C0C0C0"
        activeDot={{ r: 8 }}
      />
      <Line
        connectNulls
        type="monotone"
        name="Second Star"
        dataKey="star2"
        stroke="#FFD700"
      />
    </LineChart>
  );
}

export default StarChart;
