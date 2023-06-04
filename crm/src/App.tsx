import { useEffect, useState } from 'react';
import AppRouter from './routes/AppRouter';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className="text-danger text-center">Failed to lead app</p>
  ) : (
    <>
      <AppRouter />
    </>
  );
}

export default App;
