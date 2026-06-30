 const InputField =({
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 py-2 border rounded-lg
        bg-white dark:bg-zinc-800/75
        text-gray-900 dark:text-white
        border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputField;