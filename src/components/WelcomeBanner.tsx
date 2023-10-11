import { useState } from "react";
import Button from "./Button";
import Portal from "./Portal";
import useLocalStorageState from "use-local-storage-state";

export default function WelcomeBanner() {

    const [show, setShow] = useLocalStorageState('executor-welcome-banner', {
        defaultValue: true
    })

    if (!show) return
    return <Portal>
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div className="bg-primary p-6 md:p-12 max-w-xl w-full space-y-6">
                <img className="w-64" src="/img/executor-logo.png" alt="" />

                <p className="text-justify">Executer is a 2-dimensional space to interact with Web3. With Executer, users can create customizable, shareable, and exportable dashboards with one or many contract interactions across one or many contracts.</p>

                <p className="text-justify">Executer helps power-users efficiently manage contract interactions, helps developers generate testing enviroments, simplifies sharing contract interactions with others, and various other use-cases.</p>

                <div className="flex">
                    <div className="flex-1" />
                    <Button onClick={() => setShow(false)}>Test the (Buggy!) Beta</Button></div>
            </div>
        </div>
    </Portal>
}