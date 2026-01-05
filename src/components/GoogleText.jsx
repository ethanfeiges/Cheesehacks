import React from 'react';

const GoogleText = ({ children, className = "", mode = "word" }) => {
  const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
  
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  if (mode === "char") {
    const extendedColors = ['#4285F4', '#DB4437', '#F4B400', '#4285F4', '#0F9D58', '#DB4437'];
    return (
      <span className={`font-bold tracking-tight ${className}`}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ color: extendedColors[index % extendedColors.length] }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  // Word mode (default)
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      {children.split(' ').map((word, index) => (
        <span key={index}>
          <span style={{ color: colors[index % colors.length] }}>
            {word}
          </span>
          {index < children.split(' ').length - 1 && ' '}
        </span>
      ))}
    </span>
  );
};

export default GoogleText;
