export const Select = ({ label, options, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-darkslate font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all bg-white"
        required={required}
      >
        <option value="">Select...</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
