import React, { useState } from 'react';
import OffCanvasWidget from './OffCanvasWidget';
import Widget from './Widget';
import data from '../dashboard.json';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddWidget = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsOffCanvasOpen(true);
  };

  const handleSaveWidget = (newWidget) => {
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.name === selectedCategory) {
        return {
          ...category,
          widgets: [...category.widgets, newWidget]
        };
      }
      return category;
    });
    setDashboardData({ ...dashboardData, categories: updatedCategories });
    setIsOffCanvasOpen(false);
    saveDashboardData({ ...dashboardData, categories: updatedCategories });
  };

  const handleRemoveWidget = (categoryName, widgetId) => {
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });
    setDashboardData({ ...dashboardData, categories: updatedCategories });
    saveDashboardData({ ...dashboardData, categories: updatedCategories });
  };

  const saveDashboardData = (data) => {
    // Convert data to JSON and update the file (simulate saving)
    const updatedJson = JSON.stringify(data, null, 2);
    console.log('Updated JSON:', updatedJson);
  };

  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 mb-6 border rounded-lg w-full"
      />
      {filteredCategories.map((category) => (
        <div key={category.name} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 gap-6">
            {category.widgets.length > 0 ? (
              category.widgets.map((widget) => (
                <Widget
                  key={widget.id}
                  data={widget}
                  onRemove={() => handleRemoveWidget(category.name, widget.id)}
                />
              ))
            ) : (
              <p>No widgets match your search criteria.</p>
            )}
            <button
              onClick={() => handleAddWidget(category.name)}
              className="border-dashed border-2 p-4 rounded-lg text-center"
            >
              + Add Widget
            </button>
          </div>
        </div>
      ))}
      {isOffCanvasOpen && (
        <OffCanvasWidget
          onSave={handleSaveWidget}
          onClose={() => setIsOffCanvasOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
