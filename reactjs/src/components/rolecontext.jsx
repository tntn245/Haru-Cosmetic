import React, { createContext, useState, useEffect } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_role = JSON.parse(user).type;
      setRole(user_role);
    }
  }, [role]);

  const updateRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};