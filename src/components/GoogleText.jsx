import React from 'react';

const GOOGLE_COLORS_WORD = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
const GOOGLE_COLORS_CHAR = ['#4285F4', '#DB4437', '#F4B400', '#4285F4', '#0F9D58', '#DB4437'];

const GoogleText = ({ children, className = "", mode = "word" }) => {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  if (mode === "char") {
    return (
      <span className={`font-bold tracking-tight ${className}`}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ color: GOOGLE_COLORS_CHAR[index % GOOGLE_COLORS_CHAR.length] }}
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
          <span style={{ color: GOOGLE_COLORS_WORD[index % GOOGLE_COLORS_WORD.length] }}>
            {word}
          </span>
          {index < children.split(' ').length - 1 && ' '}
        </span>
      ))}
    </span>
  );
};

export default GoogleText;
