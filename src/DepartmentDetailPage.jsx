import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import schoolsData from "./schools.json";
import LoadingSpinner from "./components/LoadingSpinner";
import CollapsibleSection from "./components/CollapsibleSection";
import Tooltip from "./components/Tooltip";
import AnimatedCounter from "./components/AnimatedCounter";
import Notification from "./components/Notification";
import ProgressBar from "./components/ProgressBar";
import InteractiveCard from "./components/InteractiveCard";

const icons = [
  "💻", "🔬", "📐", "🧬", "🧪", "📚", "🏫", "⚙️"
];

const DepartmentDetailPage = () => {
  const { schoolId, departmentId } = useParams();
  const [school, setSchool] = useState(null);
  const [department, setDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("info");
  const [notificationMessage, setNotificationMessage] = useState("");
  const icon = icons[0]; // You can enhance this to match department type

  useEffect(() => {
    const loadDepartmentData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const foundSchool = schoolsData.find((s) => s.id === schoolId);
      const foundDepartment = foundSchool?.departments.find((d) => d.id === departmentId);
      setSchool(foundSchool);
      setDepartment(foundDepartment);
      setIsLoading(false);
      
      // Show welcome notification
      if (foundDepartment) {
        setNotificationMessage(`Welcome to ${foundDepartment.name}! Explore the details below.`);
        setNotificationType("success");
        setShowNotification(true);
      }
    };

    loadDepartmentData();
  }, [schoolId, departmentId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: department?.name,
        text: `Check out ${department?.name} at ${school?.name}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setNotificationMessage("Link copied to clipboard!");
      setNotificationType("info");
      setShowNotification(true);
    }
  };

  const handleBookmark = () => {
    setNotificationMessage("Department bookmarked successfully!");
    setNotificationType("success");
    setShowNotification(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading department details..." />
      </div>
    );
  }

  if (!school || !department) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Department not found</h2>
          <Link to="/schools" className="text-purple-600 dark:text-purple-400 hover:underline">
            ← Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  const careerOpportunities = department.careerOpportunities || [];
  const totalCareers = careerOpportunities.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 py-12 px-4">
      {/* Notification */}
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
          duration={3000}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-6xl transform hover:rotate-12 transition-transform duration-300">
                {icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {department.name}
                </h1>
                <p className="text-xl text-purple-600 dark:text-purple-400">
                  {school.name}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Tooltip content="Bookmark this department" position="left">
                <button
                  onClick={handleBookmark}
                  className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </Tooltip>
              
              <Tooltip content="Share this department" position="left">
                <button
                  onClick={handleShare}
                  className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                <AnimatedCounter end={totalCareers} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Career Paths</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                <AnimatedCounter end={school.departments.length} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Departments in School</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Employment Rate</div>
            </div>
          </div>

          {/* Department Head */}
          {department.head && (
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {department.head.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Department Head</p>
                <p className="text-gray-600 dark:text-gray-300">{department.head}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Overview Section */}
          <CollapsibleSection 
            title="Department Overview" 
            icon="📋"
            defaultOpen={true}
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {department.overview}
            </p>
          </CollapsibleSection>

          {/* Career Opportunities Section */}
          <CollapsibleSection 
            title="Career Opportunities" 
            icon="💼"
            defaultOpen={true}
          >
            <div className="space-y-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Career Paths Available
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {totalCareers} opportunities
                  </span>
                </div>
                <ProgressBar 
                  progress={totalCareers} 
                  max={Math.max(totalCareers, 10)}
                  variant="success"
                  showLabel={false}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {careerOpportunities.map((career, idx) => (
                  <Tooltip key={idx} content={`Learn more about ${career}`} position="top">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 dark:text-purple-400">💼</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{career}</span>
                      </div>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* Related Departments Section */}
          <CollapsibleSection 
            title="Related Departments" 
            icon="🔗"
            defaultOpen={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {school.departments
                .filter(d => d.id !== department.id)
                .slice(0, 4)
                .map((relatedDept, idx) => (
                  <Link
                    key={relatedDept.id}
                    to={`/schools/${school.id}/departments/${relatedDept.id}`}
                  >
                    <InteractiveCard className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{icons[idx % icons.length]}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {relatedDept.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {relatedDept.careerOpportunities?.slice(0, 2).join(", ")}
                          </p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </Link>
                ))}
            </div>
          </CollapsibleSection>

          {/* Quick Actions */}
          <InteractiveCard className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Tooltip content="View all departments in this school" position="top">
                <Link 
                  to={`/schools/${school.id}/departments`}
                  className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  <span className="mr-2">🏫</span>
                  View All Departments
                </Link>
              </Tooltip>
              
              <Tooltip content="Browse all schools" position="top">
                <Link 
                  to="/schools"
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  <span className="mr-2">🎓</span>
                  Browse Schools
                </Link>
              </Tooltip>
              
              <Tooltip content="Search for other departments" position="top">
                <Link 
                  to="/"
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <span className="mr-2">🔍</span>
                  Search Departments
                </Link>
              </Tooltip>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailPage; 