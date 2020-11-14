import React from 'react';
import Team from './Team';
import Search from './Search';
import TeamList from './TeamList'
import { Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10
  }
}));

export default function Page(){

  const classes = useStyles();
  const [team, setTeam] = React.useState(
    () => {
      let tmp = new Array(6);
      for (var i = 0; i < 6; i++) {
        tmp[i] = {
          'selfId': undefined,
          'selfData': {
            super_awoken: [],
            awoken: [],
            type: []
          },
          'selfConfig': {
            awokenNum: 0,
            superAwoken: "unknown",
          },
          'selfSelected': false,
          'inheritId': undefined,
          'inheritData': {
            super_awoken: [],
            awoken: []
          },
          'inheritSelected': false,
        };
      }
      return tmp;
    }
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} lg={6}>
          <Team teamData={team} onChange={setTeam} />
        </Grid>
        <Grid item xs={12} lg={6}>
          {/* <Search teamData={team} onChange={setTeam} /> */}
          <TeamList onChange={setTeam}/>
        </Grid>
      </Grid>
    </DndProvider>
  )
}