import Router from 'next/router';
import { useEffect, useState } from 'react';

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const routeEventStart = () => {
      setIsLoading(true);
    };
    const routeEventEnd = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventEnd);
    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventEnd);
    };
  }, []);

  return { isLoading };
};
