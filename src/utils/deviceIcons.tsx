import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

export function getDeviceIcon(
  deviceType: 'desktop' | 'tablet' | 'mobile' | string,
  className: string = 'w-4 h-4'
): React.ReactElement {
  switch (deviceType) {
    case 'desktop':
      return <Monitor className={`${className} text-emerald-400`} />;
    case 'tablet':
      return <Tablet className={`${className} text-teal-400`} />;
    case 'mobile':
      return <Smartphone className={`${className} text-cyan-400`} />;
    default:
      return <Monitor className={`${className} text-emerald-400`} />;
  }
}

export function getDeviceLabel(deviceType: string): string {
  switch (deviceType) {
    case 'desktop':
      return 'Desktop';
    case 'tablet':
      return 'Tablet';
    case 'mobile':
      return 'Mobile';
    default:
      return 'Desktop';
  }
}
