import React from 'react';
import InputField from '../components/InputField';

import '../App.css';

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="test"
          id="test"
          value=""
          onChange={handleChange}
        />
        <span className="checkmark"></span>
        All
      </label>
      <InputField
        handleChange={handleChange}
        value="london"
        title="London"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="India"
        title="India"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="UAE"
        title="UAE"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="USA"
        title="USA"
        name="test"
      />
    </div>
  );
};

export default Location;
