import React from "react"
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

interface MenuItem {
    title: string
    description: string
    route: string
    icon: string
    iconBgColor: string
}

export default function HomeScreen() {
    const { width } = useWindowDimensions()
    const isSmallScreen = width < 768

    const menuItems: MenuItem[] = [
        {
            title: "Factory Map",
            description: "Visualize machine locations",
            route: "/factoryMap",
            icon: "map-outline",
            iconBgColor: Colors.accent,
        },
        {
            title: "Surveillance",
            description: "Monitor factory in real time",
            route: "/(tabs)/surveillance",
            icon: "videocam-outline",
            iconBgColor: Colors.success,
        },
        {
            title: "Machine Status",
            description: "Check machine health and lifespan",
            route: "/machineStatus",
            icon: "pulse-outline",
            iconBgColor: Colors.info,
        },
        {
            title: "Alerts",
            description: "Receive critical alerts",
            route: "/alerts",
            icon: "warning-outline",
            iconBgColor: Colors.error,
        },
    ]

    const renderMenuItem = (item: MenuItem, index: number) => (
        <TouchableOpacity
            key={index}
            style={[styles.card, isSmallScreen && styles.cardFullWidth]}
            onPress={() => router.push(item.route)}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
                <Ionicons name={item.icon as any} size={24} color={Colors.white} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Factory Monitor</Text>
                <View style={[styles.grid, isSmallScreen && styles.gridSmall]}>{menuItems.map(renderMenuItem)}</View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.white,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.black,
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 16,
    },
    gridSmall: {
        flexDirection: "column",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        width: "48%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardFullWidth: {
        width: "100%",
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.gray[600],
    },
})

