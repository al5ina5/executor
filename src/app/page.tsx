'use client'

import AppArea from '@/components/AppArea';

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/Topbar';
import WelcomeBanner from '@/components/WelcomeBanner';
import { AppContext } from '@/context/AppContext';
import useApp from '@/hooks/useApp';



export default function Home() {
    const app = useApp()
    return (
        <>
            <AppContext.Provider value={app}>
                <div className='h-full'>

                    <WelcomeBanner />
                    <Sidebar />
                    <TopBar />
                    <AppArea />
                </div>
            </AppContext.Provider>
        </>
    )
}