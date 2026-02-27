export const Input = ({ label, type = 'text', placeholder, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-darkslate font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
        required={required}
      />
    </div>
  );
};
