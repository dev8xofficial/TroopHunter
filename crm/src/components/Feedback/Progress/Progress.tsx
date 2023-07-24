import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  isLoading: boolean;
}

const Progress: React.FC<ProgressBarProps> = ({ isLoading }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    let duration = 1500; // Initial duration for 10% width increase (1.5 seconds)

    // Function to gradually increase the progress bar width with bounce animation
    const increaseProgress = () => {
      const totalIncrements = 100; // Number of increments to reach 10% width increase
      const incrementDuration = duration / totalIncrements; // Duration for each increment

      let incrementsCount = 0;

      interval = setInterval(() => {
        setProgressWidth((prevWidth) => {
          incrementsCount++;
          const newWidth = prevWidth + 10 / totalIncrements;
          return newWidth >= 100 ? 100 : newWidth; // Limit the width to 100%
        });

        // Clear the interval after reaching the 10% width increase
        if (incrementsCount === totalIncrements) {
          clearInterval(interval);
        }
      }, incrementDuration);

      // Calculate the next duration for the bounce animation (double the previous duration)
      duration *= 2;
      if (duration > 30000) {
        // Limit the maximum duration to 30 seconds
        duration = 30000;
      }
    };

    // Function to reset the progress bar width and duration
    const resetProgress = () => {
      clearInterval(interval);
      setProgressWidth(0);
      duration = 1500;
    };

    // Start the progress animation when isLoading is true
    if (isLoading) {
      increaseProgress();

      // Set a timeout to reset the progress bar width after 30 seconds
      timeout = setTimeout(() => {
        resetProgress();
      }, 30000); // 30 seconds (30000 milliseconds)

      // Clean up the interval and timeout when the component is unmounted or isLoading becomes false
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      // If isLoading becomes false before the 30-second timeout, reset the progress bar width and duration
      resetProgress();
    }
  }, [isLoading]);

  return (
    <div className="h-1 w-full bg-neutral-50 dark:bg-neutral-600">
      <div className="h-1 bg-primary" style={{ width: isLoading ? `${progressWidth}%` : '0%' }}></div>
    </div>
  );
};

export default Progress;
