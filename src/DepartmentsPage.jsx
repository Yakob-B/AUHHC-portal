import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import schoolsData from "./schools.json";
import LoadingSpinner from "./components/LoadingSpinner";
import InteractiveCard from "./components/InteractiveCard";

const icons = [
  "💻", "🔬", "📐", "🧬", "🧪", "📚", "🏫", "⚙️"
];

const DepartmentsPage = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSchoolData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const foundSchool = schoolsData.find((s) => s.id === schoolId);
      setSchool(foundSchool);
      setIsLoading(false);
    };

    loadSchoolData();
  }, [schoolId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading departments..." />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">School not found</h2>
          <Link to="/schools" className="text-purple-600 dark:text-purple-400 hover:underline">
            ← Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">{school.name} Departments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {school.departments.map((dept, idx) => (
          <InteractiveCard key={dept.id} className="flex flex-col items-start relative">
            <div className="text-4xl mb-4">{icons[idx % icons.length]}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{dept.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Careers: {dept.careerOpportunities?.join(", ")}</p>
            <Link to={`/schools/${school.id}/departments/${dept.id}`} className="mt-auto px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold">View Details</Link>
          </InteractiveCard>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/schools" className="text-purple-600 dark:text-purple-400 hover:underline">&larr; Back to Schools</Link>
      </div>
    </div>
  );
};

export default DepartmentsPage; 