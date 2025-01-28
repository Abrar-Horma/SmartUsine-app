import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../styles/globalStyles"

export default function ErrorScreen() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>?</Text>
                </View>
                <Text style={styles.title}>Unmatched Route</Text>
                <Text style={styles.subtitle}>Page could not be found.</Text>
                <Text style={styles.path}>exp://192.168.8.155:8081/--/</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
                        <Text style={styles.linkText}>Go back</Text>
                    </TouchableOpacity>
                    <Text style={styles.dot}>•</Text>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("ACCUEIL" as never)}>
                        <Text style={styles.linkText}>Sitemap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    content: {
        alignItems: "center",
        maxWidth: 500,
    },
    iconContainer: {
        width: 100,
        height: 100,
        backgroundColor: "#2A2A2A",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    icon: {
        fontSize: 50,
        color: colors.text,
        opacity: 0.5,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: colors.text,
        opacity: 0.7,
        marginBottom: 20,
    },
    path: {
        fontSize: 14,
        color: colors.text,
        opacity: 0.5,
        marginBottom: 30,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
    },
    link: {
        padding: 10,
    },
    linkText: {
        fontSize: 16,
        color: "#3B82F6",
    },
    dot: {
        color: colors.text,
        opacity: 0.5,
        marginHorizontal: 10,
    },
})

