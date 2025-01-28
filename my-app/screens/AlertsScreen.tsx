import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import { router } from "expo-router"

interface MachineAlert {
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
    area: string
    floor: string
}

interface Alert {
    machine: string
    severity: "HIGH" | "MEDIUM" | "LOW"
    message: string
    details: string
    time: string
    borderColor: string
}

const PAGE_SIZE = 10

export default function AlertsScreen() {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchMachineData()
    }, [])

    const fetchMachineData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:8080/machines")
            const machines: MachineAlert[] = await response.json()

            const filteredMachines = machines.filter(
                (machine) =>
                    (machine.type === "H" || machine.type === "M") &&
                    (machine.twf === "1" ||
                        machine.hdf === "1" ||
                        machine.pwf === "1" ||
                        machine.osf === "1" ||
                        machine.rnf === "1"),
            )

            const newAlerts: Alert[] = []

            filteredMachines.forEach((machine) => {
                // Check each failure type and create corresponding alert
                if (machine.twf === "1") {
                    newAlerts.push({
                        machine: `${machine.type} Machine ${machine.productId} (Floor ${machine.floor}, Area ${machine.area})`,
                        severity: "HIGH",
                        message: "Tool Wear Failure (TWF) Detected",
                        details: `Abnormal tool wear detected. Current wear: ${machine.toolWear} min, Speed: ${machine.rotationalSpeed} rpm`,
                        time: "2 minutes ago",
                        borderColor: "#FF4B4B",
                    })
                }

                if (machine.hdf === "1") {
                    newAlerts.push({
                        machine: `${machine.type} Machine ${machine.productId} (Floor ${machine.floor}, Area ${machine.area})`,
                        severity: "MEDIUM",
                        message: "Heat Dissipation Failure (HDF) Alert",
                        details: `Temperature critical: Air temp ${machine.airTemperature}K, Process temp ${machine.processTemperature}K`,
                        time: "2 minutes ago",
                        borderColor: "#FFB84B",
                    })
                }

                if (machine.pwf === "1") {
                    newAlerts.push({
                        machine: `${machine.type} Machine ${machine.productId} (Floor ${machine.floor}, Area ${machine.area})`,
                        severity: "HIGH",
                        message: "Power Failure (PWF) Warning",
                        details: `Emergency power issue detected. Torque: ${machine.torque}Nm at ${machine.rotationalSpeed} rpm`,
                        time: "2 minutes ago",
                        borderColor: "#FF4B4B",
                    })
                }

                if (machine.osf === "1") {
                    newAlerts.push({
                        machine: `${machine.type} Machine ${machine.productId} (Floor ${machine.floor}, Area ${machine.area})`,
                        severity: "MEDIUM",
                        message: "Overstrain Failure (OSF) Warning",
                        details: `Machine overstrain detected. Current torque: ${machine.torque}Nm exceeds normal range`,
                        time: "2 minutes ago",
                        borderColor: "#FFB84B",
                    })
                }

                if (machine.rnf === "1") {
                    newAlerts.push({
                        machine: `${machine.type} Machine ${machine.productId} (Floor ${machine.floor}, Area ${machine.area})`,
                        severity: "LOW",
                        message: "Random Failure (RNF) Notice",
                        details: "Unexpected behavior detected. Maintenance inspection required",
                        time: "2 minutes ago",
                        borderColor: "#4CAF50",
                    })
                }
            })

            // Sort alerts by severity (HIGH > MEDIUM > LOW)
            newAlerts.sort((a, b) => {
                const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 }
                return severityOrder[a.severity] - severityOrder[b.severity]
            })

            setAlerts(newAlerts)
            setHasMore(newAlerts.length > PAGE_SIZE)
        } catch (error) {
            console.error("Error fetching machine data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const loadMoreAlerts = () => {
        if (hasMore) {
            setPage(page + 1)
        }
    }

    const renderAlert = ({ item }: { item: Alert }) => (
        <View style={[styles.alertCard, { borderLeftColor: item.borderColor }]}>
            <View style={styles.alertContent}>
                <Text style={styles.machineName}>{item.machine}</Text>
                <View style={[styles.severityBadge, { backgroundColor: item.borderColor }]}>
                    <Text style={styles.severityText}>{item.severity}</Text>
                </View>
            </View>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.details}>{item.details}</Text>
            <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={16} color={Colors.white} />
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>

            {isLoading ? (
                <Text style={styles.loadingText}>Loading alerts...</Text>
            ) : alerts.length > 0 ? (
                <FlatList style={styles.containerFlatList}
                    data={alerts.slice(0, page * PAGE_SIZE)}
                    renderItem={renderAlert}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMoreAlerts}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        hasMore ? (
                            <Text style={styles.loadingMoreText}>Loading more alerts...</Text>
                        ) : (
                            <Text style={styles.noMoreAlertsText}>No more alerts</Text>
                        )
                    }
                />
            ) : (
                <Text style={styles.noAlertsText}>No alerts at this time.</Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    containerFlatList: {
       marginTop:10
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: Colors.primary,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.black,
    },
    alertCard: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        borderLeftWidth: 8,
        marginHorizontal: 15,
    },
    alertContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    machineName: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.white,
        flex: 1,
        marginRight: 10,
    },
    severityBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    severityText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold",
    },
    message: {
        fontSize: 18,
        color: Colors.white,
        marginBottom: 8,
        fontWeight: "600",
    },
    details: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 12,
        opacity: 0.9,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    timeText: {
        color: Colors.white,
        fontSize: 14,
    },
    loadingText: {
        fontSize: 18,
        color: Colors.white,
        textAlign: "center",
        marginTop: 20,
    },
    noAlertsText: {
        fontSize: 18,
        color: Colors.white,
        textAlign: "center",
        marginTop: 20,
    },
    loadingMoreText: {
        fontSize: 16,
        color: Colors.white,
        textAlign: "center",
        marginVertical: 10,
    },
    noMoreAlertsText: {
        fontSize: 16,
        color: Colors.white,
        textAlign: "center",
        marginVertical: 10,
    },
})

