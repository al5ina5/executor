import { GeneratorButton } from "./GeneratorButton";
import { ImporterButtons } from "./ImporterButtons";

export default function TopBar() {
    return <div className='fixed top-0 right-0 p-2'>
        <div className='space-x-2'>
            <GeneratorButton />
            <ImporterButtons />
        </div>
    </div>
}