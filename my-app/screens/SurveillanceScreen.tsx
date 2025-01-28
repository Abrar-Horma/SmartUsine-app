import React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Colors } from "../constants/Colors"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const zones = [
    {
        id: 1,
        name: "Assembly Line",
    },
    {
        id: 2,
        name: "Packaging Area",
    },
    {
        id: 3,
        name: "Quality Control",
    },
    {
        id: 4,
        name: "Warehouse",
    },
]

export default function SurveillanceScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.subtitle}>Select a zone to monitor:</Text>
                <View style={styles.grid}>
                    {zones.map((zone) => (
                        <TouchableOpacity key={zone.id} style={styles.zoneCard} onPress={() => router.push(`/zone/${zone.id}`)}>
                            <Image source={require("../assets/images/camera.png")} style={styles.zoneImage} resizeMode="cover" />
                            <View style={styles.zoneBottom}>
                                <Text style={styles.zoneBottomText}>{zone.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.white,
        padding: 20,
        paddingTop: 10,
    },
    subtitle: {
        fontSize: 20,
        color: Colors.black,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    zoneCard: {
        width: "48%",
        aspectRatio: 1,
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    zoneImage: {
        width: "60%",
        height: "60%",
        objectFit: "contain",
        alignSelf: "center",
        marginTop: 10,
    },
    zoneBottom: {
        height: "40%",
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    zoneBottomText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
})

