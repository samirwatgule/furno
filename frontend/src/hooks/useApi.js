import { useState, useEffect, useRef } from 'react';

/**
 * Data-fetching hook with instant fallback.
 *
 * Renders fallbackData immediately (no skeleton flash), then silently
 * replaces it with the API result once the promise resolves. On error,
 * keeps showing fallbackData.
 */
export default function useApi(apiFn, fallbackData = null, deps = []) {
  const [data, setData]     = useState(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [refetchCount, setRefetchCount] = useState(0);
  const apiFnRef = useRef(apiFn);

  useEffect(() => {
    apiFnRef.current = apiFn;
  });

  useEffect(() => {
    let active = true;

    apiFnRef.current()
      .then((result) => {
        if (!active) return;
        setData(result);
        setError(null);
      })
      .catch((err) => {
        if (!active || err.name === 'AbortError') return;
        console.error('[useApi]', err.message);
        setError(err.message);
        // Keep showing whatever data we already have
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchCount, ...deps]);

  return {
    data,
    loading,
    error,
    refetch: () => setRefetchCount((c) => c + 1),
  };
}
