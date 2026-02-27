export const Radio = ({ name, value, checked, onChange, label, description, badge }) => {
  return (
    <label className="flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-teal"
      style={{ borderColor: checked ? '#56afb6' : '#e5e7eb' }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 w-5 h-5 text-teal focus:ring-teal"
      />
      <div className="ml-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-darkslate">{label}</span>
          {badge && (
            <span className="px-2 py-1 text-xs bg-teal text-white rounded-full">
              Secure financing
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-slategray mt-1">{description}</p>
        )}
      </div>
    </label>
  );
};
