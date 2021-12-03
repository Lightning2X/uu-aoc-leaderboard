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
  chartData.sort((a, b) => a.day - b.day);

  const getDomain = (chartData: ChartData[]) => {
    if (chartData.length < 1) {
      return {
        maxY: 1,
        minY: 0,
      } as Domain;
    }

    let minY = Number.MAX_SAFE_INTEGER;
    let maxY = 0;
    for (let d of chartData) {
      let star1 = Number(d.star1);
      let star2 = d.star2 ? Number(d.star2) : star1;
      if (star1 < minY) {
        minY = star1;
      }

      if (star2 > maxY) {
        maxY = star2;
      }
    }

    return {
      minY: minY,
      maxY: maxY,
    } as Domain;
  };
  const domain = getDomain(chartData);
  console.log(domain);

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
