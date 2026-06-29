import { useState, useEffect } from 'react';
import { YUDISIUM_DATE } from './constants';

export function useIsPostYudisium() {
  const [isPost, setIsPost] = useState(false);
  
  useEffect(() => {
    setIsPost(Date.now() > YUDISIUM_DATE);
    
    // Optional: set a timer to update automatically when the date is reached
    const diff = YUDISIUM_DATE - Date.now();
    if (diff > 0 && diff < 86400000) { // Only set timeout if it's within a day to avoid huge timeouts
      const timer = setTimeout(() => {
        setIsPost(true);
      }, diff);
      return () => clearTimeout(timer);
    }
  }, []);
  
  return isPost;
}
