import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import imgPath from './data/imgPath.json';
import { Config } from './Config';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translate(3px, 50px)',
    },
    imgContainer: {
      position: 'absolute',
      zIndex: 1,
    },
    square: {
      backgroundColor: '#f0f0f0',
      width: 13,
      height: 13,
      margin: 1,
      zIndex: 0,
      display: 'inline-block',
      borderRadius: 3,
    },
    dialogImgContainer: {
      position: 'absolute',
      zIndex: 1,
    },
    dialogSquare: {
      backgroundColor: '#f0f0f0',
      width: 28,
      height: 28,
      margin: 1,
      zIndex: 0,
      display: 'inline-block',
      borderRadius: 3,
    },
    dialogSelectedContainer: {
      margin: 'auto',
      width: 'fit-content',
      padding: 10
    },
    dialogCandidatesContainer: {
      textAlign: 'center',
      padding: 10
    }
  })
);

export default function PotentialAwoken(props) {

  const classes = useStyles();

  const [potentialAwokens, setPotentialAwokens] = React.useState([]);
  const [potentialAwokenDialogOpen, setPotentialAwokenDialogOpen] = React.useState(false);

  const addPotentialAwoken = (e) => {
    let currentSum = 0;
    potentialAwokens.map((pa) => {
      currentSum += Config.potentialAwokenLength[pa];
    })
    if (currentSum + Config.potentialAwokenLength[e.currentTarget.value] <= 8) {
      let tmp = [e.currentTarget.value].concat(potentialAwokens);
      tmp.sort((a, b) => {
        return Config.potentialAwokenLength[b] - Config.potentialAwokenLength[a]
      })
      setPotentialAwokens(tmp);
    }
  }
  const removePotentialAwoken = (e) => {
    const index = potentialAwokens.indexOf(e.currentTarget.value);
    const tmp = potentialAwokens.slice()
    if (index > -1) {
      tmp.splice(index, 1);
      setPotentialAwokens(tmp);
    }
  }

  return (
    <div>
      <div className={classes.root} onClick={() => setPotentialAwokenDialogOpen(true)}>
        <div className={classes.imgContainer}>
          {potentialAwokens.map((pa) => {
            return (
              <img src={imgPath.potential[pa]} alt="" width={Config.potentialAwokenLength[pa] * 15} height={15}/>
            )
          })}
        </div>
        <div className={classes.squareContainer}>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
          <span className={classes.square}></span>
        </div>
      </div>
      <Dialog
        open={potentialAwokenDialogOpen}
        onClose={() => setPotentialAwokenDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Potential awoken"}</DialogTitle>
        <DialogContent>
          <div className={classes.dialogSelectedContainer}>
            <div className={classes.dialogImgContainer}>
              {potentialAwokens.map((pa) => {
                return (
                  <ButtonBase onClick={removePotentialAwoken} value={pa}>
                    <img src={imgPath.potential[pa]} alt="" width={Config.potentialAwokenLength[pa] * 30} height={30}/>
                  </ButtonBase>
                )
              })}
            </div>
            <div className={classes.dialogSquareContainer}>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
              <span className={classes.dialogSquare}></span>
            </div>
          </div>
          <Paper className={classes.dialogCandidatesContainer}>
            {
              Object.keys(imgPath.potential).map((pa) => {
                return (
                  <ButtonBase style={{margin: 2}} onClick={addPotentialAwoken} value={pa}>
                    <img src={imgPath.potential[pa]} alt="" width={Config.potentialAwokenLength[pa] * 25} height={25}/>
                  </ButtonBase>
                )
              })
            }
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPotentialAwokenDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
