import { useEffect, useState } from 'react';
import AppRouter from './routes/AppRouter';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <p className="text-danger text-center">Failed to load app</p>
  ) : (
    <>
      <AppRouter />
    </>
  );
}

export default App;
