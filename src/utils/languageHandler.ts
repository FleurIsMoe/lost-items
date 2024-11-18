import { useState, useEffect } from 'react';

export type Language =
  | 'en'
  | 'it'
  | 'fr'
  | 'es'
  | 'de';


interface LocationData {
  country_code: string;
}

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      detectAndSetLanguage();
    }
  }, []);

  const detectAndSetLanguage = async () => {
    const cachedData = localStorage.getItem('locationData');
    const cachedTimestamp = localStorage.getItem('locationDataTimestamp');

    if (cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION) {
      applyLanguageFromCountryCode(JSON.parse(cachedData).country_code);
    } else {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data: LocationData = await response.json();
        localStorage.setItem('locationData', JSON.stringify(data));
        localStorage.setItem('locationDataTimestamp', Date.now().toString());
        applyLanguageFromCountryCode(data.country_code);
      } catch (error) {
        console.error('Error fetching location data:', error);
        setLanguage('en');
      }
    }
  };

  const applyLanguageFromCountryCode = (countryCode: string) => {
    let detectedLanguage: Language = 'en';
    switch (countryCode.toLowerCase()) {
      case 'it':
        detectedLanguage = 'it';
        break;
      case 'fr':
        detectedLanguage = 'fr';
        break;
      case 'es':
        detectedLanguage = 'es';
        break;
      case 'de':
        detectedLanguage = 'de';
    }
    setLanguage(detectedLanguage);
    localStorage.setItem('preferredLanguage', detectedLanguage);
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return { language, changeLanguage };
};