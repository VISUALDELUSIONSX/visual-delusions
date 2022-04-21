import { useEffect, useState } from 'react';
import { db } from '../services/firebase';

const useDoc = <T>(path: string) => {
  type Item = T & { id: string };
  const [data, setData] = useState<Item | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unsubscribe, setUnsubscribe] = useState<() => void>();

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    setError('');
    unsubscribe?.();
    try {
      let query = db.doc(path);
      const unsubscribe = query.onSnapshot((doc) => {
        const data = {
          ...(doc.data() as T),
          id: doc.id,
        };
        setData(data);
        setLoading(false);
      });
      setUnsubscribe(() => unsubscribe);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
      setLoading(false);
    }

    return () => {
      unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return [data, loading, error] as [Item | undefined, boolean, string];
};

export default useDoc;
