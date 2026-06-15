import { useEffect, useMemo, useState } from 'react';

export function useFetch(fetcher, deps = []) {
  const fetchKey = useMemo(() => JSON.stringify(deps), [deps]);
  const [state, setState] = useState({
    key: fetchKey,
    data: null,
    loading: true,
    error: null,
  });

  // Padrão oficial do React: resetar estado durante render quando a key muda.
  // Evita o setState síncrono dentro do useEffect (cascading renders).
  if (state.key !== fetchKey) {
    setState({ key: fetchKey, data: null, loading: true, error: null });
  }

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setState({ key: fetchKey, data: result, loading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ key: fetchKey, data: null, loading: false, error: err });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKey]);

  return { data: state.data, loading: state.loading, error: state.error };
}
