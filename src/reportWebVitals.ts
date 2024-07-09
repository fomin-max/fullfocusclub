import { ReportCallback } from 'web-vitals';

export const reportWebVitals = (onPerfEntry: ReportCallback) => {
  if (onPerfEntry) {
    import('web-vitals/attribution').then(
      ({ onCLS, onINP, onFCP, onFID, onLCP, onTTFB }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onFCP(onPerfEntry);
        onFID(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      }
    );
  }
};
