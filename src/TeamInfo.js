import React, { useEffect } from 'react';
import TeamMember from './TeamMember';
import { Grid, Paper, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    backgroundColor: '#f7f7f7'
  }

}))

export default function TeamInfo(props) {

  const classes = useStyles();
  const [awokenSummary, setAwokenSummary] = React.useState({});

  useEffect(() => {
    let tmp = {};
    props.data.forEach(d => {
      d.selfData.awoken.forEach(a => {
        if (a in tmp) {
          tmp[a] += 1;
        }
        else {
          tmp[a] = 1;
        }
      })
    });
    setAwokenSummary(tmp);
  }, [props.data])

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
      </div>

    </Paper>
  )
}