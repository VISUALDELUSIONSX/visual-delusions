import { useState } from 'react';
import AddCategoryDialog from '../components/AddCategoryDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { db, storage } from '../services/firebase';
import { setIsAddCategoryDialogOpen } from '../store/simpleValuesSlice';

const AddCategoryDialogContainer = () => {
  const open = useAppSelector(
    (state) => state.simpleValues.isAddCategoryDialogOpen
  );
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setIsAddCategoryDialogOpen(false));
  const [loading, setLoading] = useState(false);

  return (
    <AddCategoryDialog
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
          .add(category)
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

export default AddCategoryDialogContainer;
