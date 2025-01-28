import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, Switch } from "react-native"
import { Colors } from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

interface LoginFormProps {
    onLogin: () => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    return (
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color={Colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.gray[400]}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={24} color={Colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={Colors.gray[400]}
                />
            </View>
            <View style={styles.rememberContainer}>
                <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    trackColor={{ false: Colors.gray[300], true: Colors.primary }}
                    thumbColor={rememberMe ? Colors.white : Colors.gray[100]}
                />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        maxWidth: 400,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: Colors.gray[300],
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        padding: Platform.OS === "web" ? 12 : 15,
        color: Colors.black,
        fontSize: 16,
    },
    rememberContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    rememberText: {
        marginLeft: 8,
        color: Colors.gray[600],
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 15,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    forgotButton: {
        alignItems: "center",
    },
    forgotButtonText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "500",
    },
})

