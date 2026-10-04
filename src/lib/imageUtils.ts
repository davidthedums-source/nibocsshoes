import React from 'react';

/**
 * Image error handler that gracefully recovers if an image fails to load.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackPath?: string
) {
  const target = event.currentTarget;
  if (target.dataset.triedFallback === 'true') {
    return;
  }
  target.dataset.triedFallback = 'true';

  if (fallbackPath) {
    target.src = fallbackPath;
    return;
  }

  // Attempt fallback between /images/ and /assets/images/
  if (target.src.includes('/images/')) {
    target.src = target.src.replace('/images/', '/assets/images/');
  } else if (target.src.includes('/assets/images/')) {
    target.src = target.src.replace('/assets/images/', '/images/');
  }
}
