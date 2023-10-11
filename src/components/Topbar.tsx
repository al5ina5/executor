import { GeneratorButton } from "./GeneratorButton";
import { ImporterButtons } from "./ImporterButtons";
import { ProButton } from "./ProButton";
import { ResetButton } from "./ResetButton";

export default function TopBar() {
    return <div className='fixed top-0 right-0 p-2'>
        <div className='space-x-2'>
            <ProButton />
            <GeneratorButton />
            <ImporterButtons />
            <ResetButton />
        </div>
    </div>
}