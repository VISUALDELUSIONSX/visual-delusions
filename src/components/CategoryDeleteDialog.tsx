import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme';

interface Props {
  name: string;
  open: boolean;
  onClose: () => any;
  onSubmit: () => any;
  loading: boolean;
}

const CategoryDeleteDialog: React.FC<Props> = ({
  name,
  open,
  onClose,
  onSubmit,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: '2rem' }}>
        <Typography gutterBottom variant='h4'>
          Warning
        </Typography>

        <Typography style={{ marginBottom: '1rem' }}>
          Are you sure you want delete the category "{name}"? Any items
          belonging to this category will also be deleted.
        </Typography>

        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant='contained'
              style={{ background: theme.palette.error.main, color: 'white' }}
              disabled={loading}
              onClick={onSubmit}
            >
              Delete
            </Button>
          </Grid>

          <Grid item>
            <Button disabled={loading} variant='contained' onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

export default CategoryDeleteDialog;
