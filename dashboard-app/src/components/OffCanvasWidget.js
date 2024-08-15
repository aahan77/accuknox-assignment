import React, { useState } from 'react';

const OffCanvasWidget = ({ onSave, onClose }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleSave = () => {
    if (widgetName && widgetText) {
      const newWidget = {
        id: widgetName.toLowerCase().replace(/\s+/g, ''),
        title: widgetName,
        text: widgetText,
        type: 'text'
      };
      onSave(newWidget);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex">
      <div className="bg-white p-6 w-96 h-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Widget</h2>
        <div className="mb-4">
          <label className="block mb-2">Widget Name</label>
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Widget Text</label>
          <textarea
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffCanvasWidget;
