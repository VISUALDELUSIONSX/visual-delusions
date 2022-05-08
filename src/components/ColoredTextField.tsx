import { TextField, TextFieldProps, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

type Props = Omit<TextFieldProps, 'color'> & { color: string };

const useStyles = makeStyles<Theme, { color: string }>(() => ({
  root: {
    '& label.Mui-focused': {
      color: (props) => props.color,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: (props) => props.color,
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: (props) => props.color,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: (props) => props.color,
      },
    },
  },
}));

const ColoredTextField: React.FC<Props> = (props) => {
  const { color, ...rest } = props;
  const classes = useStyles({ color });
  return <TextField classes={{ root: classes.root }} {...rest} />;
};

export default ColoredTextField;
