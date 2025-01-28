import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { Colors } from "../constants/Colors"

interface MachineTypeData {
    H: number
    L: number
    M: number
}

const MachineTypeDistribution: React.FC = () => {
    const data: MachineTypeData = {
        H: 1003,
        L: 6000,
        M: 2996,
    }

    const chartData = [
        {
            name: "High Capacity",
            population: data.H,
            color: "#FF9800",
            legendFontColor: Colors.white,
            legendFontSize: 12,
        },
        {
            name: "Low Capacity",
            population: data.L,
            color: "#4CAF50",
            legendFontColor: Colors.white,
            legendFontSize: 12,
        },
        {
            name: "Medium Capacity",
            population: data.M,
            color: "#2196F3",
            legendFontColor: Colors.white,
            legendFontSize: 12,
        },
    ]

    const totalMachines = data.H + data.L + data.M

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Machine Type Distribution</Text>
            <PieChart
                data={chartData}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: Colors.background,
                    backgroundGradientFrom: Colors.background,
                    backgroundGradientTo: Colors.background,
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForLabels: {
                        fontSize: 10,
                    },
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"-20"}
                center={[10, 5]}
                absolute
            />
            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Total Machines: {totalMachines}</Text>
                <Text style={styles.statsText}>High Capacity: {((data.H / totalMachines) * 100).toFixed(1)}%</Text>
                <Text style={styles.statsText}>Medium Capacity: {((data.M / totalMachines) * 100).toFixed(1)}%</Text>
                <Text style={styles.statsText}>Low Capacity: {((data.L / totalMachines) * 100).toFixed(1)}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 20,
        textAlign: "center",
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

export default MachineTypeDistribution

