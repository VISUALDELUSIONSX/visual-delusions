import ImageDropzoneAndDisplay from '../components/ImageDropzoneAndDisplay';
import { useAppSelector } from '../hooks/useAppSelector';
import useDoc from '../hooks/useDoc';
import { db, storage } from '../services/firebase';

interface Props {
  storagePath: string;
  docPath: string;
  field: string;
}

const ImageDropzoneAndDisplayContainer: React.FC<Props> = ({
  storagePath,
  docPath,
  field,
}) => {
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);
  const [doc] = useDoc<{ [field: string]: string }>(docPath);

  const handleUploadImage = async (file: Blob) => {
    const snap = await storage.ref(`${storagePath}/${field}`).put(file);
    const src = await snap.ref.getDownloadURL();
    await db.doc(docPath).set({ [field]: src }, { merge: true });
  };

  return (
    <ImageDropzoneAndDisplay
      DropzoneProps={{
        onUpload: (files) => files[0] && handleUploadImage(files[0]),
      }}
      image={doc?.[field]}
      editable={isAdmin}
    />
  );
};

export default ImageDropzoneAndDisplayContainer;
