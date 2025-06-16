import React from 'react';
import logoImage from '@/assets/images/logo.png';
import logoDarkImage from '@/assets/images/logo_dark.png';
import { useTheme } from '@/contexts/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  to?: string;
  forceLightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = false, to, forceLightMode = false }) => {
  const { isDarkMode } = useTheme();
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };

  const LogoImage = (
    <div className={`${sizeMap[size]}`}>
      <img
        src={forceLightMode ? logoImage : (isDarkMode ? logoDarkImage : logoImage)}
        alt="Arogya Sathi Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {to ? (
        <a href={to}>{LogoImage}</a>
      ) : (
        LogoImage
      )}
    </div>
  );
};
