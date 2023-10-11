
import { useState, useEffect } from 'react';
import Web3 from 'web3';

type Web3Wallet = {
    web3: Web3 | null;
    provider: any | null; // You can provide a more specific type for the provider
    address: string | null;
    shortAddress: string | null;
    chainId: string | null;
    chainName: string | null;
    connect: () => Promise<void>;
    disconnect: () => void;
};

export const useWeb3Wallet = (): Web3Wallet => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [provider, setProvider] = useState<any | null>(null); // Use a specific type for the provider
    const [address, setAddress] = useState<string | null>(null);
    const [chainId, setChainId] = useState<string | null>(null);
    const [chainName, setChainName] = useState<string | null>(null);

    const chainIdToName: { [key: string]: string } = {
        '1': 'Mainnet',
        '3': 'Ropsten',
        '4': 'Rinkeby',
        '5': 'Goerli',
        '42': 'Kovan',
    };

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);

            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                } else {
                    setAddress(null);
                }
            });

            window.ethereum.on('chainChanged', (chainIdHex: string) => {
                const chainIdDecimal = parseInt(chainIdHex, 16);
                setChainId(chainIdHex);
                setChainName(chainIdToName[chainIdDecimal] || 'Unknown');
            });

            setWeb3(web3Instance);
            setProvider(window.ethereum);

            if (window.ethereum.selectedAddress) {
                setAddress(window.ethereum.selectedAddress);
            }
        }
    }, []);

    const connect = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3?.eth.getAccounts();
            if (accounts && accounts.length > 0) {
                setAddress(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const disconnect = () => {
        window.ethereum.disconnect();
        setAddress(null);
        setChainId(null);
        setChainName(null);
    };

    return { web3, provider, address, shortAddress: address && `${address.slice(0, 6)}...${address.slice(-6)}`, chainId, chainName, connect, disconnect };
};
