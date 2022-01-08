import React, { useState } from 'react';
import CategoryDeleteDialog from '../components/CategoryDeleteDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { db } from '../services/firebase';
import { setIsCategoryDeleteDialogOpen } from '../store/simpleValuesSlice';

const CategoryDeleteDialogContainer = () => {
  const [loading, setLoading] = useState(false);
  const open = useAppSelector(
    (state) => state.simpleValues.isCategoryDeleteDialogOpen
  );
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setIsCategoryDeleteDialogOpen(false));
  const handleSubmit = async () => {
    setLoading(true);
    open && (await db.doc(`categories/${open.id}`).delete());
    setLoading(false);
    handleClose();
  };

  return (
    <CategoryDeleteDialog
      name={(open && open.name) || ''}
      open={!!open}
      onClose={handleClose}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};

export default CategoryDeleteDialogContainer;
