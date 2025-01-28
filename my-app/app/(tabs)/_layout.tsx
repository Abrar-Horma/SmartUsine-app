import { Tabs } from "expo-router"
import { Colors } from "../../constants/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                        borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: Colors.accent,
                    tabBarInactiveTintColor: Colors.black,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                    },
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.black,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="surveillance"
                    options={{
                        title: "Discover",
                        tabBarIcon: ({ color, size }) => <Ionicons name="eye-outline" size={size} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Account",
                        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                    }}
                />
            </Tabs>
        </SafeAreaView>
    )
}

