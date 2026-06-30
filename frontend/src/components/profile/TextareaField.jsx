export default function TextareaField({
    label,
    value,
    onChange,
    placeholder = "",
    rows = 4,
}) {
    return (
        <div className="space-y-2">
            <label
                className="
                    block
                    text-sm
                    font-medium
                    text-zinc-700
                    dark:text-zinc-300
                "
            >
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-zinc-300
                    dark:border-zinc-700
                    bg-white
                    dark:bg-zinc-800
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    text-zinc-900
                    dark:text-white
                    placeholder:text-zinc-400
                "
            />
        </div>
    );
}