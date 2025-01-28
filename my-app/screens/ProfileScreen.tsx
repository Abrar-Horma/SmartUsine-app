import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar} />
                    <Text style={styles.name}>Mlle Horma</Text>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Nom d'usine</Text>
                        <Text style={styles.infoValue}>BME</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>N° de client</Text>
                        <Text style={styles.infoValue}>17814263017</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Adresse d'usine</Text>
                        <Text style={styles.infoValue}>Montbéliard</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        color: Colors.black,
        padding: 20,
        backgroundColor: Colors.primary,
    },
    profileContainer: {
        padding: 20,
        alignItems: "center",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: "bold",
    },
    infoCard: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 20,
        width: "100%",
    },
    infoItem: {
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 14,
        color: Colors.white,
        textAlign: "center",
    },
    infoValue: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
})

