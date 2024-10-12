import initializeComponent from "./Initialize";
import { useState } from "react";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function LLineChart({data, backgroundColor, labels, prefix, suffix, precision, color, width, height})
{
    const [state, setState] = useState({data: data, setData: setData});  
  
    initializeComponent({props: arguments[0], state: state});

    function setData(data)
    {
      setState({data: data, setData: setData});
    }

    return (
      <LineChart
      data={{
        labels: labels,
        datasets: [
          {
            data: state.data
          }
        ]
      }}
      width={width} // from react-native
      height={height}
      yAxisLabel={prefix}
      yAxisSuffix={suffix}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: backgroundColor,
        backgroundGradientFrom: backgroundColor,
        backgroundGradientTo: backgroundColor,
        decimalPlaces: precision, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(${color}, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(${color}, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
    )
}