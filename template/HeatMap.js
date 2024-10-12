import initializeComponent from "./Initialize";
import { Dimensions } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function HeatMap({backgroundColor, opacity, data, endDate, days})
{
    initializeComponent({props: arguments[0]});
    return (
        <ContributionGraph
        values={data}
        endDate={endDate}
        numDays={days}
        width={Dimensions.get("screen").width * 0.95}
        height={220}
        chartConfig={{
            backgroundGradientFrom: backgroundColor,
            backgroundGradientFromOpacity: opacity === undefined ? 1 : opacity.from,
            backgroundGradientTo: backgroundColor,
            backgroundGradientToOpacity: opacity === undefined ? 1 : opacity.to,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
        />
    )
}