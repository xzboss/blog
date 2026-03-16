import { useEffect } from 'react';
import { useLocation } from '@rspress/core/runtime';

function fixImages() {
  document.querySelectorAll('img[src*="cdn.nlark.com"]').forEach((img) => {
    if (img.getAttribute('referrerpolicy') !== 'no-referrer') {
      const src = img.getAttribute('src')!;
      img.setAttribute('referrerpolicy', 'no-referrer');
      img.setAttribute('src', '');
      img.setAttribute('src', src);
    }
  });
}

export default function ImgReferrerFix() {
  const { pathname } = useLocation();

  useEffect(() => {
    fixImages();
    const observer = new MutationObserver(fixImages);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
