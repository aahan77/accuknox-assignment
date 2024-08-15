// src/components/Widget.js
import React from 'react';

const Widget = ({ data, onRemove }) => {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium">{data.title}</h3>
      <p>{data.text}</p>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-500"
      >
        &times;
      </button>
    </div>
  );
};

export default Widget;
