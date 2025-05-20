
import React from 'react';
import { motion } from 'framer-motion';
import UserInfoForm from '@/components/UserInfoForm';
import { useDiagnostic } from '@/contexts/DiagnosticContext';

const UserInfoView: React.FC = () => {
  const { handleUserInfoSubmit, userData } = useDiagnostic();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <UserInfoForm 
        onSubmit={handleUserInfoSubmit} 
        isAfterQuestions={true}
        initialData={userData}
      />
    </motion.div>
  );
};

export default UserInfoView;
