import React, { useState } from 'react';
import ShopItemDeleteDialog from '../components/ShopItemDeleteDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { db, storage } from '../services/firebase';
import { setIsShopItemDeleteDialogOpen } from '../store/simpleValuesSlice';

const ShopItemDeleteDialogContainer = () => {
  const [loading, setLoading] = useState(false);
  const open = useAppSelector(
    (state) => state.simpleValues.isShopItemDeleteDialogOpen
  );
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setIsShopItemDeleteDialogOpen(false));
  const handleSubmit = async () => {
    setLoading(true);
    if (!open) return;
    await db.doc(`shop_items/${open.id}`).delete();
    open.images?.forEach((image) => {
      storage.ref(`shop_items/${open.id}/${image.id}`).delete();
    });
    setLoading(false);
    handleClose();
  };

  return (
    <ShopItemDeleteDialog
      name={(open && open.name) || ''}
      open={!!open}
      onClose={handleClose}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};

export default ShopItemDeleteDialogContainer;
