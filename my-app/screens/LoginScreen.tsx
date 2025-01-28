import React from "react"
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native"
import { router } from "expo-router"
import LoginForm from "../components/LoginForm"
import { Colors } from "../constants/Colors"

export default function LoginScreen() {
    const handleLogin = () => {
        router.replace("/(tabs)/home")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/*<Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />*/}
                <Text style={styles.title}>Factory Monitor</Text>
                <Text style={styles.subtitle}>Log in to access your dashboard</Text>
                <LoginForm onLogin={handleLogin} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.gray[600],
        marginBottom: 40,
        textAlign: "center",
    },
})

