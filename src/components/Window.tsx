import { useContext, useEffect, useState } from "react"
import Draggable from "react-draggable"
import classNames from 'class-names'
import ContractCaller from "./ContractCaller"
import { WindowContext } from "@/context/WindowContext"

export default function Window() {
    const { window, setWindows, setCurrentWindowId, minWidth, minHeight, currentWindowId, index, gridSize, roundToGridSize, removeWindow, duplicateWindow } = useContext(WindowContext)
    const [showContent, setShowContent] = useState(true)


    const isWindowSelected = currentWindowId === window.id

    // HACKY WAY TO HIDE DRAG GHOSTING WTF GRRRRRRRRRRRRHHHHH!
    useEffect(() => {
        const dragStartListener = (event) => {
            var img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
            event.dataTransfer.setDragImage(img, 0, 0);
        };
        document.addEventListener("dragstart", dragStartListener);
        return () => {
            document.removeEventListener("dragstart", dragStartListener);
        };
    }, [])

    return <div
        onClick={e => {
            e.stopPropagation()
        }}
        onMouseDown={() => {
            setCurrentWindowId(window.id)
        }}
    >
        <Draggable
            bounds={{ top: 0, left: 0 }}
            handle=".handle"
            defaultPosition={{ x: window.x, y: window.y }}
            grid={[gridSize, gridSize]}
            scale={1}
            onDrag={(e, data) => {
                setWindows(windows => {
                    const findIndex = windows.findIndex(find => find.id === window.id)
                    const copy = [...windows]
                    copy[findIndex] = { ...windows[findIndex], x: data.x, y: data.y }
                    return copy
                })
            }}
        >
            <div style={{ height: showContent ? window.height + 1 : 'auto', width: window.width + 1, zIndex: isWindowSelected ? 39 : index }}
                className={classNames(isWindowSelected ? '' : '', 'fixed border border-primary  rounded-none overflow-hidden flex flex-col')}>
                <div className={"handle bg-primary p-2 flex items-center gap-2"}>
                    <div className='flex-1'>
                        <p className='font-medium text-sm whitespace-nowrap'>{window.functionName ? `${window.functionName}` : 'New Window'}</p>
                    </div>
                    <button onClick={() => setShowContent(_ => !_)} className={classNames(showContent ? 'opacity-50' : 'opacity-25', ' hover:opacity-100')}>
                        <i className='fas fa-minimize'></i></button>
                    <button onClick={() => duplicateWindow(window)} className='opacity-50 hover:opacity-100'>
                        <i className='fas fa-clone'></i></button>
                    <button onClick={() => removeWindow(window.id)} className='opacity-50 hover:opacity-100'>
                        <i className='fas fa-times'></i>
                    </button>
                </div>
                {showContent && <div className='w-full h-full bg-primary overflow-auto flex-1'>
                    <ContractCaller />
                </div>}
                {showContent && <button draggable onDrag={(e) => {
                    let newWidth = roundToGridSize(e.clientX - window.x)
                    let newHeight = roundToGridSize(e.clientY - window.y)
                    if (e.clientX == 0 && e.clientY == 0) return
                    if (newWidth < minWidth) newWidth = minWidth
                    if (newHeight < minHeight) newHeight = minHeight

                    setWindows(windows => {
                        const findIndex = windows.findIndex(find => find.id === window.id)
                        const copy = [...windows]
                        copy[findIndex] = { ...windows[findIndex], width: newWidth, height: newHeight }
                        // console.log(copy[findIndex])
                        console.log(e.clientX, e.clientY)
                        return copy
                    })
                }} className='fixed -bottom-2 -right-2 w-10 h-10 m-2 opacity-10 bg-[url("/img/resize-bottom-right.svg")]'>

                </button>}
            </div>
        </Draggable>
    </div >
}