import React from 'react';
import TeamMember from './TeamMember';
import { Grid, Paper, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TeamInfo from './TeamInfo';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 600,
    padding: '10px 20px 70px 20px',
  }
}))

export default function Team(props) {
  const classes = useStyles();

  const [awokenSummary, setAwokenSummary] = React.useState({});

  const handleTeamMemberClick = (i, selfSelected, inheritSelected) => {
    props.onChange(props.teamData.map((t, index) => {
      if (index === i) {
        return {
          'selfId': t.selfId,
          'selfData': t.selfData,
          'selfConfig': t.selfConfig,
          'selfSelected': selfSelected,
          'inheritId': t.inheritId,
          'inheritData': t.inheritData,
          'inheritSelected': inheritSelected,
        }
      }
      else {
        return t;
      }
    }))
  }

  const handleTeamMemberDrop = (i, isInherit, id, data) => {
    props.onChange(props.teamData.map((t, index) => {
      if (index === i) {
        return {
          'selfId': isInherit ? t.selfId : id,
          'selfData': isInherit ? t.selfData : data,
          'selfConfig': {
            'awokenNum': isInherit ? t.selfConfig.awokenNum : data.awoken.length,
            'superAwoken': t.selfConfig.superAwoken,
          },
          'selfSelected': t.selfSelected,
          'inheritId': isInherit ? id : t.inheritId,
          'inheritData': isInherit ? data : t.inheritData,
          'inheritSelected': t.inheritSelected,
        }
      }
      else {
        return t;
      }
    }))
  }

  const handleAwokensChange = (i, newAwokenNum) => {
    props.onChange(props.teamData.map((t, index) => {
      if (index === i) {
        return {
          'selfId': t.selfId,
          'selfData': t.selfData,
          'selfConfig': {
            awokenNum: newAwokenNum,
            superAwoken: t.selfConfig.superAwoken,
          },
          'selfSelected': t.selfSelected,
          'inheritId': t.inheritId,
          'inheritData': t.inheritData,
          'inheritSelected': t.inheritSelected,
        }
      }
      else {
        return t;
      }
    }))
  }

  const handleSuperAwokenChange = (i, newSuperAwoken) => {
    props.onChange(props.teamData.map((t, index) => {
      if (index === i) {
        return {
          'selfId': t.selfId,
          'selfData': t.selfData,
          'selfConfig': {
            awokenNum: t.selfConfig.awokenNum,
            superAwoken: newSuperAwoken,
          },
          'selfSelected': t.selfSelected,
          'inheritId': t.inheritId,
          'inheritData': t.inheritData,
          'inheritSelected': t.inheritSelected,
        }
      }
      else {
        return t;
      }
    }))
  }

  return (
    <List>
      <ListItem>
        <Paper className={classes.root}>
          <Grid container spacing={1}>
            {
              props.teamData.map((d, i) => {
                return (
                  <Grid item xs>
                    <TeamMember
                      data={d}
                      onClick={(selfSelected, inheritSelected) => handleTeamMemberClick(i, selfSelected, inheritSelected)}
                      onDrop={(isInherit, id, data) => handleTeamMemberDrop(i, isInherit, id, data)}
                      onSuperAwokenChange={(newSuperAwoken) => handleSuperAwokenChange(i, newSuperAwoken)}
                      onAwokenChange={(newAwokenNum) => handleAwokensChange(i, newAwokenNum)}
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </Paper>
      </ListItem>
      <ListItem>
        <TeamInfo data={props.teamData}/>
      </ListItem>
    </List>
  )
}