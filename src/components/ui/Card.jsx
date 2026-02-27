export const Card = ({ children, className = '', glass = false }) => {
  const glassStyles = glass
    ? 'bg-white/70 backdrop-blur-md border border-white/20'
    : 'bg-white';

  return (
    <div className={`${glassStyles} rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
