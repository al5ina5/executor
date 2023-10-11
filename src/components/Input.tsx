export default function Input({ title, value, placeholder, onChange }) {
    return <div className="space-y-2">
        {title && <p className="text-sm font-medium">{title}</p>}
        <input className="w-full p-2 border border-primary  rounded-none" type="text" {...{ placeholder, value, onChange }} />
    </div>
}