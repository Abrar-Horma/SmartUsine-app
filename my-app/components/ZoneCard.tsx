import React from "react"
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

interface ZoneCardProps {
    name: string
    image: string | null
}

export default function ZoneCard({ name, image }: ZoneCardProps) {
    return (
        <TouchableOpacity style={styles.zoneCard}>
            {image ? <Image source={{ uri: image }} style={styles.zoneImage} /> : <View style={styles.placeholderImage} />}
            <Text style={styles.zoneName}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    zoneCard: {
        width: "48%",
        aspectRatio: 1,
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
    },
    zoneImage: {
        width: "100%",
        height: "100%",
    },
    placeholderImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#333",
    },
    zoneName: {
        position: "absolute",
        bottom: 10,
        left: 10,
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
})

