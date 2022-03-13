import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React from 'react'

const DialogAlert = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>No</Button>
        <Button onClick={props.handleOpen} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlert
