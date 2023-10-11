'use client'

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

export function ProButton({ }) {

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
                    <p className='font-medium text-2xl'>Go Pro and Support the App</p>
                    <p className="text-xl">Gain access to additional features, support the protocol, and collecting your very own EXECUTOR badges!</p>
                    <p>Pro features include:</p>
                </div>

                <div className="text-lg">
                    <p className="font-bold">- Custom themes, colors and more!</p>
                    <p>- Access to early beta builds!</p>
                    <p className="italic">- Priority support and feature requests!</p>
                    <p>- Access to private Discord channel(s)!</p>
                    <p>- The chance to say you supported a cool app!</p>
                </div>
                <div className="space-y-2">
                    <Button onClick={onClick}>Pro</Button>

                </div>
            </div>
        </Modal>

        <Button disabled={true} onClick={() => setShowModal(true)} icon={<i className='fas fa-trophy' />}>Pro</Button>
    </>
}
