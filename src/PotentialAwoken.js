import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import imgPath from './data/imgPath.json';
import { Config } from './Config';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, ButtonBase } from '@material-ui/core';

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
    },
    opacity3 :{
      opacity: 0.3,
    },
    opacity10 :{
      opacity: 1,
    },
  })
);

export default function PotentialAwoken(props) {

  const classes = useStyles();

  const [potentialAwokens, setPotentialAwokens] = React.useState([]);
  const [potentialAwokenDialogOpen, setPotentialAwokenDialogOpen] = React.useState(false);
  const [potentialAwokensAbility, setPotentialAwokensAbility] = React.useState({});

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

  useEffect(() =>{
    const checkPotentialAwokenAvaliable = (pa) => {
      if (pa === '神キラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('惡魔') || props.data.selfData.type.includes('機械');
      }
      else if (pa === 'ドラゴンキラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('回復');
      }
      else if (pa === '悪魔キラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('神') || props.data.selfData.type.includes('攻擊');
      }
      else if (pa === 'マシンキラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('體力') || props.data.selfData.type.includes('龍');
      }
      else if (pa === 'バランスキラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('機械');
      }
      else if (pa === '攻撃キラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('回復');
      }
      else if (pa === '体力キラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('攻擊');
      }
      else if (pa === '回復キラー') {
        return props.data.selfData.type.includes('平衡') || props.data.selfData.type.includes('體力') || props.data.selfData.type.includes('龍');
      }
      else if (pa === 'ダメージ吸収貫通'){
        return props.data.selfData.awoken.includes('コンボドロップ生成') || (props.data.selfConfig.superAwoken === 'コンボドロップ生成') || (props.data.inheritData.awoken[0] === '覚醒アシスト' && props.data.inheritData.awoken.includes('コンボドロップ生成'));
      }
      else if (pa === '消せないドロップ回復'){
        return props.data.selfData.awoken.includes('2体攻撃') || (props.data.selfConfig.superAwoken === '2体攻撃') || (props.data.inheritData.awoken[0] === '覚醒アシスト' && props.data.inheritData.awoken.includes('2体攻撃'));
      }
      else if (pa === 'ルーレット回復'){
        return props.data.selfData.awoken.includes('バインド回復') || (props.data.selfConfig.superAwoken === 'バインド回復') || (props.data.inheritData.awoken[0] === '覚醒アシスト' && props.data.inheritData.awoken.includes('バインド回復'));
      }
      else {
        return true;
      }
    }



    let tmp = {};
    if (props.data.selfId === undefined) {
      Object.keys(imgPath.potential).map((pa) => {
        tmp[pa] = false;
      })
    }
    else {
      Object.keys(imgPath.potential).map((pa) => {
        tmp[pa] = checkPotentialAwokenAvaliable(pa);
      })
    }

    setPotentialAwokensAbility(tmp);
    console.log(tmp)
  }, [props.data])

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
                  <ButtonBase style={{margin: 2}} onClick={addPotentialAwoken} value={pa} disabled={!potentialAwokensAbility[pa]}>
                    <img src={imgPath.potential[pa]} alt="" width={Config.potentialAwokenLength[pa] * 25} height={25} className={potentialAwokensAbility[pa] ? classes.opacity10 : classes.opacity3}/>
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
