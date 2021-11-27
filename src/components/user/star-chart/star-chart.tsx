import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mapToChartdata as mapToChartData } from "./star-chart-utils";
import { StarChartProps } from "./star-chart.types";
function StarChart(props: StarChartProps) {
  const { data, className } = props;

  return (
    <LineChart
      className={className}
      width={500}
      height={300}
      data={mapToChartData(data)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
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
