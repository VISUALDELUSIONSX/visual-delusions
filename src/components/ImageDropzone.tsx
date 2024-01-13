import {
  Button,
  CircularProgress,
  Dialog,
  Fab,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';
import { FileWithId } from '../types/client';
import imageCompression from 'browser-image-compression';
import convert from 'heic-convert';

const useStyles = makeStyles(() => ({
  thumbsContainer: {
    marginTop: 16,
  },
  thumbInner: {
    border: '1px solid #eaeaea',
    position: 'relative',
    width: 100,
    height: 100,
  },
  img: {
    objectFit: 'cover',
    display: 'block',
    width: '100%',
    height: '100%',
  },
  dropZone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#555',
    borderStyle: 'dashed',
    backgroundColor: '#333',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
  container: {
    padding: '16px',
    border: '1px solid #555',
    borderRadius: '3px',
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

export interface ImageDropzoneProps {
  options?: DropzoneOptions;
  onUpload?: (files: any[]) => any;
  onClose?: () => any;
  onDrop?: (files: FileWithId[]) => any;
  onFilesChange?: (files: FileWithId[]) => any;
  singleImage?: boolean;
  defaultImages?: FileWithId[];
  defaultImagesLoading?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  options,
  onUpload,
  onClose,
  onFilesChange,
  onDrop,
  singleImage,
  defaultImages,
  defaultImagesLoading,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loadingOptimization, setLoadingOptimization] = useState(false);
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, .heic',
    maxFiles: singleImage ? 1 : undefined,
    onDrop: async (acceptedFiles) => {
      const newAcceptedFiles = [];
      setLoadingOptimization(true);
      for (const file of acceptedFiles) {
        let newFile: any = file;
        const split = file.name.split('.');
        const fileType = split[split.length - 1].toLowerCase();
        if (fileType === 'heic') {
          const arrayBuffer = await file.arrayBuffer();
          const outputBuffer: Buffer = await convert({
            buffer: Buffer.from(arrayBuffer),
            format: 'JPEG',
            quality: 1,
          });
          newFile = new Blob([outputBuffer], {
            type: 'image/jpeg',
          });
          newFile.name = 'name.jpeg';
        }
        const compressedFile = await imageCompression(newFile, {
          maxSizeMB: 0.7,
          maxWidthOrHeight: 1920,
        });
        newAcceptedFiles.push(
          Object.assign(compressedFile, {
            preview: URL.createObjectURL(compressedFile),
            id: uuid(),
          })
        );
      }
      const newFiles = [...(singleImage ? [] : files), ...newAcceptedFiles];
      setLoadingOptimization(false);
      onDrop?.(newFiles);
      setFiles(newFiles);
    },
    ...options,
  });

  useEffect(() => {
    onFilesChange?.(files);
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    defaultImages && setFiles(defaultImages);
  }, [defaultImages]);

  return defaultImagesLoading ? (
    <Grid container justifyContent='center'>
      <CircularProgress />
    </Grid>
  ) : (
    <section className={classes.container}>
      <Dialog maxWidth='sm' fullWidth open={loadingOptimization}>
        <div style={{ padding: '1rem' }}>
          <Typography variant='h4' align='center'>
            Optimization in Progress
          </Typography>
          <Typography gutterBottom align='center'>
            We are optimizing your images before uploading
          </Typography>
          <Grid container justifyContent='center'>
            <CircularProgress />
          </Grid>
        </div>
      </Dialog>
      <div {...getRootProps({ className: classes.dropZone })}>
        <input {...getInputProps()} />
        <p>
          {singleImage
            ? "Drag 'n' drop an image here, or click to select an image"
            : "Drag 'n' drop some images here, or click to select images"}
        </p>
      </div>
      <aside className={classes.thumbsContainer}>
        <Grid container spacing={1}>
          {files.map((file) => (
            <Grid item key={file.id}>
              <div className={classes.thumbInner}>
                <img src={file.preview} className={classes.img} alt='' />
                <Tooltip
                  title='Remove'
                  className={classes.delete}
                  onClick={() =>
                    setFiles((prev) => prev.filter((f) => f.id !== file.id))
                  }
                >
                  <Fab
                    color='default'
                    size='small'
                    style={{ height: '36px', width: '36px' }}
                  >
                    <CloseIcon fontSize='small' />
                  </Fab>
                </Tooltip>
              </div>
            </Grid>
          ))}
        </Grid>
      </aside>

      <Grid container spacing={1}>
        {onClose && (
          <Grid item>
            <Button size='small' onClick={onClose} variant='contained'>
              Close
            </Button>
          </Grid>
        )}

        {onUpload && !!files.length && (
          <Grid item>
            <Button
              size='small'
              onClick={() => {
                onUpload?.(files);
                onClose && onClose();
              }}
              variant='contained'
              color='primary'
            >
              Upload
            </Button>
          </Grid>
        )}
      </Grid>
    </section>
  );
};
export default ImageDropzone;
