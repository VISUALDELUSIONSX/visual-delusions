import { Button, Fab, Grid, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';
import { FileWithId } from '../types/client';

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

interface Props {
  options?: DropzoneOptions;
  onUpload?: (files: any[]) => any;
  onClose?: () => any;
  onDrop?: (files: FileWithId[]) => any;
  singleImage?: boolean;
}

const DragDropZone: React.FC<Props> = ({
  options,
  onUpload,
  onClose,
  onDrop,
  singleImage,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: singleImage ? 1 : undefined,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: uuid(),
        })
      );
      onDrop?.(files);
      setFiles((prev) => [...(singleImage ? [] : prev), ...files]);
    },
    ...options,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className={classes.container}>
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
            <Button onClick={onClose} variant='contained'>
              Close
            </Button>
          </Grid>
        )}

        {onUpload && !!files.length && (
          <Grid item>
            <Button
              onClick={() => {
                onUpload(files);
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
export default DragDropZone;
