interface TabNavigationProps {
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabClick }: TabNavigationProps) {
  const tabs = [
    { id: 'umum', label: 'Umum' },
    { id: 'pelayanan', label: 'Pelayanan' },
    { id: 'teknologi', label: 'Teknologi' },
    { id: 'lokasi', label: 'Lokasi' },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
