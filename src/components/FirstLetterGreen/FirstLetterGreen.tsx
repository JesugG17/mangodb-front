import React from 'react';

export const FirstLetterGreen: React.FC<FirstLetterGreenProps> = ({
  label,
  style,
  firstLetterStyle,
}) => {
  const firstLetter = label.charAt(0);
  const restOfWord = label.slice(1);

  return (
    <span style={{ fontFamily: 'sans-serif', color: '#3b3b3b', ...style }}>
      <span style={{ color: '#98a75f', ...firstLetterStyle }}>{firstLetter}</span>
      {restOfWord}
    </span>
  );
};

interface FirstLetterGreenProps {
  label: string;
  style?: React.CSSProperties;
  firstLetterStyle?: React.CSSProperties;
}
