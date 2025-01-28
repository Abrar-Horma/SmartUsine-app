import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import Papa from "papaparse"
import { Colors } from "../constants/Colors"

interface MachineData {
    "Rotational speed [rpm]": string
    "Tool wear [min]": string
}

const ToolWearScatterPlot: React.FC = () => {
    const [data, setData] = useState<MachineData[]>([])

    useEffect(() => {
        fetchCSVData()
    }, [])

    const fetchCSVData = async () => {
        try {
            const response = await fetch("/data/machine_data.csv")
            const csvText = await response.text()
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    setData(results.data as MachineData[])
                },
                error: (error: any) => {
                    console.error("Error parsing CSV:", error)
                },
            })
        } catch (error) {
            console.error("Error fetching CSV:", error)
        }
    }

    const sampleData = data.filter((_, index) => index % 50 === 0)

    const chartData = {
        labels: sampleData.map((item) => item["Rotational speed [rpm]"]),
        datasets: [
            {
                data: sampleData.map((item) => Number.parseFloat(item["Tool wear [min]"])),
                color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tool Wear vs. Rotational Speed</Text>
            {data.length > 0 ? (
                <>
                    <LineChart
                        data={chartData}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: Colors.background,
                            backgroundGradientFrom: Colors.background,
                            backgroundGradientTo: Colors.background,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "3",
                                strokeWidth: "1",
                                stroke: Colors.primary,
                            },
                        }}
                        bezier={false}
                        style={styles.chart}
                    />
                    <Text style={styles.description}>
                        This scatter plot shows the relationship between tool wear and rotational speed. Each point represents a
                        machine, with rotational speed on the x-axis and tool wear on the y-axis.
                    </Text>
                </>
            ) : (
                <Text style={styles.loadingText}>Loading data...</Text>
            )}
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
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 10,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    description: {
        color: Colors.white,
        fontSize: 14,
        marginTop: 10,
    },
    loadingText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: "center",
    },
})

export default ToolWearScatterPlot

