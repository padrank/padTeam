import React, { useEffect } from 'react';
import TeamMember from './TeamMember';
import { Grid, Paper, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import imgPath from './data/imgPath.json';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    width: 600,
    padding: '10px 20px 60px 20px',
  },
  selfLeaderSkill: {
    margin: 10
  },
  friendLeaderSkill: {
    margin: 10
  },
  awokensDiv: {
    margin: 10,
    textAlign: 'center'
  },
  awokensPaper: {
    margin: 4,
    padding: 4,
    backgroundColor: '#f7f7f7',
    fontSize: 8,
  }

}))

const AwokenTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function TeamInfo(props) {

  const classes = useStyles();
  const [awokenSummary, setAwokenSummary] = React.useState({});

  useEffect(() => {
    let tmp = {};
    props.data.forEach(d => {
      // self awoken
      d.selfData.awoken.forEach((a, i) => {
        if (i < d.selfConfig.awokenNum){
          if (a in tmp) {
            tmp[a] += 1;
          }
          else {
            tmp[a] = 1;
          }
        }
      })

      // self super awoken
      if (d.selfConfig.superAwoken !== 'unknown') {
        if (d.selfConfig.superAwoken in tmp) {
          tmp[d.selfConfig.superAwoken] += 1;
        }
        else {
          tmp[d.selfConfig.superAwoken] = 1;
        }
      }

      // inherit awoken
      let inheritAwokenFlag = false;
      d.inheritData.awoken.forEach((a, i) => {
        if (i === 0 && a === '覚醒アシスト') {
          inheritAwokenFlag = true;
        }
        if (inheritAwokenFlag){
          if (a in tmp) {
            tmp[a] += 1;
          }
          else {
            tmp[a] = 1;
          }
        }
      })
    });
    setAwokenSummary(tmp);
  }, [props.data])

  const awokenInfo = (awokenName, awokenEqualList, prefix='', postfix='', upperBound=100, lowerBound=0, showWarning=false) => {
    // awokenEqualList:
    // [{
    //   name: <name>,
    //   value: <value>,
    //   count: <count>
    // }]

    let sumValue = 0;
    awokenEqualList.map((a) => {
      sumValue += parseInt(a.value) * parseInt(a.count);
    })
    sumValue = sumValue > upperBound ? upperBound : sumValue;
    sumValue = sumValue < lowerBound ? lowerBound : sumValue;

    let fontColor = 'black';
    if (showWarning) {
      if (sumValue < upperBound*0.5){
        fontColor = '#dc3545';
      }
      else if (sumValue < upperBound*0.8) {
        fontColor = '#ffc107';
      }
      else {
        fontColor = '#28a745';
      }
    }

    return (
      <AwokenTooltip placement="top" title={
        <React.Fragment>
          <span>
            {
              awokenEqualList.map((a) => {
                return (
                  <span>
                    <span style={{verticalAlign: 'middle'}}>
                      <img src={imgPath.awoken[a.name]} alt="" width={20} height={20} />
                    </span>
                    <span> × {a.count} </span>
                  </span>
                )
              })
            }
          </span>
        </React.Fragment>
      }>
        <Paper className={classes.awokensPaper} style={{color: `${fontColor}`}}>
          <span>
            <span style={{verticalAlign: 'middle'}}>
              <img src={imgPath.awoken[awokenName]} alt="" width={20} height={20} />
            </span>
              <span>{` ${prefix}${sumValue}${postfix}`}</span>
          </span>
        </Paper>
      </AwokenTooltip>
    )
  }

  return (
    <Paper className={classes.root}>
      <Alert severity="info" icon={<PersonIcon fontSize="inherit" />} className={classes.selfLeaderSkill}>
        <AlertTitle><strong>Self Leader skill</strong></AlertTitle>
        {
          (props.data[0].selfData.leader_skill === undefined)
            ? <span>(No data)</span>
            : <span>{props.data[0].selfData.leader_skill.replace(/<\/?[^>]+(>|$)/g, "")}</span>
        }
      </Alert>
      <Alert severity="success" icon={<PersonOutlineIcon fontSize="inherit"/>} className={classes.friendLeaderSkill}>
        <AlertTitle><strong>Friend Leader skill</strong></AlertTitle>
        {
          (props.data[5].selfData.leader_skill === undefined)
            ? <span>(No data)</span>
            : <span>{props.data[5].selfData.leader_skill.replace(/<\/?[^>]+(>|$)/g, "")}</span>
        }
      </Alert>

      <div className={classes.awokensDiv}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {/* SB */}
          <Grid item xs={5}>
            {awokenInfo('スキルブースト', [
              {
                'name': 'スキルブースト',
                'value': '1',
                'count': parseInt(awokenSummary['スキルブースト']) || 0
              },
              {
                'name': 'スキルブースト＋',
                'value': '2',
                'count': parseInt(awokenSummary['スキルブースト＋']) || 0
              }
              ],'×')}
          </Grid>
          {/* Sx */}
          <Grid item xs={5}>
            {awokenInfo('封印耐性', [
              {
                'name': '封印耐性',
                'value': '20',
                'count': parseInt(awokenSummary['封印耐性']) || 0
              }
              ],'', '%')}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {/* 暗闇耐性 */}
          <Grid item xs={2}>
            {awokenInfo('暗闇耐性', [
              {
                'name': '暗闇耐性',
                'value': '20',
                'count': parseInt(awokenSummary['暗闇耐性']) || 0
              },
              {
                'name': '暗闇耐性＋',
                'value': '100',
                'count': parseInt(awokenSummary['暗闇耐性＋']) || 0
              }
              ],'', '%', 100, 0, true)}
          </Grid>
          {/* お邪魔耐性 */}
          <Grid item xs={2}>
            {awokenInfo('お邪魔耐性', [
              {
                'name': 'お邪魔耐性',
                'value': '20',
                'count': parseInt(awokenSummary['お邪魔耐性']) || 0
              },
              {
                'name': 'お邪魔耐性＋',
                'value': '100',
                'count': parseInt(awokenSummary['お邪魔耐性＋']) || 0
              }
              ],'', '%', 100, 0, true)}
          </Grid>
          {/* 毒耐性 */}
          <Grid item xs={2}>
            {awokenInfo('毒耐性', [
              {
                'name': '毒耐性',
                'value': '20',
                'count': parseInt(awokenSummary['毒耐性']) || 0
              },
              {
                'name': '毒耐性＋',
                'value': '100',
                'count': parseInt(awokenSummary['毒耐性＋']) || 0
              }
              ],'', '%', 100, 0, true)}
          </Grid>
          {/* 雲耐性 */}
          <Grid item xs={2}>
            {awokenInfo('雲耐性', [
              {
                'name': '雲耐性',
                'value': '100',
                'count': parseInt(awokenSummary['雲耐性']) || 0
              }
              ],'', '%', 100, 0, true)}
          </Grid>
          {/* 操作不可耐性 */}
          <Grid item xs={2}>
            {awokenInfo('操作不可耐性', [
              {
                'name': '操作不可耐性',
                'value': '100',
                'count': parseInt(awokenSummary['操作不可耐性']) || 0
              }
              ],'', '%', 100, 0, true)}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {/* 火ダメージ軽減 */}
          <Grid item xs={2}>
            {awokenInfo('火ダメージ軽減', [
              {
                'name': '火ダメージ軽減',
                'value': '7',
                'count': parseInt(awokenSummary['火ダメージ軽減']) || 0
              }
              ],'-', '%')}
          </Grid>
          {/* 水ダメージ軽減 */}
          <Grid item xs={2}>
            {awokenInfo('水ダメージ軽減', [
              {
                'name': '水ダメージ軽減',
                'value': '7',
                'count': parseInt(awokenSummary['水ダメージ軽減']) || 0
              }
              ],'-', '%')}
          </Grid>
          {/* 木ダメージ軽減 */}
          <Grid item xs={2}>
            {awokenInfo('木ダメージ軽減', [
              {
                'name': '木ダメージ軽減',
                'value': '7',
                'count': parseInt(awokenSummary['木ダメージ軽減']) || 0
              }
              ],'-', '%')}
          </Grid>
          {/* 光ダメージ軽減 */}
          <Grid item xs={2}>
            {awokenInfo('光ダメージ軽減', [
              {
                'name': '光ダメージ軽減',
                'value': '7',
                'count': parseInt(awokenSummary['光ダメージ軽減']) || 0
              }
              ],'-', '%')}
          </Grid>
          {/* 闇ダメージ軽減 */}
          <Grid item xs={2}>
            {awokenInfo('闇ダメージ軽減', [
              {
                'name': '闇ダメージ軽減',
                'value': '7',
                'count': parseInt(awokenSummary['闇ダメージ軽減']) || 0
              }
              ],'-', '%')}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {/* 火ドロップ強化 */}
          <Grid item xs={2}>
            {awokenInfo('火ドロップ強化', [
              {
                'name': '火ドロップ強化',
                'value': '7',
                'count': parseInt(awokenSummary['火ドロップ強化']) || 0
              }
              ],'+', '%')}
          </Grid>
          {/* 水ドロップ強化 */}
          <Grid item xs={2}>
            {awokenInfo('水ドロップ強化', [
              {
                'name': '水ドロップ強化',
                'value': '7',
                'count': parseInt(awokenSummary['水ドロップ強化']) || 0
              }
              ],'+', '%')}
          </Grid>
          {/* 木ドロップ強化 */}
          <Grid item xs={2}>
            {awokenInfo('木ドロップ強化', [
              {
                'name': '木ドロップ強化',
                'value': '7',
                'count': parseInt(awokenSummary['木ドロップ強化']) || 0
              }
              ],'+', '%')}
          </Grid>
          {/* 光ドロップ強化 */}
          <Grid item xs={2}>
            {awokenInfo('光ドロップ強化', [
              {
                'name': '光ドロップ強化',
                'value': '7',
                'count': parseInt(awokenSummary['光ドロップ強化']) || 0
              }
              ],'+', '%')}
          </Grid>
          {/* 闇ドロップ強化 */}
          <Grid item xs={2}>
            {awokenInfo('闇ドロップ強化', [
              {
                'name': '闇ドロップ強化',
                'value': '7',
                'count': parseInt(awokenSummary['闇ドロップ強化']) || 0
              }
              ],'+', '%')}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {/* 火属性強化 */}
          <Grid item xs={2}>
            {awokenInfo('火属性強化', [
              {
                'name': '火属性強化',
                'value': '15',
                'count': parseInt(awokenSummary['火属性強化']) || 0
              }
              ],'+', '%', 999)}
          </Grid>
          {/* 水属性強化 */}
          <Grid item xs={2}>
            {awokenInfo('水属性強化', [
              {
                'name': '水属性強化',
                'value': '15',
                'count': parseInt(awokenSummary['水属性強化']) || 0
              }
              ],'+', '%', 999)}
          </Grid>
          {/* 木属性強化 */}
          <Grid item xs={2}>
            {awokenInfo('木属性強化', [
              {
                'name': '木属性強化',
                'value': '15',
                'count': parseInt(awokenSummary['木属性強化']) || 0
              }
              ],'+', '%', 999)}
          </Grid>
          {/* 光属性強化 */}
          <Grid item xs={2}>
            {awokenInfo('光属性強化', [
              {
                'name': '光属性強化',
                'value': '15',
                'count': parseInt(awokenSummary['光属性強化']) || 0
              }
              ],'+', '%', 999)}
          </Grid>
          {/* 闇属性強化 */}
          <Grid item xs={2}>
            {awokenInfo('闇属性強化', [
              {
                'name': '闇属性強化',
                'value': '15',
                'count': parseInt(awokenSummary['闇属性強化']) || 0
              }
              ],'+', '%', 999)}
          </Grid>
        </Grid>
      </div>

      {/* <div className={classes.awokensDiv}>
        <Grid container spacing={1}>
          {
            Object.keys(awokenSummary).map((a) =>{
              return (
                <Grid item xs={2}>
                  <Paper className={classes.awokensPaper}>
                    <span style={{verticalAlign: 'middle'}}>
                      <img src={imgPath.awoken[a]} alt="" width={20} height={20} />
                    </span>
                    <span> × {awokenSummary[a]}</span>
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </div> */}

    </Paper>
  )
}