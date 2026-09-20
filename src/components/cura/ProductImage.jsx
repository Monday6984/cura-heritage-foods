import React, { useState } from 'react';
import Logo from './Logo';

// Falls back to a branded placeholder if the image file is missing or fails to load.
export default function ProductImage({ src, alt, className = '', ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-[#2a180f] ${className}`}>
        <Logo className="h-14 w-14 opacity-40" tone="gold" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={className}
      {...props}
    />
  );
}
