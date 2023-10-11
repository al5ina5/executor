'use client'

import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { smartStringify } from "@/utils/utils";
import { AppContext } from "@/context/AppContext";
import Button from "./Button";
import Input from "./Input";
import useApp from "@/hooks/useApp";
export function GeneratorButton({
}) {


    const { addWindow, gridSize, minHeight, minWidth } = useContext(AppContext)

    const [showModal, setShowModal] = useState<'import' | 'export' | false>(false)
    const [contractAddressInput, setContractAddressInput] = useState()
    const [abiInput, setAbiInput] = useState()


    const onClick = () => {
        setShowModal(false)
        const abi = JSON.parse(abiInput)
        abi.map((abiFunction, index) => {
            const id = Date.now() + index
            const x = minWidth + (gridSize * index) * 2
            const y = ((gridSize * index))
            const height = minHeight
            const width = minWidth
            setTimeout(() => addWindow({
                id,
                x,
                y,
                height: 'auto',
                width,
                abi: abiInput,
                contractAddress: contractAddressInput,
                functionName: abiFunction.name
            }), 100)
            return abiFunction
        })
    }

    return <>
        <Modal visible={showModal} onClose={() => setShowModal(false)}>
            <div className='space-y-6'>
                <div className="space-y-2">
                    <p className='font-medium text-lg'>Generate</p>
                    <p>Paste an ABI below to create windows for every function in that ABI.</p>
                </div>
                <div className="space-y-2">
                    <Input title="Contract Address" value={contractAddressInput} onChange={e => setContractAddressInput(e.target.value)} />
                    <Input title="ABI" value={abiInput} onChange={e => setAbiInput(e.target.value)} />
                    <Button onClick={onClick}>Generate</Button>
                    {/* <textarea value={input} onChange={e => setInput(e.target.value)} className='bg-secondary border border-primary  text-sm font-mono rounded-none p-2 w-full h-40' /> */}
                </div>
            </div>
        </Modal>

        <Button onClick={() => setShowModal(true)} icon={<i className='fas fa-boxes-stacked' />}>Generate</Button>
    </>
}
