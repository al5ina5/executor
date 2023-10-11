'use client'

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

export function ResetButton({ }) {

    const { setWindows } = useContext(AppContext)

    const [showModal, setShowModal] = useState<'import' | 'export' | false>(false)

    const onClick = () => {
        setShowModal(false)
        setWindows([])
        localStorage.clear()
    }

    return <>
        <Modal visible={showModal} onClose={() => setShowModal(false)}>
            <div className='space-y-6'>
                <div className="space-y-2">
                    <p className='font-medium text-lg'>Reset</p>
                    <p>Are you sure you want to reset? All your configurations and windows will be lost.</p>
                </div>
                <div className="space-y-2">
                    <Button onClick={onClick}>Reset</Button>
                </div>
            </div>
        </Modal>

        <Button onClick={() => setShowModal(true)} icon={<i className='fas fa-trash' />}>Reset</Button>
    </>
}
