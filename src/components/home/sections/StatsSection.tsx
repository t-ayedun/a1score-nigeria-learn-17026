
const StatsSection = () => {
  const stats = [
    { value: "15K+", label: "Nigerian Students", color: "text-green-600" },
    { value: "800+", label: "Qualified Teachers", color: "text-blue-600" },
    { value: "92%", label: "Pass JAMB", color: "text-purple-600" },
    { value: "24/7", label: "Always Available", color: "text-orange-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="hover:scale-105 transition-transform duration-200 p-2 sm:p-4">
          <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
          <div className="text-gray-600 text-sm sm:text-base leading-tight">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
