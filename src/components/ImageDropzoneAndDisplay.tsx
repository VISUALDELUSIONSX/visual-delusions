import React, { HTMLProps, useState } from 'react';
import ImageDropzone, { ImageDropzoneProps } from './ImageDropzone';
import noImage from '../images/no-image.png';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

interface Props {
  editable?: boolean;
  image?: string;
  alt?: string;
  DropzoneProps?: ImageDropzoneProps;
  imgProps?: HTMLProps<HTMLImageElement> & {
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
  };
  containerProps?: HTMLProps<HTMLDivElement>;
}

const ImageDropzoneAndDisplay: React.FC<Props> = (props) => {
  const [editing, setEditing] = useState(false);

  const {
    editable,
    imgProps,
    DropzoneProps,
    containerProps,
    image,
    alt = '',
  } = props;

  return (
    <div
      {...containerProps}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...containerProps?.style,
      }}
    >
      {editable && !editing && (
        <IconButton
          style={{
            top: 5,
            left: 5,
            position: 'absolute',
            background: 'black',
            color: 'white',
            border: '2px solid white',
          }}
          onClick={() => setEditing(true)}
        >
          <Edit fontSize='medium' />
        </IconButton>
      )}
      {editing ? (
        <ImageDropzone onClose={() => setEditing(false)} {...DropzoneProps} />
      ) : (
        <img
          src={image || noImage}
          alt={alt}
          {...imgProps}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...imgProps?.style,
          }}
        />
      )}
    </div>
  );
};

export default ImageDropzoneAndDisplay;
