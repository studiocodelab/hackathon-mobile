import { CartesianChart, Line, useChartPressState, Bar } from 'victory-native';
import { View } from 'react-native';
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import inter from "../fonts/OpenSans-Bold.ttf"


export default function BarChart({data, fromColor, toColor}) {
    const font = useFont(inter, 12);
  
    return (
      <View style={{width: "90%", height: "80%"}}>
      <CartesianChart
        data={data}
        xKey="label"
        yKeys={["data"]}
        domainPadding={{ left: 50, right: 50, top: 30 }}
        
        axisOptions={{
          font,
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            chartBounds={chartBounds}
            points={points.data}
            roundedCorners={{
              topLeft: 5,
              topRight: 5,
            }}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 400)}
              colors={[fromColor, toColor]}
            />
          </Bar>
        )}
      </CartesianChart>
      </View>
    )
  }