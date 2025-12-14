import { useState, useEffect } from 'react';

const Converter = () => {
  const [hex, setHex] = useState('#');
  const [rgb, setRgb] = useState<string>('');
  const [error, setError] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const isValidHex = (hexValue: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6})$/;
    return hexRegex.test(hexValue);
  };

  const hexToRgb = (hexValue: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    if (!result) {
      return '';
    }
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    if (hex.length === 7) {
      if (isValidHex(hex)) {
        const rgbValue = hexToRgb(hex);
        setRgb(rgbValue);
        setError(false);
        setBackgroundColor(hex);
      } else {
        setError(true);
        setRgb('');
      }
    } else {
      setError(false);
      setRgb('');
    }
  }, [hex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 7 && (value.startsWith('#') || value === '')) {
      setHex(value || '#');
    }
  };

  return (
    <div className="converter-container" style={{ backgroundColor }}>
      <div className="converter">
        <input
          type="text"
          className="hex-input"
          value={hex}
          onChange={handleChange}
          placeholder="#"
          maxLength={7}
        />
        {error && hex.length === 7 && (
          <div className="error-message">Ошибка!</div>
        )}
        {!error && rgb && (
          <div className="rgb-output">{rgb}</div>
        )}
      </div>
    </div>
  );
};

export default Converter;
