import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"
import { Colors } from "../constants/Colors"
import { fetchAllMachines } from "../services/machineService"

interface MachineData {
    productId: string
    type: string
    airTemperature: string
    processTemperature: string
    rotationalSpeed: string
    torque: string
    toolWear: string
    machineFailure: string
    udi: string | null
    twf: string
    hdf: string
    pwf: string
    osf: string
    rnf: string
}

const RotationalSpeedHistogram: React.FC = () => {
    const [machineAverages, setMachineAverages] = useState<{ machine: string; avgSpeed: number }[]>([])
    const [data, setData] = useState<MachineData[]>([])
    const [totalRows, setTotalRows] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    const calculateMachineAverages = useCallback((dataSet: MachineData[]) => {
        try {
            const machineGroups = new Map<string, { total: number; count: number }>()

            dataSet.forEach((curr) => {
                if (!curr.productId || !curr.rotationalSpeed) {
                    return
                }

                const speed = Number.parseFloat(curr.rotationalSpeed)
                if (isNaN(speed)) {
                    return
                }

                if (!machineGroups.has(curr.productId)) {
                    machineGroups.set(curr.productId, { total: speed, count: 1 })
                } else {
                    const machine = machineGroups.get(curr.productId)!
                    machine.total += speed
                    machine.count += 1
                }
            })

            const averages = Array.from(machineGroups.entries())
                .map(([machine, data]) => ({
                    machine,
                    avgSpeed: Math.round(data.total / data.count),
                }))
                .filter((item) => !isNaN(item.avgSpeed))
                .sort((a, b) => a.avgSpeed - b.avgSpeed)

            setMachineAverages(averages)
            setError(null)
        } catch (error) {
            console.error("Error calculating averages:", error)
            setError("Failed to process machine data")
            setMachineAverages([])
        }
    }, [])

    const fetchData = useCallback(async () => {
        try {
            const machineData = await fetchAllMachines()
            setData(machineData)
            setTotalRows(machineData.length)
            calculateMachineAverages(machineData)
            setError(null)
        } catch (error) {
            console.error("Error fetching machine data:", error)
            setError("Failed to fetch machine data")
        }
    }, [calculateMachineAverages])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        console.log("Total Rows updated:", totalRows)
    }, [totalRows])

    const getAverageFactoryRPM = useCallback(() => {
        if (!machineAverages || machineAverages.length === 0) return 0
        const total = machineAverages.reduce((acc, curr) => acc + curr.avgSpeed, 0)
        return Math.round(total / machineAverages.length)
    }, [machineAverages])

    const chartData = {
        labels: machineAverages.map((item) => item.machine.slice(-5)),
        datasets: [
            {
                data: machineAverages.length > 0 ? machineAverages.map((item) => item.avgSpeed) : [0],
            },
        ],
    }

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Machine RPM Analysis</Text>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <>
                    <View style={styles.statsContainer}>
                        <View style={styles.statsRow}>
                            <Text style={styles.statsText}>Total Records: {totalRows}</Text>
                            <Text style={styles.statsText}>Total Machines: {machineAverages.length}</Text>
                        </View>
                        <View style={styles.statsRow}>
                            <Text style={styles.statsText}>Average Factory RPM: {getAverageFactoryRPM()} RPM</Text>
                        </View>
                    </View>
                    {machineAverages.length > 0 ? (
                        <BarChart
                            data={chartData}
                            width={Dimensions.get("window").width - 40}
                            height={220}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: Colors.background,
                                backgroundGradientFrom: Colors.background,
                                backgroundGradientTo: Colors.background,
                                decimalPlaces: 0,
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
                    ) : (
                        <Text style={styles.noDataText}>No valid machine data available</Text>
                    )}
                    <Text style={styles.description}>
                        This graph shows the average rotational speed (RPM) for each machine. Each bar represents a unique machine,
                        labeled by its Product ID, and its height shows the average RPM for that machine.
                    </Text>
                </>
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
    statsContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: `${Colors.primary}33`,
        borderRadius: 8,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    statsText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold",
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
    errorText: {
        color: "#ff4444",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 20,
    },
    noDataText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: "center",
        marginVertical: 20,
    },
})

export default RotationalSpeedHistogram

