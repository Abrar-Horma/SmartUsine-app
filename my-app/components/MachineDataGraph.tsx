import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import { Colors } from "../constants/Colors"

interface MachineStatistics {
    totalMachines: number
    averageAirTemperature: number
    averageProcessTemperature: number
    failureCounts: {
        TWF: number
        HDF: number
        PWF: number
        OSF: number
        RNF: number
    }
    maxRotationalSpeed: number
    minTorque: number
    failurePercentage: number
}

const MachineDataGraph: React.FC = () => {
    const data: MachineStatistics = {
        totalMachines: 10000,
        averageAirTemperature: 300.15,
        averageProcessTemperature: 310.25,
        failureCounts: {
            TWF: 50,
            HDF: 120,
            PWF: 35,
            OSF: 200,
            RNF: 500,
        },
        maxRotationalSpeed: 1500.0,
        minTorque: 0.25,
        failurePercentage: 12.5,
    }

    const failureData = {
        labels: Object.keys(data.failureCounts),
        datasets: [
            {
                data: Object.values(data.failureCounts),
            },
        ],
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Machine Statistics</Text>
            <View style={styles.statsGrid}>
                <View style={styles.statsCard}>
                    <Text style={styles.statsLabel}>Total Machines</Text>
                    <Text style={styles.statsValue}>{data.totalMachines}</Text>
                </View>
                <View style={styles.statsCard}>
                    <Text style={styles.statsLabel}>Avg Air Temp</Text>
                    <Text style={styles.statsValue}>{data.averageAirTemperature.toFixed(2)}°</Text>
                </View>
                <View style={styles.statsCard}>
                    <Text style={styles.statsLabel}>Avg Process Temp</Text>
                    <Text style={styles.statsValue}>{data.averageProcessTemperature.toFixed(2)}°</Text>
                </View>
            </View>
            <View style={styles.statsGrid}>
                <View style={styles.statsCard}>
                    <Text style={styles.statsLabel}>Max Rotational Speed</Text>
                    <Text style={styles.statsValue}>{data.maxRotationalSpeed.toFixed(1)} RPM</Text>
                </View>
                <View style={styles.statsCard}>
                    <Text style={styles.statsLabel}>Min Torque</Text>
                    <Text style={styles.statsValue}>{data.minTorque.toFixed(2)} Nm</Text>
                </View>
                <View style={styles.statsCard}>
                    <Text style={styles.statsLabel}>Failure Rate</Text>
                    <Text style={styles.statsValue}>{data.failurePercentage.toFixed(1)}%</Text>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Failure Distribution</Text>
                <BarChart
                    data={failureData}
                    width={Dimensions.get("window").width - 78}
                    height={225}
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: 5,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.accent,
        marginBottom: 20,
        textAlign: "center",
    },
    statsGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statsCard: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
        width: "31%",
    },
    statsLabel: {
        color: Colors.white,
        fontSize: 12,
        marginBottom: 5,
        textAlign: "center",
    },
    statsValue: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    chartContainer: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
    },
    chartTitle: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
})

export default MachineDataGraph

