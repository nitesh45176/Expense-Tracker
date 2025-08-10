import React from 'react'
import { getInitials } from '../../utils/helper';

export const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || 'w-12'} ${height || 'h-12'} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 ${style || ''}`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;