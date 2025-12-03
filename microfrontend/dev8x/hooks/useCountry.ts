import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { countryAtom, countryInitializedAtom } from '../store/country';

export const useCountry = (): string => {
  const [country, setCountry] = useAtom(countryAtom);
  const [initialized, setInitialized] = useAtom(countryInitializedAtom);

  useEffect(() => {
    // Avoid running on the server
    if (typeof window === 'undefined') return;

    // If we've already resolved the country, don't fetch again.
    if (initialized) return;

    // In non-production environments, just stick with the default 'US'
    // to avoid noisy network calls during local development.
    if (process.env.NODE_ENV !== 'production') {
      setInitialized(true);
      return;
    }

    const fetchCountry = async () => {
      try {
        const res = await fetch('/api/location');
        if (!res.ok) {
          setInitialized(true);
          return;
        }
        const data: { countryCode?: string } = await res.json();
        if (data.countryCode) {
          setCountry(data.countryCode.toUpperCase());
        }
      } finally {
        setInitialized(true);
      }
    };

    fetchCountry();
  }, [initialized, setCountry, setInitialized]);

  return country;
};


