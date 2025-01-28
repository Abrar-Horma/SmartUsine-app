import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import { Colors } from "../constants/Colors"

interface AirTemperatureData {
    "351-400": number
    "401-450": number
    "251-300": number
    "200-250": number
    "301-350": number
}

const AirTemperatureDistribution: React.FC = () => {
    const data: AirTemperatureData = {
        "351-400": 0,
        "401-450": 0,
        "251-300": 4952,
        "200-250": 0,
        "301-350": 3229,
    }

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
            },
        ],
    }

    const totalMachines = Object.values(data).reduce((sum, value) => sum + value, 0)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Air Temperature Distribution</Text>
            <BarChart
                data={chartData}
                width={Dimensions.get("window").width - 60}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: Colors.background,
                    backgroundGradientFrom: Colors.background,
                    backgroundGradientTo: Colors.background,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(120, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(80, 0, 100, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    barPercentage: 0.8,
                    propsForLabels: {
                        fontSize: 10,
                        rotation: 45,
                    },
                }}
                style={styles.chart}
                showValuesOnTopOfBars={true}
                fromZero={true}
            />
            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Total Machines: {totalMachines}</Text>
                {Object.entries(data).map(([range, count]) => (
                    <Text key={range} style={styles.statsText}>
                        {range}K: {count} ({((count / totalMachines) * 100).toFixed(1)}%)
                    </Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 20,
        textAlign: "center",
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    statsContainer: {
        marginTop: 20,
        backgroundColor: Colors.primary,
        padding: 5,
        borderRadius: 8,
    },
    statsText: {
        color: Colors.white,
        fontSize: 14,
        marginBottom: 5,
    },
})

export default AirTemperatureDistribution

