import React, { useState } from "react";
import { ChromePicker } from "react-color";
import "../styles/customColorPicker.css"

interface CustomColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  
  const predefinedColors = ["#ff6600", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#000000"];

  return (
    <div className="color-picker-container">
      <div
        className="color-display"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker(!showPicker)}
      ></div>
      {showPicker && (
        <div className="color-picker-popup">
          <ChromePicker
            color={color}
            onChange={(updatedColor) => onChange(updatedColor.hex)}
            disableAlpha
          />
          <div className="predefined-colors">
            {predefinedColors.map((col) => (
              <div
                key={col}
                className="color-option"
                style={{ backgroundColor: col }}
                onClick={() => onChange(col)}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomColorPicker;
