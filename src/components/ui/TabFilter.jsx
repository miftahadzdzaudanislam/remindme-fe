export default function TabFilter({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex rounded-lg bg-gray-200 p-1 gap-1 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 rounded-lg px-2 md:px-4 py-2 transition font-medium text-xs md:text-sm whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-primary shadow text-light"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}