import classNames from "classnames";
import { useState } from "react";

interface StatusMessageProps {
    status: 'idle' | 'loading' | 'complete' | 'error'
    message: string
    details: string

}

export default function StatusMessage({ status, message, details }: StatusMessageProps) {

    const [showDetails, setShowDetails] = useState(false)

    if (status === 'idle' || !message) return <></>
    return <div className={classNames(
        status === 'complete' && 'bg-green-500 text-white',
        status === 'error' && 'bg-red-500 text-white',
        status === 'loading' && 'bg-blue-500 text-white',
        'p-2 text-sm rounded-none space-y-2'
    )}>
        <p><b className="uppercase">{status}</b>: {message} {details && <button onClick={() => setShowDetails(_ => !_)} className="underline hover:no-underline">{showDetails ? "Less" : "More"}</button>}</p>

        {details && showDetails &&
            <div className="bg-white bg-opacity-20 rounded-none p-2 text-xs font-mono whitespace-pre relative">
                <button onClick={() => navigator.clipboard.writeText(details)} className="absolute bottom-2 right-2 bg-red-500 font-medium opacity-75 hover:opacity-100 p-1 rounded-none">Copy</button>
                <p className="overflow-auto hide-scrollbar">{details}</p>
            </div>
        }
    </div>
}