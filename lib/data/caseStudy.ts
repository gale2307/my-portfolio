export interface Screenshot {
  src?: string;
  alt: string;
}

export interface CaseStudyData {
  client: string;
  project: string;
  tags: string[];
  problem: string;
  approach: string;
  outcome: string;
  screenshots: Screenshot[];
}

export const caseStudy: CaseStudyData = {
  client: 'Autoservice',
  project: 'Internal Mobile App Rebuild',
  tags: ['React Native', 'Expo', 'Mobile'],
  problem:
    "Their internal mobile app had no surviving codebase after the original engineer left. The app was running in production but completely unmaintainable — any change required rebuilding from scratch.",
  approach:
    "Reverse-engineered the production APK to recover the app's structure and data flows, then rebuilt the entire application from scratch in Expo and React Native.",
  outcome:
    "Delivered a fully maintainable codebase with three new capabilities: QR code scanning for service items, repair order creation, and in-app receipt and field report printing.",
  screenshots: [
    { src: '/images/casestudy/screen-1.svg', alt: 'Repair order screen' },
    { src: '/images/casestudy/screen-2.svg', alt: 'QR code scanner' },
    { src: '/images/casestudy/screen-3.svg', alt: 'Field report printing' },
  ],
};
