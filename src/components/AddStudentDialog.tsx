
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserPlus } from 'lucide-react';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    pass: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddStudent = () => {
    // Handle student creation logic here
    console.log('Adding student:', formData);
    
    // Reset form and close dialog
    setFormData({ email: '', password: '', pass: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add Student
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">User ID / Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pass">Pass</Label>
            <Input
              id="pass"
              type="text"
              placeholder="Enter pass"
              value={formData.pass}
              onChange={(e) => handleInputChange('pass', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleAddStudent}
            className="w-full"
            disabled={!formData.email || !formData.password}
          >
            Add Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
