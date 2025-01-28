import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

interface AlertCardProps {
    machine: string
    severity: "HIGH" | "MEDIUM" | "LOW"
    message: string
    time: string
}

export default function AlertCard({ machine, severity, message, time }: AlertCardProps) {
    return (
        <View style={styles.alertCard}>
            <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(severity) }]} />
            <View style={styles.alertContent}>
                <View style={styles.alertHeader}>
                    <Text style={styles.machineName}>{machine}</Text>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(severity) }]}>
                        <Text style={styles.severityText}>{severity}</Text>
                    </View>
                </View>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={14} color={Colors.white} />
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
        </View>
    )
}

function getSeverityColor(severity: string) {
    switch (severity) {
        case "HIGH":
            return "#FF4444"
        case "MEDIUM":
            return Colors.accent
        case "LOW":
            return "#4CAF50"
        default:
            return "#999"
    }
}

const styles = StyleSheet.create({
    alertCard: {
        flexDirection: "row",
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
    },
    severityIndicator: {
        width: 8,
    },
    alertContent: {
        flex: 1,
        padding: 15,
    },
    alertHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    machineName: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.white,
    },
    severityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    severityText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: "bold",
    },
    message: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 5,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    time: {
        fontSize: 12,
        color: Colors.white,
        marginLeft: 4,
    },
})

