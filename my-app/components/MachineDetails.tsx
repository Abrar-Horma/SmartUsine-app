import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

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
    floor: string
    area: string
}

interface MachineDetailsProps {
    machines: MachineData[]
    onClose: () => void
}

const { width } = Dimensions.get("window")
const cardWidth = width * 0.85
const ITEMS_PER_PAGE = 5

const MachineDetails: React.FC<MachineDetailsProps> = ({ machines, onClose }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const renderMachineStatus = (status: string) => {
        const color = status === "0" ? Colors.accent : "red"
        return (
            <View style={[styles.statusIndicator, { backgroundColor: color }]}>
                <Ionicons name={status === "0" ? "checkmark-circle" : "alert-circle"} size={24} color={Colors.white} />
            </View>
        )
    }

    const renderMachineDetails = (machine: MachineData) => (
        <View style={styles.machineDetails}>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Floor:</Text>
                <Text style={styles.detailValue}>{machine.floor}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Area:</Text>
                <Text style={styles.detailValue}>{machine.area}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Air temperature:</Text>
                <Text style={styles.detailValue}>{machine.airTemperature || "N/A"} K</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Process temperature:</Text>
                <Text style={styles.detailValue}>{machine.processTemperature || "N/A"} K</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rotational speed:</Text>
                <Text style={styles.detailValue}>{machine.rotationalSpeed || "N/A"} rpm</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Torque:</Text>
                <Text style={styles.detailValue}>{machine.torque || "N/A"} Nm</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tool wear:</Text>
                <Text style={styles.detailValue}>{machine.toolWear || "N/A"} min</Text>
            </View>
            <View style={styles.failureTypes}>
                <FailureIndicator label="TWF" value={machine.twf} />
                <FailureIndicator label="HDF" value={machine.hdf} />
                <FailureIndicator label="PWF" value={machine.pwf} />
                <FailureIndicator label="OSF" value={machine.osf} />
                <FailureIndicator label="RNF" value={machine.rnf} />
            </View>
        </View>
    )

    const renderMachineItem = ({ item }: { item: MachineData }) => (
        <View style={styles.machineCard}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.machineId}>Product ID: {item.productId || "N/A"}</Text>
                    <Text style={styles.machineType}>{item.type || "Unknown"}</Text>
                </View>
                {renderMachineStatus(item.machineFailure || "0")}
            </View>
            {renderMachineDetails(item)}
        </View>
    )

    const paginatedMachines = machines.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    const totalPages = Math.ceil(machines.length / ITEMS_PER_PAGE)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Machines Details</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                    <Ionicons name="close" size={24} color={Colors.black} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Machines in this area</Text>
            <FlatList
                data={paginatedMachines}
                renderItem={renderMachineItem}
                keyExtractor={(item) => item.productId}
                contentContainerStyle={styles.scrollContent}
            />
            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                    onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                >
                    <Text style={styles.paginationButtonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.paginationText}>
                    Page {currentPage} of {totalPages}
                </Text>
                <TouchableOpacity
                    style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                    onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                >
                    <Text style={styles.paginationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const FailureIndicator: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={styles.failureIndicator}>
        <Text style={styles.failureLabel}>{label}</Text>
        <View style={[styles.failureDot, { backgroundColor: value === "0" ? Colors.accent : "red" }]} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 20,
        borderRadius: 20,
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 20,
        textAlign: "center",
    },
    scrollContent: {
        paddingHorizontal: width * 0.006,
    },
    machineCard: {
        width: cardWidth*0.9,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 10,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    machineId: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.white,
    },
    machineType: {
        fontSize: 16,
        color: Colors.white,
        opacity: 0.8,
    },
    productId: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 15,
    },
    statusIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    machineDetails: {
        backgroundColor: `${Colors.background}33`,
        borderRadius: 10,
        padding: 15,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: Colors.white,
        opacity: 0.7,
    },
    detailValue: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: "bold",
    },
    failureTypes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    failureIndicator: {
        alignItems: "center",
    },
    failureLabel: {
        fontSize: 12,
        color: Colors.white,
        marginBottom: 5,
    },
    failureDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 20,
    },
    paginationButton: {
        backgroundColor: Colors.accent,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    paginationButtonText: {
        color: Colors.white,
        fontWeight: "bold",
    },
    paginationText: {
        color: Colors.white,
        fontSize: 14,
    },
    disabledButton: {
        opacity: 0.5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray[200],
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.black,
    },
    closeIcon: {
        padding: 4,
    },
})

export default MachineDetails

