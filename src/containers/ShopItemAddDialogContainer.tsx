import { diff } from 'deep-diff';
import { useEffect, useState } from 'react';
import ShopItemAddDialog from '../components/ShopItemAddDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import useCollection from '../hooks/useCollection';
import { db, storage } from '../services/firebase';
import { setIsShopItemAddDialogOpen } from '../store/simpleValuesSlice';
import { Category, DBShopItem, FileWithIdAndSrc } from '../types/client';
import { v4 as uuid } from 'uuid';

const ShopItemAddDialogContainer = () => {
  const open = useAppSelector(
    (state) => state.simpleValues.isShopItemAddDialogOpen
  );
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setIsShopItemAddDialogOpen(false));
  const [loading, setLoading] = useState(false);
  const [categories] = useCollection<Category>('categories');
  const [imageFiles, setImageFiles] = useState<FileWithIdAndSrc[]>([]);
  const [imageFilesLoading, setImageFilesLoading] = useState(false);
  const id = typeof open === 'object' && open.id;

  const getImageFiles = async () => {
    if (typeof open === 'object' && open.images?.length) {
      try {
        setImageFilesLoading(true);
        const snap = await storage.ref(`shop_items/${open.id}`).listAll();
        const images: FileWithIdAndSrc[] = [];
        for (const item of snap.items) {
          const imageId = item.fullPath.split('/')[2];
          images.push(
            await item.getDownloadURL().then(async (src) => {
              const res = await fetch(src);
              const blob = await res.blob();
              return Object.assign(blob, {
                id: imageId,
                preview: src,
                src,
              }) as unknown as FileWithIdAndSrc;
            })
          );
        }
        const filteredAndOrderedImages = open.images.map(
          (x) => images.find((image) => image.id === x.id)!
        );
        setImageFiles(filteredAndOrderedImages);
        setImageFilesLoading(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      setImageFiles([]);
    }
  };

  useEffect(() => {
    getImageFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ShopItemAddDialog
      open={open}
      defaultImages={imageFiles}
      defaultImagesLoading={imageFilesLoading}
      onClose={handleClose}
      loading={loading}
      onSubmit={async (data) => {
        setLoading(true);
        const shopItem: DBShopItem = {
          ...data,
          price: +data.price,
          images:
            data.images?.map((image) => ({
              id: image.id,
              alt: '',
              src: image.src || '',
            })) || [],
        };
        const shopItemId = typeof open === 'object' ? open.id : uuid();

        const imagesAreEdited =
          typeof open === 'object' && diff(open.images, data.images);
        const imagesAreAdded = typeof open === 'boolean' && data.images?.length;

        if (imagesAreAdded) {
          const promises = [];
          for (const image of data.images || []) {
            promises.push(
              storage.ref(`shop_items/${shopItemId}/${image.id}`).put(image)
            );
          }
          const imageSnaps = await Promise.all(promises);
          const imageSrcPromises = [];
          for (const snap of imageSnaps) {
            imageSrcPromises.push(snap.ref.getDownloadURL());
          }
          const imageSrcs = await Promise.all(imageSrcPromises);
          const images = imageSrcs.map((src, i) => ({
            src,
            alt: '',
            id: data.images?.[i].id || '',
          }));
          shopItem.images = images;
        }

        if (imagesAreEdited && typeof open === 'object') {
          const before =
            (typeof open === 'object' &&
              open.images?.map((image) => ({ id: image.id }))) ||
            [];
          const after = data.images?.map((image) => ({ id: image.id })) || [];
          const differences = diff(before, after) || [];

          for (const d of differences) {
            // is it moved, deleted, or added

            if (d.kind === 'A') {
              if (d.item.kind === 'N') {
                const diffItem = d.item.rhs as unknown as { id: string };
                if (before.some((item) => item.id === diffItem.id)) continue;
                // added KEEP THIS COMMENT
                const imageFile = data.images!.find(
                  (image) => image.id === diffItem.id
                )!;
                const snap = await storage
                  .ref(`shop_items/${open.id}/${diffItem.id}`)
                  .put(imageFile);
                const src = await snap.ref.getDownloadURL();
                shopItem.images = shopItem.images?.map((image) => {
                  if (image.id !== diffItem.id) return image;
                  return { ...image, src };
                });
              }

              if (d.item.kind === 'D') {
                const diffItem = d.item.lhs as unknown as { id: string };
                if (after.some((item) => item.id === diffItem.id)) continue;
                // deleted KEEP THIS COMMENT
                shopItem.images = shopItem.images
                  ?.filter((image) => image.id !== diffItem.id)
                  .map((image) => ({ ...image, src: image.src || '' }));
                storage.ref(`shop_items/${open.id}/${diffItem.id}`);
              }
            }

            if (d.kind === 'E' && d.path?.[1] === 'id') {
              const lhs = d.lhs as unknown as string;
              if (after.some((item) => item.id === lhs)) continue;
              // deleted KEEP THIS COMMENT
              shopItem.images = shopItem.images
                ?.filter((image) => image.id !== lhs)
                .map((image) => ({ ...image, src: image.src || '' }));
              storage.ref(`shop_items/${open.id}/${lhs}`);

              const rhs = d.rhs as unknown as string;
              if (before.some((item) => item.id === rhs)) continue;
              // added KEEP THIS COMMENT
              const imageFile = data.images!.find((image) => image.id === rhs)!;
              const snap = await storage
                .ref(`shop_items/${open.id}/${rhs}`)
                .put(imageFile);
              const src = await snap.ref.getDownloadURL();
              shopItem.images = shopItem.images?.map((image) => {
                if (image.id !== rhs) return image;
                return { ...image, src };
              });
            }
          }
        }

        await db.doc(`shop_items/${shopItemId}`).set(shopItem, { merge: true });
        setLoading(false);
        handleClose();
      }}
      categories={categories}
    />
  );
};

export default ShopItemAddDialogContainer;
