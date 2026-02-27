import { useState } from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';
import { industries } from '../data/mockData';

export const Registration = () => {
  const { completeRegistration } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    position: '',
    phone: '',
    nationalId: '',
    dob: '',
    industry: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    completeRegistration(formData);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-teal mb-2">Mezzanine</h1>
          <p className="text-slategray">Create your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            required
          />
          <Input
            label="Position"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
          <Input
            label="National ID"
            value={formData.nationalId}
            onChange={(e) => handleChange('nationalId', e.target.value)}
            required
          />
          <Input
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
            required
          />
          <Select
            label="Industry Type"
            options={industries}
            value={formData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            required
          />
          <Button type="submit" className="w-full mt-4">
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
};
