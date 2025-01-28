// Define the MachineData interface based on the JSON structure
interface MachineData {
    productId: string
    type: string
    airTemperature: string
    processTemperature: string
    rotationalSpeed: string
    torque: string
    toolWear: string
    machineFailure: string
    udi: string | null
    twf: string
    hdf: string
    pwf: string
    osf: string
    rnf: string
}

// Define the base URL for the API
const API_BASE_URL = "http://localhost:8080"

// Function to fetch all machine data
export async function fetchAllMachines(): Promise<MachineData[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/machines`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as MachineData[]
    } catch (error) {
        console.error("Error fetching machine data:", error)
        throw error
    }
}

// Function to fetch a single machine by UDI
export async function fetchMachineByUDI(udi: string): Promise<MachineData> {
    try {
        const response = await fetch(`${API_BASE_URL}/machines/${udi}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as MachineData
    } catch (error) {
        console.error(`Error fetching machine with UDI ${udi}:`, error)
        throw error
    }
}

// Function to fetch machines by type
export async function fetchMachinesByType(type: string): Promise<MachineData[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/machines?type=${encodeURIComponent(type)}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as MachineData[]
    } catch (error) {
        console.error(`Error fetching machines of type ${type}:`, error)
        throw error
    }
}

// Function to fetch machines with failures
export async function fetchMachinesWithFailures(): Promise<MachineData[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/machines?machineFailure=1`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as MachineData[]
    } catch (error) {
        console.error("Error fetching machines with failures:", error)
        throw error
    }
}

