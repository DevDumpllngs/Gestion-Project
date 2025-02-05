import { NavLink, useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  User, 
  DollarSign, 
  LifeBuoy, 
  Settings, 
  Laptop, 
  Bell, 
  LogOut 
} from "lucide-react";
import Swal from 'sweetalert2';

const handleLogout = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Tu sesión se cerrará y serás redirigido.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    // Siempre limpiamos el token
    localStorage.removeItem('token');

    // Redirigir al login sin importar la elección del usuario
    window.location.href = '/login';
  });

  // En caso de que Swal falle o algo raro pase, redirige al usuario después de 2 segundos
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 transform shadow-sm ${
          isActive 
            ? "bg-gray-500 text-white shadow-md scale-105" 
            : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`
      }
    >
      <div>{icon}</div>
      <span className="text-lg font-medium">{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div 
      className="h-screen w-72 bg-white text-gray-900 shadow-2xl flex flex-col p-6 border-r border-gray-200"
    >
      <div className="flex flex-col items-center mb-8">
        <img 
          src="../assets/logo.webp" 
          alt="DumpYugen Logo" 
          className="w-20 h-20 mb-2 rounded-full shadow-lg object-cover" 
        />
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">DumpYugen</h1>
      </div>

      <div className="mb-6 flex items-center justify-center bg-yellow-50 p-3 rounded-lg shadow-sm border border-yellow-200">
        <Bell size={20} className="text-yellow-600" />
        <span className="ml-2 text-sm text-yellow-800">Tienes 3 nuevas notificaciones</span>
      </div>

      <nav className="flex flex-col space-y-3 flex-grow">
        <NavItem to="/dashboard" icon={<Laptop size={22} />} label="Dashboard" />
        <NavItem to="/transactions" icon={<DollarSign size={22} />} label="Transactions" />
        <NavItem to="/cards" icon={<CreditCard size={22} />} label="Cards" />
        <NavItem to="/profile" icon={<User size={22} />} label="Profile" />
        <NavItem to="/payments" icon={<DollarSign size={22} />} label="Payments" />
        <NavItem to="/support" icon={<LifeBuoy size={22} />} label="Support" />
        <NavItem to="/settings" icon={<Settings size={22} />} label="Settings" />
      </nav>
      
      <div className="mt-auto">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 transform shadow-sm bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut size={22} />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
