import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native"
import { Colors } from "../constants/Colors"
import MachineDetails from "../components/MachineDetails"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

interface AreaInfo {
    id: number
    name: string
    type: "workspace" | "meeting" | "restroom" | "utility" | "office"
    description: string
    machines: MachineData[]
    floor: number
}

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
    area: string
    floor: string
}

const areas: AreaInfo[] = [
    {
        id: 1,
        name: "Main Production Floor",
        type: "workspace",
        description: "Large open area with primary production machinery",
        machines: [],
        floor: 1,
    },
    {
        id: 2,
        name: "Quality Control Lab",
        type: "workspace",
        description: "Specialized area for product testing and quality assurance",
        machines: [],
        floor: 1,
    },
    {
        id: 3,
        name: "Conference Room A",
        type: "meeting",
        description: "Large meeting room for team gatherings and client presentations",
        machines: [],
        floor: 2,
    },
    {
        id: 4,
        name: "Executive Offices",
        type: "office",
        description: "Private offices for company executives",
        machines: [],
        floor: 2,
    },
    {
        id: 5,
        name: "Break Room",
        type: "utility",
        description: "Communal area for employee breaks and meals",
        machines: [],
        floor: 1,
    },
    {
        id: 6,
        name: "Maintenance Workshop",
        type: "utility",
        description: "Area for machine repairs and maintenance",
        machines: [],
        floor: 1,
    },
    {
        id: 7,
        name: "Restrooms",
        type: "restroom",
        description: "Employee restrooms",
        machines: [],
        floor: 1,
    },
    {
        id: 8,
        name: "R&D Lab",
        type: "workspace",
        description: "Research and development laboratory",
        machines: [],
        floor: 2,
    },
]

export default function FactoryMapScreen() {
    const [selectedArea, setSelectedArea] = useState<AreaInfo | null>(null)
    const [mapAreas, setMapAreas] = useState<AreaInfo[]>(areas)
    const [currentFloor, setCurrentFloor] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchMachineData()
    }, [])

    const fetchMachineData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:8080/machines")
            const jsonData: MachineData[] = await response.json()
            const updatedAreas = areas.map((area) => {
                const areaMachines = jsonData.filter(
                    (machine) => machine.area === area.id.toString() && machine.floor === area.floor.toString(),
                )
                return { ...area, machines: areaMachines }
            })
            setMapAreas(updatedAreas)
        } catch (error) {
            console.error("Error fetching machine data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.summaryContainer}>
                    <View style={styles.floorSummary}>
                        <Text style={styles.floorSummaryText}>
                            Floor 1: {mapAreas.reduce((sum, area) => (area.floor === 1 ? sum + area.machines.length : sum), 0)}{" "}
                            machines
                        </Text>
                        <View style={styles.failureFlag}>
                            <Ionicons name="flag" size={24} color="#FF3B30" />
                            <Text style={styles.failureCount}>
                                {mapAreas.reduce(
                                    (sum, area) =>
                                        area.floor === 1 ? sum + area.machines.filter((m) => m.machineFailure === "1").length : sum,
                                    0,
                                )}{" "}
                                failures
                            </Text>
                        </View>
                    </View>

                    <View style={styles.floorSummary}>
                        <Text style={styles.floorSummaryText}>
                            Floor 2: {mapAreas.reduce((sum, area) => (area.floor === 2 ? sum + area.machines.length : sum), 0)}{" "}
                            machines
                        </Text>
                        <View style={styles.failureFlag}>
                            <Ionicons name="flag" size={24} color="#FF3B30" />
                            <Text style={styles.failureCount}>
                                {mapAreas.reduce(
                                    (sum, area) =>
                                        area.floor === 2 ? sum + area.machines.filter((m) => m.machineFailure === "1").length : sum,
                                    0,
                                )}{" "}
                                failures
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.floorButtons}>
                    <TouchableOpacity
                        style={[styles.floorButton, currentFloor === 1 ? styles.activeFloorButton : styles.inactiveFloorButton]}
                        onPress={() => setCurrentFloor(1)}
                    >
                        <Text style={styles.floorButtonText}>Floor 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.floorButton, currentFloor === 2 ? styles.activeFloorButton : styles.inactiveFloorButton]}
                        onPress={() => setCurrentFloor(2)}
                    >
                        <Text style={styles.floorButtonText}>Floor 2</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mapContainer}>
                    <View style={styles.floorPlan}>
                        {mapAreas
                            .filter((area) => area.floor === currentFloor)
                            .map((area) => (
                                <TouchableOpacity
                                    key={area.id}
                                    style={[styles.areaCard, { backgroundColor: getAreaColor(area.type) }]}
                                    onPress={() => setSelectedArea(area)}
                                >
                                    <Text style={styles.areaTitle}>{area.name}</Text>
                                    <Text style={styles.machineCount}>{area.machines.length} machines</Text>
                                    {area.machines.filter((m) => m.machineFailure === "1").length > 0 && (
                                        <View style={styles.areaFailureFlag}>
                                            <Ionicons name="flag" size={16} color="#FF3B30" />
                                            <Text style={styles.areaFailureCount}>
                                                {area.machines.filter((m) => m.machineFailure === "1").length}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>

                <Modal
                    visible={selectedArea !== null}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setSelectedArea(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedArea?.name}</Text>
                            <Text style={styles.modalDescription}>{selectedArea?.description}</Text>
                            {selectedArea && (
                                <MachineDetails machines={selectedArea.machines} onClose={() => setSelectedArea(null)} />
                            )}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}

function getAreaColor(type: string): string {
    switch (type) {
        case "workspace":
            return "#4CAF50"
        case "meeting":
            return Colors.primary
        case "office":
            return "#9C27B0"
        case "utility":
            return "#FF9800"
        case "restroom":
            return "#607D8B"
        default:
            return Colors.gray[400]
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.black,
        padding: 16,
    },
    summaryContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    floorSummary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    floorSummaryText: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.black,
    },
    failureFlag: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    failureCount: {
        fontSize: 20,
        color: "#FF3B30",
        fontWeight: "500",
    },
    floorButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginVertical: 16,
    },
    floorButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    activeFloorButton: {
        backgroundColor: Colors.primary,
    },
    inactiveFloorButton: {
        backgroundColor: "#4CAF50",
    },
    floorButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    mapContainer: {
        padding: 16,
    },
    floorPlan: {
        backgroundColor: "#2A2A2A",
        padding: 16,
        borderRadius: 12,
        flexDirection: "column",
        gap: 16,
    },
    areaCard: {
        padding: 16,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    areaTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.white,
        marginBottom: 8,
    },
    machineCount: {
        fontSize: 14,
        color: Colors.white,
        opacity: 0.8,
    },
    areaFailureFlag: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
    },
    areaFailureCount: {
        fontSize: 14,
        color: "#FF3B30",
        fontWeight: "500",
    },
    modalContainer: {
        flex: 1,
        marginTop: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: Colors.warning,
        marginTop: 5,
        borderRadius: 12,
        padding: 5,
        width: "90%",
        height: "85%",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 16,
        color: Colors.white,
        opacity: 0.7,
        marginBottom: 16,
    },
})

