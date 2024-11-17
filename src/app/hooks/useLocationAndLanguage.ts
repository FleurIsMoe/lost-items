import { useState, useEffect } from 'react';
import languages from '../languages';

interface LocationData {
  city: string;
  country_name: string;
  country_code: string;
}

export function useLocationAndLanguage() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [languageKey, setLanguageKey] = useState<string>('en');
  const [greeting, setGreeting] = useState<string>('');

  const handleLanguageChange = (lang: string) => {
    setLanguageKey(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && languages[savedLanguage]) {
        setLanguageKey(savedLanguage);
        setIsLoading(false);
        return;
      }

      const savedLocation = localStorage.getItem('location');
      const savedDate = localStorage.getItem('locationDate');
      const now = new Date();

      if (savedLocation && savedDate) {
        const savedDateTime = new Date(savedDate);
        const timeDifference = now.getTime() - savedDateTime.getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeDifference < oneDay) {
          const locationData: LocationData = JSON.parse(savedLocation);
          const locationString = `${locationData.city}, ${locationData.country_name}`;
          setLocation(locationString);
          setGreeting(languages[languageKey].greeting.replace('{location}', locationString));
          const dateFormat = locationData.country_code === 'US' ? 'en-US' : 'en-GB';
          setCurrentDate(now.toLocaleDateString(dateFormat, { year: 'numeric', month: 'numeric', day: 'numeric' }));
          setLanguageBasedOnCountry(locationData.country_code);
          setIsLoading(false);
          return;
        }
      }

      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error(`Failed to fetch location, status: ${res.status}`);
        const data: LocationData = await res.json();
        
        if (data.city && data.country_name) {
          const locationString = `${data.city}, ${data.country_name}`;
          setLocation(locationString);
          setGreeting(languages[languageKey].greeting.replace('{location}', locationString));
          localStorage.setItem('location', JSON.stringify(data));
          localStorage.setItem('locationDate', now.toISOString());

          const dateFormat = data.country_code === 'US' ? 'en-US' : 'en-GB';
          setCurrentDate(now.toLocaleDateString(dateFormat, { year: 'numeric', month: 'numeric', day: 'numeric' }));
          
          setLanguageBasedOnCountry(data.country_code);
        } else {
          throw new Error('Incomplete location data');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation(languages[languageKey].locationUnavailable);
        setGreeting(languages[languageKey].greeting.replace('{location}', languages[languageKey].locationUnavailable));
        setCurrentDate(now.toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [languageKey]);

  const setLanguageBasedOnCountry = (countryCode: string) => {
    switch (countryCode.toLowerCase()) {
      case 'es':
      case 'mx':
      case 'ar':
      case 'bo':
      case 'cl':
      case 'co':
      case 'cr':
      case 'do':
      case 'ec':
      case 'gt':
      case 'hn':
      case 'ni':
      case 'pa':
      case 'pe':
      case 'py':
      case 'sv':
      case 'uy':
      case 've':
        setLanguageKey('es');
        break;
      case 'fr':
      case 'be':
      case 'ca':
      case 'ch':
      case 'lu':
        setLanguageKey('fr');
        break;
      case 'it':
      case 'ch':
      case 'sm':
      case 'va':
        setLanguageKey('it');
        break;
      case 'de':
      case 'at':
      case 'ch':
      case 'li':
        setLanguageKey('de');
        break;
      case 'nl':
      case 'be':
        setLanguageKey('nl');
        break;
      case 'pt':
      case 'ao':
      case 'br':
      case 'cv':
      case 'gw':
      case 'gy':
      case 'mz':
      case 'st':
      case 'tl':
        setLanguageKey('pt');
      default:
        setLanguageKey('en');
    }
  };

  return { isLoading, location, currentDate, languageKey, greeting, handleLanguageChange };
}