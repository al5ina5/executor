import useMousePosition from "@/hooks/useMousePosition"
import { createContext, useContext, useEffect, useState } from "react"
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
        const x = event.pageX;
        const y = event.pageY;
        setMouseDownClick({ x, y })
    }

    function roundToGridSize(number: number) {
        return Math.round(number / gridSize) * gridSize;
    }

    const onMouseUp = (event) => {
        if (mouseDownId !== 'layout') return console.warn(`#${mouseDownId} was clicked instead of #layout.`)
        let mouseX = event.pageX;
        let mouseY = event.pageY;

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

    // const [canvasSize, setCanvasSize] = useState({})

    // useEffect(() => {
    //     const farthestX = Math.max(...windows.map(window => window.x + window.width))
    //     const farthestY = Math.max(...windows.map(window => window.y + window.height))
    //     const farthestItemDimensions = {
    //         width: farthestX > window.innerWidth ? farthestX : window.innerWidth,
    //         height: farthestY > window.innerHeight ? farthestY : window.innerHeight,
    //     }
    //     setCanvasSize(current => ({
    //         width: current.width < farthestItemDimensions.width ? farthestItemDimensions.width : current.width,
    //         height: current.height < farthestItemDimensions.height ? farthestItemDimensions.height : current.height
    //     }))
    // }, [windows])

    return <div id="layout" className='h-full w-full overflow-auto hide-scrollbar' onMouseUp={onMouseUp} onMouseDown={onMouseDown}>

        {mouseDownId === 'layout' && <div className='fixed border border-accent bg-opacity-20' style={{
            ...calculateDragBoxPosition()
        }}></div>}

        <div className="fixed inset-0 w-full pointer-events-none select-none flex flex-col items-center justify-center space-y-6">
            <img className="w-64 opacity-50" src="/img/executor-logo.png" alt="" />
            <p className="opacity-50">Click or drag anywhere to get started.</p>
        </div>

        {windows.map((window, index) => (
            <WindowContext.Provider key={window.id} value={{ window, windows, setWindows, setCurrentWindowId, currentWindowId, minWidth, minHeight, index, gridSize, roundToGridSize, removeWindow, duplicateWindow }}>
                <Window />
            </WindowContext.Provider>
        ))}
    </div>
}