import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import { Colors } from "../constants/Colors"

interface TorqueSpeedData {
    [key: string]: number
}

const TorqueSpeedRelationship: React.FC = () => {
    const data: TorqueSpeedData = {
        "2501-3000": 10.575,
        "0-500": 0.0,
        "501-1000": 0.0,
        "2001-2500": 17.496907216494847,
        "1501-2000": 33.48613575407468,
        "1001-1500": 47.45964271213967,
    }

    const sortedEntries = Object.entries(data).sort((a, b) => {
        const aStart = Number.parseInt(a[0].split("-")[0])
        const bStart = Number.parseInt(b[0].split("-")[0])
        return aStart - bStart
    })

    const chartData = {
        labels: sortedEntries.map(([label]) => label),
        datasets: [
            {
                data: sortedEntries.map(([, value]) => value),
            },
        ],
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Torque vs Rotational Speed</Text>
            <BarChart
                data={chartData}
                width={Dimensions.get("window").width - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix=" Nm"
                chartConfig={{
                    backgroundColor: Colors.background,
                    backgroundGradientFrom: Colors.background,
                    backgroundGradientTo: Colors.background,
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
                <Text style={styles.statsTitle}>Average Torque by Speed Range (RPM)</Text>
                {sortedEntries.map(([range, torque]) => (
                    <Text key={range} style={styles.statsText}>
                        {range} RPM: {torque.toFixed(2)} Nm
                    </Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 10,
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
        padding: 15,
        borderRadius: 8,
    },
    statsTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    statsText: {
        color: Colors.white,
        fontSize: 14,
        marginBottom: 5,
    },
})

export default TorqueSpeedRelationship

