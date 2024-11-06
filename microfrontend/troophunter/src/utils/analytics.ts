import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initializeGA = (measurementId: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  ReactGA.initialize(measurementId);
};

// Log a page view
export const logPageView = (page: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  ReactGA.send({ hitType: 'pageview', page });
};

// Log an event
export const logEvent = (category: string, action: string, label?: string, value?: number): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  ReactGA.event({ category, action, label, value });
};

// export const logError = (error: Error, errorInfo: React.ErrorInfo) => {
//   ReactGA.exception({
//     description: `${error.message} - ${errorInfo.componentStack}`,
//     fatal: true // Set to true for critical errors
//   });
// };
