import { useState } from 'react';
import CategoryAddDialog from '../components/CategoryAddDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { db, storage } from '../services/firebase';
import { setIsCategoryAddDialogOpen } from '../store/simpleValuesSlice';
import { DBCategory } from '../types/client';

const CategoryAddDialogContainer = () => {
  const open = useAppSelector(
    (state) => state.simpleValues.isCategoryAddDialogOpen
  );
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setIsCategoryAddDialogOpen(false));
  const [loading, setLoading] = useState(false);

  return (
    <CategoryAddDialog
      open={open}
      onClose={handleClose}
      loading={loading}
      onSubmit={async (data) => {
        setLoading(true);
        const category: DBCategory = {
          name: data.name,
          slug: data.slug,
          image: null,
        };
        if (data.img && !('src' in data.img)) {
          const snap = await storage
            .ref(`categories/${data.img.id}`)
            .put(data.img);
          const src = await snap.ref.getDownloadURL();
          category.image = { src, id: data.img.id };
        } else {
          !data.img &&
            typeof open === 'object' &&
            open.image &&
            (await storage.ref(`categories/${open.image.id}`).delete());
          category.image = data.img || null;
        }
        (typeof open === 'object'
          ? db.doc(`categories/${open.id}`).update(category)
          : db.doc(`categories/${category.slug}`).set(category)
        )
          .then(() => {
            setLoading(false);
            handleClose();
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
      }}
    />
  );
};

export default CategoryAddDialogContainer;
