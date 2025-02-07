import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Save,
  Plus,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import FinancialProfileModal from '../components/FinancialProfileModal';
import profileImage from '../assets/profile.jpeg';

const ProfilePage = () => {
  // States
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    birthdate: ''
  });
  const [avatarPreview, setAvatarPreview] = useState('/api/placeholder/128/128');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    console.log('Form submitted:', formData);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFinancialSave = (financialData) => {
    console.log('Financial data saved:', financialData);
    setSuccessMessage('Financial profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Security Badge Component
  const SecurityBadge = ({ text, verified }) => (
    <div className="flex items-center gap-2 text-sm p-2">
      {verified ? (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-4 h-4 mr-2" />
          {text}
        </div>
      ) : (
        <div className="flex items-center text-yellow-600">
          <AlertCircle className="w-4 h-4 mr-2" />
          {text}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal and security preferences</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-600">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="text-indigo-600" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information Fields */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="pl-10"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="pl-10"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number (optional)"
                        className="pl-10"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <Input
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Security Status */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-3">Security Status</h3>
                    <SecurityBadge text="Email Verified" verified={true} />
                    <SecurityBadge text="2FA Enabled" verified={twoFactorEnabled} />
                    <SecurityBadge text="Phone Number" verified={!!formData.phone} />
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Financial Profile Button */}
              <div className="flex justify-center mt-8">
                <Button
                  type="button"
                  onClick={() => setShowFinancialModal(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Complete Financial Profile
                </Button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button type="submit" className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg shadow-md">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Financial Modal */}
        <FinancialProfileModal
          isOpen={showFinancialModal}
          onClose={() => setShowFinancialModal(false)}
          onSave={handleFinancialSave}
        />
      </div>
    </div>
  );
};

export default ProfilePage;