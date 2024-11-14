import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Settings, 
  BarChart,
  Calendar,
  X,
  Search,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function AdminSidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      path: '#',
      badge: '5'
    },
    { 
      title: 'Tasks', 
      icon: <CheckSquare size={20} />, 
      path: '#', 
      isActive: true,
      badge: '12'
    },
    { 
      title: 'Calendar', 
      icon: <Calendar size={20} />, 
      path: '#' 
    },
    { 
      title: 'Analytics', 
      icon: <BarChart size={20} />, 
      path: '#' 
    },
    { 
      title: 'Team', 
      icon: <Users size={20} />, 
      path: '#',
      badge: '3'
    },
    { 
      title: 'Settings', 
      icon: <Settings size={20} />, 
      path: '#' 
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-[280px] flex flex-col
        bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:sticky lg:translate-x-0
      `}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="text-white" size={20} />
            </div>
            <span className="text-lg font-semibold text-gray-800">TaskMaster</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <div className="mb-4">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase">Main Menu</p>
            {menuItems.slice(0, 4).map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`
                  flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg transition-colors
                  group relative
                  ${item.isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.badge && (
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${item.isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div>
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase">Settings</p>
            {menuItems.slice(4).map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`
                  flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg transition-colors
                  ${item.isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.badge && (
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${item.isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-white ring-2 ring-gray-100"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">John Doe</h3>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
} 