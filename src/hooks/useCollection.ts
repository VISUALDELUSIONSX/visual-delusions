import { useEffect, useState } from 'react';
import { db } from '../services/firebase';

const useCollection = <T>(path: string) => {
  type Item = T & { id: string };
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unsubscribe, setUnsubscribe] = useState<() => void>();

  useEffect(() => {
    try {
      const unsubscribe = db.collection(path).onSnapshot((snap) => {
        const categories = snap.docs.map((doc) => ({
          ...(doc.data() as T),
          id: doc.id,
        }));
        setData(categories);
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
  }, []);

  return [data, loading, error] as [Item[], boolean, string];
};

export default useCollection;
