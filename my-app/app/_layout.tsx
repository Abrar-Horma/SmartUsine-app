import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Colors } from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

function BackButton() {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
    )
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="alerts"
                    options={{
                        presentation: "modal",
                        title:"Alert",
                        headerLeft: () => <BackButton />,
                        headerStyle: { backgroundColor: Colors.primary },
                        headerTintColor: Colors.black,
                    }}
                />
                <Stack.Screen
                    name="factoryMap"
                    options={{
                        presentation: "modal",
                        title:"Factory MAP",
                        headerLeft: () => <BackButton />,
                        headerStyle: { backgroundColor: Colors.primary },
                        headerTintColor: Colors.black,
                    }}
                />
                <Stack.Screen
                    name="machineStatus"
                    options={{
                        presentation: "modal",
                        title:"Machines Status Analysis",
                        headerLeft: () => <BackButton />,
                        headerStyle: { backgroundColor: Colors.primary },
                        headerTintColor: Colors.black,
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}

