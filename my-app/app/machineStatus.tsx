import React from "react"
import { StyleSheet, ScrollView, View, Text } from "react-native"
import { Colors } from "../constants/Colors"
import MachineDataGraph from "@/components/MachineDataGraph";
import MachineTypeDistribution from "@/components/MachineTypeDistribution";
import AirTemperatureDistribution from "@/components/AirTemperatureDistribution";

export default function MachineStatusScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.graphContainer}>
                <MachineDataGraph />
            </View>
            <View style={styles.graphContainer}>
                <MachineTypeDistribution />
            </View>
            <View style={styles.graphContainer}>
                <AirTemperatureDistribution />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.white,
        marginBottom: 20,
    },
    graphContainer: {
        marginBottom: 20,
    },
})

