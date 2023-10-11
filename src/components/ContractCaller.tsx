import { ERC20ABI } from "@/data/abi";
import { useWeb3Wallet } from "@/hooks/useWallet";
import { useContext, useEffect, useState } from "react";
import Input from "./Input";
import useStatusHandler from "@/hooks/useStatusHandler";
import StatusMessage from "./StatusMessage";
import { smartStringify } from "@/utils/utils";
import { WindowContext } from "@/context/WindowContext";

export default function ContractCaller() {

    const { window, windows, setWindows } = useContext(WindowContext)
    const { connect, address, web3 } = useWeb3Wallet()

    const { status, message, errorMessage, updateStatus } = useStatusHandler()

    const [contractAddress, setContractAddress] = useState(window.contractAddress)
    const [abi, setAbi] = useState(window.abi)
    const [functionName, setFunctionName] = useState(window.functionName)
    const [functionArguments, setFunctionsArguments] = useState(window.functionArguments || [])
    const [privateKey, setPrivateKey] = useState(window.privateKey)
    const [results, setResults] = useState(window.results)

    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        setWindows(windows => {
            const findIndex = windows.findIndex(find => find.id === window.id)
            const copy = [...windows]
            copy[findIndex] = { ...windows[findIndex], contractAddress, abi, functionName, functionArguments, results }
            return copy
        })
    }, [contractAddress, abi, functionName, functionArguments, results])

    const functionAbi = abi && functionName && JSON.parse(abi) && JSON.parse(abi).find(func => func.name === functionName)

    const updateFunctionArguments = (index, content) => {
        setFunctionsArguments(args => {
            let copy = [...args]
            copy[index] = content
            return copy
        })
    }

    const doCall = async () => {
        try {
            updateStatus('loading', null)
            const contract = new web3.eth.Contract(JSON.parse(abi), contractAddress)
            let account;
            if (privateKey) account = web3.eth.accounts.privateKeyToAccount(privateKey);
            const functionCall = await contract.methods[functionName](...functionArguments.slice(0, functionAbi.inputs.length))[functionAbi.stateMutability === 'view' ? 'call' : 'send']({ from: privateKey ? account?.address : address })
            console.log(functionCall)
            setResults(functionCall)
            updateStatus('complete', null)
        } catch (error) {
            updateStatus('error', "Error!", error.message)
            console.error(error)
        }
    }

    return <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6">
            <Input
                title='Contract Address'
                placeholder="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                value={contractAddress}
                onChange={e => setContractAddress(e.target.value)} />
            <Input
                title='ABI'
                placeholder={smartStringify(ERC20ABI)}
                value={abi}
                onChange={e => setAbi(e.target.value)} />
        </div>
        <Input
            title='Function Name'
            placeholder={'balanceOf'}
            value={functionName}
            onChange={e => setFunctionName(e.target.value)} />

        <div className="flex">
            <div className="flex-1"></div>
            <button onClick={() => setShowMore(_ => !_)}>{showMore ? 'Less' : "More"} Options</button>
        </div>

        {showMore && <>
            <Input
                title='From (Private Key)'
                placeholder={'ccc60d5d840a16edf7e08de9b9fb8e0d5d074017b944a8d51e3db3327f66e19c'}
                value={privateKey}
                onChange={e => setPrivateKey(e.target.value)} />
        </>}

        {functionAbi && <div className="p-6 border border-primary rounded-none space-y-4">
            {functionAbi.inputs.map((input, index) => <Input key={index} value={functionArguments[index]} onChange={e => updateFunctionArguments(index, e.target.value)} title={`${input.name} (${input.type})`} />)}
            <div>
                <button onClick={doCall}>Submit</button>
            </div>
        </div>}

        <StatusMessage {...{ status, message, details: errorMessage }} />
        {results && <div className="bg-green-500 text-white p-2 rounded-none"><b>Results:</b> {results.toString()}</div>}
        {!functionAbi && abi && functionName && <div className="bg-red-500 text-white p-2 rounded-none text-sm"><b>Error:</b> That function cannot be found in the currently inputted ABI.</div>}
    </div>
}