export const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-lightgray text-darkslate hover:bg-gray-300',
    outline: 'border-2 border-teal-500 text-teal-500 hover:bg-teal-50',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
