import {
  alpha,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { theme } from '../theme';
import Bar from './Bar';
import NeonTypography from './NeonTypography';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import NeonButton from './NeonButton';

const useStyles = makeStyles(() => ({
  priceRangeValueLabel: {
    top: 20,
    '& *': {
      background: 'transparent',
    },
  },
}));

interface Props {
  categories: { value: string; label: string }[];
  defaultCategory?: string;
}

const ShopFilter: React.FC<Props> = ({ categories, defaultCategory }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [category, setCategory] = useState(defaultCategory || '');
  const classes = useStyles();

  return (
    <Card
      style={{
        boxShadow: `2px 2px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
      }}
    >
      <CardContent>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <NeonTypography color='primary' variant='h4' align='center'>
              FILTER
            </NeonTypography>
            <Bar
              style={{ height: '2px', width: '75px', marginTop: '0.5rem' }}
            />
          </Grid>

          <Grid item>
            <FormControl component='fieldset'>
              <FormLabel
                style={{ color: 'white', marginBottom: '0.5rem' }}
                component='legend'
              >
                Category
              </FormLabel>
              <Bar
                style={{ height: '2px', width: '50px', marginBottom: '0.5rem' }}
                color='secondary'
                align='left'
              />
              <RadioGroup
                aria-label='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name='radio-buttons-group'
              >
                <FormControlLabel
                  value={''}
                  control={<Radio />}
                  label={<Typography variant='body2'>All</Typography>}
                />
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.value}
                    value={category.value}
                    control={<Radio />}
                    label={
                      <Typography variant='body2'>{category.label}</Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography>Price</Typography>
            <Bar
              style={{ height: '2px', width: '50px', marginBottom: '0.5rem' }}
              color='secondary'
              align='left'
            />
            <div style={{ boxSizing: 'content-box', padding: '0 8px' }}>
              <Slider
                color='secondary'
                value={priceRange}
                onChange={(_, val) => setPriceRange(val as number[])}
                valueLabelDisplay='on'
                step={10}
                marks
                min={0}
                max={200}
                classes={{ valueLabel: classes.priceRangeValueLabel }}
                style={{ marginBottom: '0.5rem' }}
              />
            </div>
          </Grid>
          <Grid item style={{ alignSelf: 'center' }}>
            <NeonButton variant='outlined' color='primary'>
              Filter
            </NeonButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShopFilter;
