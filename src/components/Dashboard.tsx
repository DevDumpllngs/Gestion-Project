import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bell, Plus, Search, CreditCard } from 'lucide-react';
import { useState } from 'react';
import profileImage from '../assets/profile.jpeg'; 

const monthlyData = [
  { month: 'Jan', amount: 11000, color: '#8B5CF6' },
  { month: 'Feb', amount: 7000, color: '#EC4899' },
  { month: 'Mar', amount: 8000, color: '#3B82F6' },
  { month: 'Apr', amount: 12861, color: '#10B981' },
  { month: 'May', amount: 9000, color: '#F43F5E' },
  { month: 'Jun', amount: 5000, color: '#8B5CF6' },
  { month: 'Jul', amount: 7000, color: '#F97316' }
];

const recentPayments = [
  { icon: "🐱", description: "Cat foods", amount: -150.75, time: "6 hour ago" },
  { icon: "✈️", description: "Plane tickets", amount: -200.00, time: "6 hour ago" },
  { icon: "🏠", description: "IKEA home", amount: -225.00, time: "2 hour ago" },
  { icon: "💳", description: "Google wallet", amount: -500.00, time: "10 min ago" }
];

const expenseSummary = [
  { category: "Various shopping", amount: 2650.00, color: '#3B82F6' },
  { category: "Entertainments", amount: 1350.00, color: '#10B981' },
  { category: "Kids Education", amount: 1950.00, color: '#8B5CF6' },
  { category: "Vehicle cost", amount: 1850.00, color: '#EC4899' },
  { category: "Households", amount: 850.00, color: '#F43F5E' },
  { category: "Insurance", amount: 250.00, color: '#F97316' }
];

const Dashboard = () => {
  const [cardState, setCardState] = useState({
    hover: false,
    rotateX: 0,
    rotateY: 0
  });

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = (e.clientY - centerY) / 20;
    const rotateY = -(e.clientX - centerX) / 20;

    setCardState({
      hover: true,
      rotateX,
      rotateY
    });
  };

  const handleCardMouseLeave = () => {
    setCardState({
      hover: false,
      rotateX: 0,
      rotateY: 0
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white shadow-sm rounded-xl p-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="py-2 px-4 rounded-lg bg-gray-100 w-64 focus:ring-2 focus:ring-blue-300 transition duration-300"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <Bell className="w-6 h-6 text-gray-500 hover:text-blue-600 transition" />
          <div className="flex items-center gap-3">
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-blue-200"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Dumpllngs</p>
              <p className="text-gray-500 text-xs">dump00p@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-8 space-y-6">
          {/* Monthly Details */}
          <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-0">
              <div>
                <CardTitle className="text-lg font-bold mb-4 text-gray-800">Monthly Details</CardTitle>
                <div className="flex gap-4">
                <div className="flex space-x-4 border-b border-gray-700">
                    {/* Botón Activo */}
                    <button className="text-white border-b-2 border-purple-500 pb-3 font-semibold transition-all duration-300">
                      Income
                    </button>

                    {/* Botón Inactivo */}
                    <button className="text-gray-400 pb-3 hover:text-white hover:border-b-2 hover:border-purple-400 transition-all duration-300">
                      Expenses
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} 
                           ticks={[0, 3000, 5000, 8000, 12000, 15000]}
                           domain={[0, 15000]}
                    />
                    <Bar dataKey="amount" 
                         fill="#3B82F6"
                         radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Summary */}
          <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center h-[67px]">
                <CardTitle className="text-lg font-bold text-gray-800">Expense Summary</CardTitle>
                <select className="bg-gray-100 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-300 transition">
                  <option>April</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 flex items-center justify-center">
                  <div className="w-40 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseSummary}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                        >
                          {expenseSummary.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-span-8 grid grid-cols-2 gap-y-4">
                  {expenseSummary.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between pr-8">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: expense.color }}
                        />
                        <p className="text-sm text-gray-700">{expense.category}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-800">${expense.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card */}
          <Card 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-gray-800">Your Card</CardTitle>
                <Plus className="w-6 h-6 text-gray-500 hover:text-blue-600 transition" />
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 shadow-md transition-transform duration-300"
                style={{
                  transform: `perspective(1000px) rotateX(${cardState.rotateX}deg) rotateY(${cardState.rotateY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-white w-6 h-6" />
                    <p className="font-medium text-white">Mastercard</p>
                  </div>
                  <div className="w-8 h-4 bg-white/30 rounded-full flex items-center justify-end">
                    <div className="w-4 h-4 bg-white rounded-full mr-0.5" />
                  </div>
                </div>
                <div style={{ transform: 'translateZ(50px)' }}>
                  <p className="text-lg mb-2 text-white font-semibold">Esteban BM</p>
                  <p className="text-sm text-white/80 tracking-widest">**** **** **** 3728</p>
                  <div className="flex justify-between mt-4">
                    <p className="text-xs text-white/70">Exp 02/30</p>
                    <div className="opacity-50">
                      <CreditCard className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* Recent Payments */}
              <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold text-gray-800">Recent Payments</CardTitle>
                    <button className="text-sm text-blue-600 hover:text-blue-800 transition">See all</button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className=" max-h-60 overflow-y-auto">
                    {recentPayments.slice(0, 5).map((payment, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md hover:bg-blue-50 transition">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{payment.icon}</span>
                          <div>
                            <p className="font-medium text-sm text-gray-800">{payment.description}</p>
                            <p className="text-xs text-gray-500">{payment.time}</p>
                          </div>
                        </div>
                        <p className="font-medium text-sm text-gray-800">${payment.amount}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl rounded-2xl overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02]">
  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-black/80 z-0" />

  {/* Fondos animados con tamaño reducido */}
  <div className="absolute -top-16 -left-16 w-72 h-72 bg-radial-gradient from-gray-600/30 to-transparent rounded-full animate-pulse-slow" />
  <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-radial-gradient from-gray-500/20 to-transparent rounded-full animate-pulse-slow delay-1000" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-radial-gradient from-gray-400/15 to-transparent rounded-full animate-pulse-slow delay-500" />

  <CardContent className="p-4 relative z-20 flex flex-col items-start space-y-3 backdrop-blur-sm">
    <h3 className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
      Need more stats?
    </h3>
    <p className="text-gray-300/90 text-xs leading-relaxed transition-colors hover:text-gray-200">
      Upgrade to <span className="font-extrabold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">Pro Max</span> for more advanced features and insights tailored to you.
    </p>
    <button className="mt-1 bg-gradient-to-br from-gray-700/90 via-gray-800 to-gray-900 hover:from-gray-600/90 hover:via-gray-700 hover:to-gray-800 transition-all duration-300 text-white px-4 py-2 rounded-xl text-xs font-semibold border border-gray-600/50 hover:border-gray-400/30 shadow-xl hover:shadow-2xl active:scale-95 transform-gpu">
      Upgrade Now →
    </button>
  </CardContent>
</Card>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;