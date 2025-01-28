import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

export default function DashboardScreen({ navigation }: any) {
    const menuItems = [
        {
            title: "Factory Map",
            description: "Visualize machine locations",
            route: "FactoryMap",
        },
        {
            title: "Surveillance",
            description: "Monitor factory in real time",
            route: "Surveillance",
        },
        {
            title: "Machine Status",
            description: "Check machine health and lifespan",
            route: "Alerts",
        },
        {
            title: "Alerts",
            description: "Receive critical alerts",
            route: "Alerts",
        },
    ]

    return (
        <ScrollView style={styles.container}>
            <View style={styles.grid}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(item.route)}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C1B1F",
    },
    grid: {
        padding: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#FFA500",
        width: "48%",
        aspectRatio: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        justifyContent: "center",
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardDescription: {
        color: "#FFFFFF",
        fontSize: 14,
    },
})

