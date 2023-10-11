import useMousePosition from "@/hooks/useMousePosition"
import { createContext, useContext, useState } from "react"
import Window from "./Window"
import { AppContext } from "@/context/AppContext"
import { WindowContext } from "@/context/WindowContext"
import { smartStringify } from "@/utils/utils"


export default function AppArea() {

    const { windows, setWindows, addWindow, currentWindowId, setCurrentWindowId, removeWindow, duplicateWindow, gridSize, minWidth, minHeight } = useContext(AppContext)

    const [mouseDownClick, setMouseDownClick] = useState()
    const [mouseDownId, setMouseDownId] = useState()

    const { x, y } = useMousePosition()


    const calculateDragBoxPosition = () => {
        let width = x - mouseDownClick.x
        let height = y - mouseDownClick.y
        let top = mouseDownClick.y
        let left = mouseDownClick.x

        if (width < 0) left = left - Math.abs(width)
        if (height < 0) top = top - Math.abs(height)

        return {
            top,
            left,
            width: Math.abs(width),
            height: Math.abs(height)
        }
    }

    const onMouseDown = (event) => {
        setMouseDownId(event.target.id)
        const x = event.clientX;
        const y = event.clientY;
        setMouseDownClick({ x, y })
    }

    function roundToGridSize(number: number) {
        return Math.round(number / gridSize) * gridSize;
    }

    const onMouseUp = (event) => {
        if (mouseDownId !== 'layout') return console.warn(`#${mouseDownId} was clicked instead of #layout.`)
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        let startX = mouseDownClick.x
        let startY = mouseDownClick.y

        let width = mouseX - mouseDownClick.x
        let height = mouseY - mouseDownClick.y

        // handle small windows and small windows in reverse
        if (Math.abs(width) < minWidth) width = width < 0 ? -Math.abs(minWidth) : minWidth
        if (Math.abs(height) < minHeight) height = height < 0 ? -Math.abs(minHeight) : minHeight
        // handles window that open in reverse dirs
        if (width < 0) startX = startX - Math.abs(width)
        if (height < 0) startY = startY - Math.abs(height)

        const id = Date.now();
        addWindow({
            id,
            x: roundToGridSize(startX),
            y: roundToGridSize(startY),
            height: roundToGridSize(Math.abs(height)),
            width: roundToGridSize(Math.abs(width))
        })
        setCurrentWindowId(id)
        setMouseDownClick(null);
        setMouseDownId(null);
    }

    return <div id="layout" className='h-full w-full overflow-scroll' onMouseUp={onMouseUp} onMouseDown={onMouseDown}>

        {mouseDownId === 'layout' && <div className='fixed border border-lime-500 bg-lime-500 bg-opacity-20' style={{
            ...calculateDragBoxPosition()
        }}></div>}

        {!windows || !windows.length && <div className='fixed inset-0 w-full pointer-events-none flex items-center justify-center'>
            <p>Click and drag anywhere to get started.</p>
        </div>}


        {windows.map((window, index) => (
            <WindowContext.Provider key={window.id} value={{ window, windows, setWindows, setCurrentWindowId, currentWindowId, minWidth, minHeight, index, gridSize, roundToGridSize, removeWindow, duplicateWindow }}>
                <Window />
            </WindowContext.Provider>
        ))}
    </div>
}