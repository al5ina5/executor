// import { useToast } from "@/components/Toast"
import { useState } from "react"

export default function useStatusHandler() {

    // const { toast } = useToast()

    const [status, setStatus] = useState<'idle' | 'loading' | 'complete' | 'error'>('idle')
    const [message, setMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const updateStatus = (status: 'idle' | 'loading' | 'complete' | 'error', message: string | null, details?: string) => {
        setStatus(status)
        setMessage(message)
        setErrorMessage(details || null)
        // if (status !== 'idle')
        //     return toast({
        //         title: status.toUpperCase(),
        //         subtitle: message,
        //         status
        //     })
    }

    return { status, message, errorMessage, updateStatus }
}