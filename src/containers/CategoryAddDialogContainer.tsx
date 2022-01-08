import { useState } from 'react';
import CategoryAddDialog from '../components/CategoryAddDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { db, storage } from '../services/firebase';
import { setIsCategoryAddDialogOpen } from '../store/simpleValuesSlice';
import { replaceUndefinedValues } from '../utils';

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
        console.log(data);
        const category = { ...data };
        if (data.img) {
          const snap = await storage
            .ref(`categories/${data.img.id}`)
            .put(data.img);
          const src = await snap.ref.getDownloadURL();
          category.img = src;
        }
        db.collection('categories')
          .add(replaceUndefinedValues(category))
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
