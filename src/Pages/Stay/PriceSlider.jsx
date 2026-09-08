import React, { useState } from "react";
import "./PriceSlider.css";

const PriceSlider = ({ onChange }) => {
 const [sliderValues, setSliderValues] = useState({ min: 0, max: 10000 });

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...sliderValues, [name]: parseInt(value, 10) };
    setSliderValues(nextValues);
    onChange(nextValues);
  };

  const formatSliderValue = (value) => `₹${value.toLocaleString()}`;

  
  return (
    <div className="price-range-slider">
      <div
        className="range-bar"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="slider" style={{ marginBottom: "14%" }}>
          <p>Minimum Price</p>
          <input
            type="range"
            min={0}
            max={10000}
            step={250}
            name="min"
            value={sliderValues.min}
            onChange={handleSliderChange}
            className="slider-input"
          />
          <span className="slider-value">
            {formatSliderValue(sliderValues.min)}
          </span>
        </div>
        <div className="slider">
          <p>Maximum Price</p>
          <input
            type="range"
            min={sliderValues.min}
            max={10000}
            step={250}
            name="max"
            value={sliderValues.max}
            onChange={handleSliderChange}
            className="slider-input"
          />
          <span className="slider-value">
            {formatSliderValue(sliderValues.max)}
          </span>
        </div>
      </div>
      <p className="range-text">
        {formatSliderValue(sliderValues.min)} – {formatSliderValue(sliderValues.max)}
      </p>
    </div>
  );
};

export default PriceSlider;
