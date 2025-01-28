import React from "react"
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native"
import { Colors } from "../constants/Colors"

interface MenuCardProps {
    title: string
    description: string
    onPress: () => void
    isSmall?: boolean
    icon: string
}

export default function MenuCard({ title, description, onPress, isSmall, icon }: MenuCardProps) {
    return (
        <TouchableOpacity style={[styles.card, isSmall && styles.cardSmall]} onPress={onPress}>
            <Image source={{ uri: icon }} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.accent,
        width: "48%",
        aspectRatio: 1.5,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    cardSmall: {
        width: "100%",
        aspectRatio: 3,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 5,
        borderRadius: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    cardTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center",
    },
    cardDescription: {
        color: Colors.white,
        fontSize: 12,
        textAlign: "center",
    },
})

