import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Calendar() {
  const classes = useStyles();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  let curr_date = tomorrow.getDate();
  let curr_month = tomorrow.getMonth();
  let curr_year = tomorrow.getFullYear();

  let dateString = curr_date + "-" + curr_month + "-" + curr_year;
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Book Appointment"
        type="datetime-local"
        defaultValue= {dateString}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
