import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import Papa from "papaparse"
import { Colors } from "../constants/Colors"

interface MachineData {
    UDI: string
    "Air temperature [K]": string
    "Process temperature [K]": string
}

const TemperatureComparisonGraph: React.FC = () => {
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

    const chartData = {
        labels: data.slice(0, 10).map((_, index) => `M${index + 1}`),
        datasets: [
            {
                data: data.slice(0, 10).map((item) => Number.parseFloat(item["Air temperature [K]"])),
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2,
            },
            {
                data: data.slice(0, 10).map((item) => Number.parseFloat(item["Process temperature [K]"])),
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2,
            },
        ],
        legend: ["Air Temp", "Process Temp"],
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temperature Comparison</Text>
            {data.length > 0 ? (
                <LineChart
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
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: Colors.primary,
                        },
                    }}
                    bezier
                    style={styles.chart}
                />
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
    loadingText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: "center",
    },
})

export default TemperatureComparisonGraph

