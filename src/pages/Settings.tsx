import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { 
  FiSun, FiMoon, FiBell, FiLock, FiGlobe, FiShield,
  FiClock, FiSliders, FiMail, FiSmartphone, FiKey, FiEye, FiDatabase
} from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LoginActivity {
  location: string;
  timestamp: Date;
}

interface PrivacySettings {
  dataCollection: boolean;
  shareAnalytics: boolean;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('indigo');
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-5');
  const [cookiePreferences, setCookiePreferences] = useState(true);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    dataCollection: false,
    shareAnalytics: false
  });

  const [loginActivity] = useState<LoginActivity[]>([
    { location: 'New York, US', timestamp: new Date() },
    { location: 'London, UK', timestamp: new Date(Date.now() - 3600000) },
    { location: 'Tokyo, JP', timestamp: new Date(Date.now() - 7200000) },
  ]);

  const handlePrivacyChange = (setting: keyof PrivacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const themes = [
    { name: 'indigo', color: 'bg-indigo-600' },
    { name: 'emerald', color: 'bg-emerald-600' },
    { name: 'rose', color: 'bg-rose-600' },
    { name: 'amber', color: 'bg-amber-600' },
    { name: 'violet', color: 'bg-violet-600' },
    { name: 'sky', color: 'bg-sky-600' },
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: <FiSliders /> },
    { id: 'security', label: 'Security', icon: <FiLock /> },
    { id: 'privacy', label: 'Privacy', icon: <FiEye /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-black mb-8">Settings</h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Theme Selection */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                <FiSettings className="mr-2" /> Appearance
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {darkMode ? <FiMoon className="mr-2" /> : <FiSun className="mr-2" />}
                    <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onChange={setDarkMode}
                    className={`${
                      darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span
                      className={`${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div>
                  <h3 className="text-gray-700 dark:text-gray-300 mb-3">Theme Color</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme.name)}
                        className={`${theme.color} h-12 rounded-lg flex items-center justify-center ${
                          selectedTheme === theme.name
                            ? 'ring-2 ring-offset-2 ring-indigo-500'
                            : 'opacity-75 hover:opacity-100'
                        } transition-all`}
                      >
                        {selectedTheme === theme.name && (
                          <FiSun className="text-white text-xl" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-700 dark:text-gray-300 mb-3">Font Size</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-500 dark:text-gray-400">{fontSize}px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                <FiGlobe className="mr-2" /> Language & Region
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                    Time Zone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-white"
                  >
                    <option value="UTC-5">UTC-5 (Eastern Time)</option>
                    <option value="UTC-8">UTC-8 (Pacific Time)</option>
                    <option value="UTC+0">UTC+0 (London)</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Account Security */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                <FiLock className="mr-2" /> Account Security
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiShield className="mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">2-Factor Authentication</span>
                  </div>
                  <Switch
                    checked={twoFactor}
                    onChange={setTwoFactor}
                    className={`${
                      twoFactor ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span
                      className={`${
                        twoFactor ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <span className="text-gray-700 dark:text-gray-300">Change Password</span>
                    <FiKey className="text-gray-500" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <span className="text-gray-700 dark:text-gray-300">Connected Devices</span>
                    <FiSmartphone className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Login History */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                <FiClock className="mr-2" /> Recent Activity
              </h2>
              
              <div className="space-y-4">
                {loginActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Login from {activity.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(activity.timestamp, 'PPp', { locale: es })}
                      </p>
                    </div>
                    <FiGlobe className="text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Data Privacy */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                <FiEye className="mr-2" /> Data Privacy
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiDatabase className="mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Data Collection</span>
                  </div>
                  <Switch
                      checked={privacySettings.dataCollection}
                      onChange={() => handlePrivacyChange('dataCollection')}
                      className={`${
                        privacySettings.dataCollection ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      aria-label="Activar recolección de datos"
                      aria-checked={privacySettings.dataCollection}
                    />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Share Analytics Data</span>
                    <Switch
                        checked={privacySettings.dataCollection}
                        onChange={() => handlePrivacyChange('dataCollection')}
                        className={`${
                          privacySettings.dataCollection ? 'bg-indigo-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        aria-label="Activar recolección de datos"
                        aria-checked={privacySettings.dataCollection}
                      />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Cookie Preferences</span>
                    <Switch
                      checked={cookiePreferences}
                      onChange={setCookiePreferences}
                      className={`${
                        cookiePreferences ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                <FiMail className="mr-2" /> Communications
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiBell className="mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                  </div>
                  <Switch
                    checked={notifications}
                    onChange={setNotifications}
                    className={`${
                      notifications ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span
                      className={`${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Marketing Emails</span>
                    <Switch
                      checked={notifications}
                      onChange={setNotifications}
                      className={`${
                        notifications ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
                    <Switch
                      checked={notifications}
                      onChange={setNotifications}
                      className={`${
                        notifications ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
