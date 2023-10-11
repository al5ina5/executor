import { AppContext } from '@/context/AppContext'
import classNames from 'class-names'
import { useContext } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useLocalStorageState('executer_sidebar', {
        defaultValue: false
    })

    const { windows, setCurrentWindowId, removeWindow, minWidth } = useContext(AppContext)

    return <div className={classNames('fixed top-0 left-0 z-40 space-y-6', showSidebar && 'bg-primary border-r border-primary h-full', showSidebar ? 'pointer-events-auto' : 'pointer-events-none')} style={{ width: `${minWidth + 1}px` }}>

        <button onClick={() => setShowSidebar(_ => !_)} className='p-2 pointer-events-auto'><i className={classNames('fas fa-bars', showSidebar && 'transform rotate-90')} /></button>

        {showSidebar &&
            <div className='overflow-auto h-full'>
                {windows.map((window, index) => <button onClick={() => setCurrentWindowId(window.id)} key={index} className='space-y-1 p-2 group hover text-left hover:bg-secondary w-full border-b border-primary pointer-events-auto'>
                    <div className='flex items-center'>
                        <p className='flex-1'>{window.functionName || 'Unknown Function'}</p>
                        <button onClick={() => removeWindow(window.id)}><i className='fas fa-times opacity-50 group-hover:opacity-100'></i></button>
                    </div>
                    <p className='font-mono text-xs whitespace-nowrap truncate'>at {window.contractAddress || 'unknown Address'}</p>
                </button>)}
            </div>
        }
    </div>
}