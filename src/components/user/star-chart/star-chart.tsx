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
import { ChartData, Domain, StarChartProps } from "./star-chart.types";
function StarChart(props: StarChartProps) {
  const { data, className } = props;
  const { mobile } = useMediaQueryContext();

  const DESKTOP_WIDTH = 900;
  const DESKTOP_HEIGHT = 600;

  const getSize = (size: number) => {
    if (mobile) {
      return size / 3;
    }
    return size;
  };

  const chartData = mapToChartData(data);
  const getDomain = (chartData: ChartData[]) => {
    if (chartData.length < 1) {
      return {
        maxY: 1,
        minY: 0,
      } as Domain;
    }
    const sortedMin = chartData.sort(
      (a, b) => Number(a.star1) - Number(b.star1)
    );
    const sortedMax = chartData.sort((a, b) =>
      b.star2
        ? Number(b.star2) - Number(a.star2)
        : Number(b.star1) - Number(a.star1)
    );

    return {
      minY: Number(sortedMin[0].star1),
      maxY: Number(sortedMax[0].star2 ?? sortedMax[0].star1),
    } as Domain;
  };
  const domain = getDomain(chartData);

  return (
    <LineChart
      className={className}
      width={getSize(DESKTOP_WIDTH)}
      height={getSize(DESKTOP_HEIGHT)}
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis name="minutes" domain={[domain.minY, domain.maxY]} />
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
