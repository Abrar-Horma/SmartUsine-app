import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"
import Papa from "papaparse"
import { Colors } from "../constants/Colors"

interface MachineData {
    TWF: string
    HDF: string
    PWF: string
    OSF: string
    RNF: string
}

const FailureTypePieChart: React.FC = () => {
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

    const getFailureCounts = () => {
        const counts = {
            TWF: 0,
            HDF: 0,
            PWF: 0,
            OSF: 0,
            RNF: 0,
        }

        data.forEach((item) => {
            if (item.TWF === "1") counts.TWF++
            if (item.HDF === "1") counts.HDF++
            if (item.PWF === "1") counts.PWF++
            if (item.OSF === "1") counts.OSF++
            if (item.RNF === "1") counts.RNF++
        })

        return counts
    }

    const failureCounts = getFailureCounts()

    const chartData = [
        { name: "TWF", population: failureCounts.TWF, color: "#FF5733", legendFontColor: "#FFFFFF", legendFontSize: 12 },
        { name: "HDF", population: failureCounts.HDF, color: "#33FF57", legendFontColor: "#FFFFFF", legendFontSize: 12 },
        { name: "PWF", population: failureCounts.PWF, color: "#3357FF", legendFontColor: "#FFFFFF", legendFontSize: 12 },
        { name: "OSF", population: failureCounts.OSF, color: "#FF33F1", legendFontColor: "#FFFFFF", legendFontSize: 12 },
        { name: "RNF", population: failureCounts.RNF, color: "#F1FF33", legendFontColor: "#FFFFFF", legendFontSize: 12 },
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Failure Type Distribution</Text>
            {data.length > 0 ? (
                <PieChart
                    data={chartData}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: Colors.background,
                        backgroundGradientFrom: Colors.background,
                        backgroundGradientTo: Colors.background,
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
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
    loadingText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: "center",
    },
})

export default FailureTypePieChart

