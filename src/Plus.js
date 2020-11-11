import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Badge, Typography, ButtonBase, TextField, InputAdornment } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  plus: {
    color: '#feff04',
    WebkitTextStroke: '0.75px black',
    fontSize: 15,
    fontWeight: 900,
    textAlign: "left"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100px',
  },
}));

export default function Plus(props) {

  const classes = useStyles()

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [plusValue, setPlusValue] = React.useState({'hp': 99, 'attack': 99, 'heal': 99});

  const handlePlusChange = (newPlusValue) => {
    newPlusValue.hp = newPlusValue.hp > 99 ? 99 : newPlusValue.hp;
    newPlusValue.attack = newPlusValue.attack > 99 ? 99 : newPlusValue.attack;
    newPlusValue.heal = newPlusValue.heal > 99 ? 99 : newPlusValue.heal;

    newPlusValue.hp = newPlusValue.hp < 0 ? 0 : newPlusValue.hp;
    newPlusValue.attack = newPlusValue.attack < 0 ? 0 : newPlusValue.attack;
    newPlusValue.heal = newPlusValue.heal < 0 ? 0 : newPlusValue.heal;

    setPlusValue(newPlusValue);
  }

  return(
    <div>
      <Typography className={classes.plus} onClick={() => setDialogOpen(true)}>
        {
          `+${plusValue.hp + plusValue.attack + plusValue.heal}`
        }
      </Typography>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Plus value"}</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="HP"
              type="Number"
              className={classes.textField}
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>,
              }}
              value={plusValue.hp}
              variant="outlined"
              onChange={(e) => handlePlusChange({'hp': parseInt("0" + e.target.value), 'attack': plusValue.attack, 'heal': plusValue.heal})}
            />
            <TextField
              label="Attack"
              type="Number"
              className={classes.textField}
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>,
              }}
              value={plusValue.attack}
              variant="outlined"
              onChange={(e) => handlePlusChange({'hp': plusValue.hp, 'attack': parseInt("0" + e.target.value), 'heal': plusValue.heal})}
            />
            <TextField
              label="Heal"
              type="Number"
              className={classes.textField}
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>,
              }}
              value={plusValue.heal}
              onChange={(e) => handlePlusChange({'hp': plusValue.hp, 'attack': plusValue.attack, 'heal': parseInt("0" + e.target.value)})}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}