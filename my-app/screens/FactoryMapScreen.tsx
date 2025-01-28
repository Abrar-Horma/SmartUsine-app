import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from "react-native"
import { Colors } from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

interface AreaInfo {
    id: number
    name: string
    type: "workspace" | "meeting" | "restroom" | "utility" | "office"
    description: string
    machines?: { id: number; name: string; status: "Operational" | "Maintenance" | "Offline" }[]
}

const areas: AreaInfo[] = [
    {
        id: 1,
        name: "Large Conference Room",
        type: "meeting",
        description: "Main conference room with U-shaped table arrangement",
        machines: [
            { id: 101, name: "Projector LC1", status: "Operational" },
            { id: 102, name: "Video Conference System", status: "Operational" },
        ],
    },
    {
        id: 2,
        name: "Open Workspace A",
        type: "workspace",
        description: "Open office area with workstations",
        machines: [
            { id: 201, name: "Printer WS-A1", status: "Operational" },
            { id: 202, name: "Scanner WS-A1", status: "Maintenance" },
        ],
    },
    {
        id: 3,
        name: "Meeting Room 1",
        type: "meeting",
        description: "Small meeting room with round table",
        machines: [{ id: 301, name: "Display M1", status: "Operational" }],
    },
]

export default function FactoryMapScreen() {
    const [selectedArea, setSelectedArea] = useState<AreaInfo | null>(null)

    const renderMachineStatus = (status: "Operational" | "Maintenance" | "Offline") => {
        switch (status) {
            case "Operational":
                return <Ionicons name="checkmark-circle" size={24} color="green" />
            case "Maintenance":
                return <Ionicons name="construct" size={24} color="orange" />
            case "Offline":
                return <Ionicons name="alert-circle" size={24} color="red" />
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Floor Plan</Text>
            <ScrollView horizontal style={styles.mapContainer} contentContainerStyle={styles.mapContent}>
                <View style={styles.floorPlan}>
                    {/* Left Wing */}
                    <View style={styles.leftWing}>
                        {/* Restrooms Section */}
                        <View style={styles.restroomSection}>
                            <View style={styles.restroom}>
                                <Text style={styles.smallText}>Restroom</Text>
                            </View>
                            <View style={styles.restroom}>
                                <Text style={styles.smallText}>Restroom</Text>
                            </View>
                        </View>

                        {/* Conference Room */}
                        <TouchableOpacity style={styles.largeConference} onPress={() => setSelectedArea(areas[0])}>
                            <View style={styles.conferenceTable}>
                                <Text style={styles.areaText}>Conference Room</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Center Section */}
                    <View style={styles.centerSection}>
                        {/* Elevator Bank */}
                        <View style={styles.elevatorBank}>
                            <View style={styles.elevator} />
                            <View style={styles.elevator} />
                            <View style={styles.elevator} />
                            <View style={styles.elevator} />
                        </View>

                        {/* Open Office Area */}
                        <TouchableOpacity style={styles.openOffice} onPress={() => setSelectedArea(areas[1])}>
                            <View style={styles.workstationGrid}>
                                {Array(16)
                                    .fill(0)
                                    .map((_, i) => (
                                        <View key={i} style={styles.workstation} />
                                    ))}
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Right Wing */}
                    <View style={styles.rightWing}>
                        {/* Meeting Rooms */}
                        <TouchableOpacity style={styles.meetingRoom} onPress={() => setSelectedArea(areas[2])}>
                            <View style={styles.roundTable} />
                            <Text style={styles.smallText}>Meeting</Text>
                        </TouchableOpacity>
                        <View style={styles.smallOffices}>
                            {Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <View key={i} style={styles.smallOffice}>
                                        <View style={styles.desk} />
                                    </View>
                                ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

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
                        {selectedArea?.machines && (
                            <View style={styles.machinesContainer}>
                                <Text style={styles.machinesTitle}>Equipment Status:</Text>
                                {selectedArea.machines.map((machine) => (
                                    <View key={machine.id} style={styles.machineItem}>
                                        <Text style={styles.machineName}>{machine.name}</Text>
                                        {renderMachineStatus(machine.status)}
                                    </View>
                                ))}
                            </View>
                        )}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedArea(null)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.white,
        padding: 20,
    },
    mapContainer: {
        maxHeight: 600,
    },
    mapContent: {
        padding: 20,
    },
    floorPlan: {
        width: 900,
        height: 600,
        backgroundColor: "#2A2A2A",
        flexDirection: "row",
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    leftWing: {
        width: 250,
        borderRightWidth: 1,
        borderColor: "#444",
    },
    restroomSection: {
        height: 120,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    restroom: {
        width: "45%",
        height: "100%",
        borderWidth: 1,
        borderColor: "#4CAF50",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    largeConference: {
        flex: 1,
        padding: 10,
    },
    conferenceTable: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    centerSection: {
        flex: 1,
        paddingHorizontal: 20,
    },
    elevatorBank: {
        height: 80,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    elevator: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#2196F3",
        borderRadius: 5,
    },
    openOffice: {
        flex: 1,
        marginTop: 20,
    },
    workstationGrid: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    workstation: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.accent,
        borderRadius: 5,
    },
    rightWing: {
        width: 250,
        borderLeftWidth: 1,
        borderColor: "#444",
        padding: 10,
    },
    meetingRoom: {
        height: 120,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    roundTable: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    smallOffices: {
        flex: 1,
        gap: 10,
    },
    smallOffice: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.accent,
        borderRadius: 5,
        padding: 10,
    },
    desk: {
        width: 40,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 3,
    },
    areaText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    smallText: {
        color: Colors.white,
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 20,
        width: "80%",
        maxHeight: "80%",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        color: Colors.white,
        marginBottom: 20,
    },
    machinesContainer: {
        marginTop: 10,
    },
    machinesTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 10,
    },
    machineItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    machineName: {
        color: Colors.white,
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: Colors.accent,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    closeButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
})

