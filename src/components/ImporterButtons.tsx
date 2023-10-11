'use client'

import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { smartStringify } from "@/utils/utils";
import { AppContext } from "@/context/AppContext";
import Button from "./Button";
export function ImporterButtons({
}) {

    const { windows, setWindows } = useContext(AppContext)

    const [showImporter, setShowImporter] = useState<'import' | 'export' | false>(false)
    const [importerInput, _setImporterInput] = useState()
    const isExport = showImporter === 'export'

    const setImporterInput = (value: string) => {
        try {
            _setImporterInput(value)
            setWindows(JSON.parse(value))
        } catch (error) {
            console.warn(error)
        }
    }

    return <>
        <Modal visible={showImporter} onClose={() => setShowImporter(false)}>
            <div className='space-y-6'>
                <div className="space-y-2">
                    <p className='font-medium text-lg'>{isExport ? 'Export' : 'Import'}</p>
                    <p>Click the textarea below to copy a snapshot of your configuration. This can be used to import or share your windows.</p>
                </div>
                <div>
                    <textarea value={isExport ? smartStringify(windows) : importerInput} onClick={isExport ? () => navigator.clipboard.writeText(smartStringify(windows)) : () => { }} onChange={e => setImporterInput(e.target.value)} className='bg-secondary border border-primary  text-sm font-mono rounded-none p-2 w-full h-40' readOnly={isExport} />
                </div>
            </div>
        </Modal>

        <Button onClick={() => setShowImporter('import')} icon={<i className='fas fa-file-import' />}>Import</Button>
        <Button onClick={() => setShowImporter('export')} icon={<i className='fas fa-file-export' />}>Export</Button>
    </>
}
