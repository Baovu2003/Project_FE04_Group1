import React from 'react';
import { Outlet } from 'react-router-dom';

function RoleGroup() {
  return (
    <div>
      RoleGroup
      <Outlet /> {/* This will render the Permissions component */}
    </div>
  );
}

export default RoleGroup;