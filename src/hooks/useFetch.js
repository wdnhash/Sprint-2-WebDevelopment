import { useEffect, useRef, useState } from 'react';

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (cancelledRef.current) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelledRef.current) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
