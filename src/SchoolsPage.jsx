import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import schoolsData from "./schools.json";
import LoadingSpinner from "./components/LoadingSpinner";
import AnimatedCounter from "./components/AnimatedCounter";
import Tooltip from "./components/Tooltip";
import ProgressBar from "./components/ProgressBar";
import InteractiveCard from "./components/InteractiveCard";

const icons = [
  "📚", "🏫", "🧪", "💻", "⚙️", "🔬", "📐", "🧬"
];

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    // Simulate loading delay for better UX demonstration
    const loadSchools = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSchools(schoolsData);
      setIsLoading(false);
    };

    loadSchools();
  }, []);

  const totalDepartments = schools.reduce((sum, school) => sum + school.departments.length, 0);
  const totalSchools = schools.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading schools..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">Schools & Institutes</h2>
      
      {/* Statistics Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">University Overview</h3>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                <AnimatedCounter end={totalSchools} />
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Schools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                <AnimatedCounter end={totalDepartments} />
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Departments</div>
            </div>
          </div>
          <ProgressBar 
            progress={totalDepartments} 
            max={totalDepartments} 
            variant="purple"
            showLabel={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {schools.map((school, idx) => (
          <Tooltip 
            key={school.id}
            content={`${school.departments.length} departments available`}
            position="top"
          >
            <InteractiveCard
              className={`flex flex-col items-start relative ${
                selectedSchool === school.id ? 'ring-2 ring-purple-500 shadow-xl' : ''
              }`}
              onClick={() => setSelectedSchool(selectedSchool === school.id ? null : school.id)}
            >
              {/* Animated icon */}
              <div className="text-4xl mb-4 transform transition-transform duration-300 hover:rotate-12">
                {icons[idx % icons.length]}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {school.name}
              </h3>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-gray-600 dark:text-gray-400">
                  <AnimatedCounter end={school.departments.length} /> Departments
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Department preview */}
              <div className="mb-4 w-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sample Departments:</div>
                <div className="flex flex-wrap gap-1">
                  {school.departments.slice(0, 3).map((dept, deptIdx) => (
                    <span 
                      key={deptIdx}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {dept.name.split(' ')[0]}
                    </span>
                  ))}
                  {school.departments.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{school.departments.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Progress indicator */}
              <div className="w-full mb-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Department Coverage</span>
                  <span>{Math.round((school.departments.length / totalDepartments) * 100)}%</span>
                </div>
                <ProgressBar 
                  progress={school.departments.length} 
                  max={totalDepartments}
                  variant="default"
                  showLabel={false}
                  animated={false}
                />
              </div>

              <Link 
                to={`/schools/${school.id}/departments`} 
                className="mt-auto w-full px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold text-center"
                onClick={(e) => e.stopPropagation()}
              >
                View Departments
              </Link>
            </InteractiveCard>
          </Tooltip>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tooltip content="Browse all departments across all schools" position="top">
              <Link 
                to="/departments" 
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <span className="mr-2">🔍</span>
                Browse All Departments
              </Link>
            </Tooltip>
            
            <Tooltip content="Find departments by search" position="top">
              <Link 
                to="/" 
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <span className="mr-2">🔎</span>
                Search Departments
              </Link>
            </Tooltip>
            
            <Tooltip content="View featured departments" position="top">
              <Link 
                to="/" 
                className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                <span className="mr-2">⭐</span>
                Featured Departments
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolsPage; 