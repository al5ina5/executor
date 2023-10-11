import { smartStringify } from "@/utils/utils";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function useApp() {

    const gridSize = 40
    const minWidth = gridSize * 9
    const minHeight = gridSize * 7

    const [windows, setWindows] = useState<any>([])
    const [currentWindowId, setCurrentWindowId] = useState()

    // Temp logs.
    useEffect(() => {
        console.log(`windows`, windows)
    }, [windows])

    // Load windows from storage.
    useEffect(() => {
        const storedWindows = JSON.parse(localStorage.getItem('executer_windows'))
        if (Array.isArray(storedWindows)) setWindows(storedWindows)
    }, [])

    // Store windows to storage.
    useEffect(() => {
        localStorage.setItem('executer_windows', smartStringify(windows))
    }, [windows])

    const addWindow = (windowData) => {
        let { id, x, y, height, width } = windowData
        if (!id) id = Date.now()
        setWindows(windows => [...windows, windowData]);
    };

    const removeWindow = (id) => {
        setWindows(windows => windows.filter(window => window.id !== id))
    }

    const duplicateWindow = (window) => {
        const id = Date.now()
        let newX = window.x + gridSize
        let newY = window.y + gridSize

        console.log(`newX newY`, newX, newY)

        const checkPosition = () => {
            const positionIsTaken = windows.find(item => item.x === newX && item.y === newY)
            console.log(`positionIsTaken`, positionIsTaken)
            if (positionIsTaken) {
                newX = newX + gridSize
                newY = newY + gridSize
                checkPosition()
            }
        }
        checkPosition()

        addWindow({ ...window, x: newX, y: newY, id })
        setCurrentWindowId(id)
    }

    return { windows, setWindows, addWindow, currentWindowId, setCurrentWindowId, removeWindow, duplicateWindow, gridSize, minWidth, minHeight }
}