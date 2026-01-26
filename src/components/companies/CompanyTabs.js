'use client';

const CompanyTabs = ({ activeTab, onTabChange, company }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'jobs', label: 'Open Jobs', count: company.jobs.length },
    { id: 'reviews', label: 'Reviews', count: company.reviews.length },
    { id: 'photos', label: 'Photos', count: company.photos.length },
    { id: 'benefits', label: 'Benefits', count: company.perks.length },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
              ${activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-medium
                ${activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CompanyTabs;