import React, { useState } from "react";
import OffCanvasWidget from "./OffCanvasWidget";
import Widget from "./Widget";
import data from "../dashboard.json";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddWidget = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsOffCanvasOpen(true);
  };

  const handleSaveWidget = (newWidget) => {
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.name === selectedCategory) {
        return {
          ...category,
          widgets: [...category.widgets, newWidget],
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
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
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
    console.log("Updated JSON:", updatedJson);
  };

  const filteredCategories = dashboardData.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="">
        <div className="w-full bg-white border">
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2  my-1 border rounded-lg w-1/2 m-auto flex justify-center"
          />
        </div>
        <div className="p-6 m-5 shadow-md rounded-md bg-[#F0F5FA]">
        <div className="flex items-center justify-between   mt-2">
          <div className="text-lg font-semibold">CNAPP Dashboard</div>
          <div className="flex items-center space-x-4 relative">
            <button className="bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm border border-gray-300">
              Add Widget +
            </button>
            <button
              className="bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm border border-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Last 2 days ▼
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-4 top-12 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Last 1 day
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Last 2 days
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Last 7 days
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Last 30 days
                  </li>
                </ul>
              </div>
            )}

            <button className="bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm border border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 12h12M6 12l6 6m0-6l-6-6"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="">
          {filteredCategories.map((category) => (
            <div key={category.name} className="mb-8 mt-8">
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              <div className="grid grid-cols-2 gap-6">
                {category.widgets.length > 0 ? (
                  category.widgets.map((widget) => (
                    <Widget
                      key={widget.id}
                      data={widget}
                      onRemove={() =>
                        handleRemoveWidget(category.name, widget.id)
                      }
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
        </div>
        </div>
        {isOffCanvasOpen && (
          <OffCanvasWidget
            onSave={handleSaveWidget}
            onClose={() => setIsOffCanvasOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
