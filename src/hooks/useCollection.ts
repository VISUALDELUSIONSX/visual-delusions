import { useEffect, useState } from 'react';
import { db, Query, WhereFilterOp } from '../services/firebase';

interface UseCollectionOptions {
  where?: [string, WhereFilterOp, string];
}

const useCollection = <T>(path: string, options?: UseCollectionOptions) => {
  type Item = T & { id: string };
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unsubscribe, setUnsubscribe] = useState<() => void>();

  useEffect(() => {
    setData([]);
    setError('');
    unsubscribe?.();
    try {
      let query: Query = db.collection(path);
      if (options?.where)
        query = query.where(
          options.where[0],
          options.where[1],
          options.where[2]
        );
      const unsubscribe = query.onSnapshot((snap) => {
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
  }, [path, options?.where?.[0], options?.where?.[1], options?.where?.[2]]);

  return [data, loading, error] as [Item[], boolean, string];
};

export default useCollection;
