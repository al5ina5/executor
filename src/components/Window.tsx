import { useContext, useEffect, useState } from "react"
import Draggable from "react-draggable"
import classNames from 'class-names'
import ContractCaller from "./ContractCaller"
import { WindowContext } from "@/context/WindowContext"
import { AppContext } from "@/context/AppContext"

export default function Window() {
    const { window: temporary, setWindows, setCurrentWindowId, minWidth, minHeight, currentWindowId, index, gridSize, roundToGridSize, removeWindow, duplicateWindow } = useContext(WindowContext)

    const { updateWindow } = useContext(AppContext)
    const [showContent, setShowContent] = useState(true)

    const isWindowSelected = currentWindowId === temporary.id

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


    const onDrag = (e, data) => {
        updateWindow({ id: temporary.id, x: data.x, y: data.y })
        // if (data.x + temporary.width > window.innerWidth) window.scrollTo({ left: window.innerWidth - (temporary.width / 2) })
        // if (data.y + temporary.height > window.innerHeight) window.scrollTo({ top: window.innerHeight - (temporary.height / 2) })
    }

    return <div
        onClick={e => {
            e.stopPropagation()
        }}
        onMouseDown={() => {
            setCurrentWindowId(temporary.id)
        }}
    >
        <Draggable
            bounds={{ top: 0, left: 0 }}
            handle=".handle"
            position={{ x: temporary.x, y: temporary.y }}
            grid={[gridSize, gridSize]}
            scale={1}
            onDrag={onDrag}
        >
            <div style={{ height: showContent ? temporary.height + 1 : 'auto', width: temporary.width + 1, zIndex: isWindowSelected ? 39 : index }}
                className={classNames(isWindowSelected ? '' : '', 'absolute border border-primary  rounded-none overflow-hidden flex flex-col select-none')}>
                <div className={"handle bg-primary p-2 flex items-center gap-2"}>
                    <div className='flex-1'>
                        <p className='font-medium text-sm whitespace-nowrap'>{temporary.functionName ? `${temporary.functionName}` : 'New Window'}</p>
                    </div>
                    <button onClick={() => setShowContent(_ => !_)} className={classNames(showContent ? 'opacity-50' : 'opacity-25', ' hover:opacity-100')}>
                        <i className='fas fa-minimize'></i></button>
                    <button onClick={() => duplicateWindow(temporary)} className='opacity-50 hover:opacity-100'>
                        <i className='fas fa-clone'></i></button>
                    <button onClick={() => removeWindow(temporary.id)} className='opacity-50 hover:opacity-100'>
                        <i className='fas fa-times'></i>
                    </button>
                </div>
                {showContent && <div className='w-full h-full bg-primary overflow-auto flex-1'>
                    <ContractCaller />
                </div>}
                {showContent && <button draggable onDrag={(e) => {
                    let newWidth = roundToGridSize(e.clientX - temporary.x)
                    let newHeight = roundToGridSize(e.clientY - temporary.y)
                    if (e.clientX == 0 && e.clientY == 0) return
                    if (newWidth < minWidth) newWidth = minWidth
                    if (newHeight < minHeight) newHeight = minHeight

                    updateWindow({ id: temporary.id, width: newWidth, height: newHeight })

                }} className='fixed -bottom-2 -right-2 w-10 h-10 m-2 opacity-10 bg-[url("/img/resize-bottom-right.svg")]'>

                </button>}
            </div>
        </Draggable>
    </div >
}