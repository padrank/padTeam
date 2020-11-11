import React from 'react';
import Team from './Team';
import Search from './Search';
import { Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/core/styles';

export default function Page(){


  const [team, setTeam] = React.useState(Array(6).fill({
    'selfId': undefined,
    'selfData': {
      super_awoken: [],
      awoken: []
    },
    'selfConfig': {
      awokenNum: 0,
      superAwoken: "unknown",
    },
    'selfSelected': false,
    'inheritId': undefined,
    'inheritData': undefined,
    'inheritSelected': false,
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3}>
        <Grid item xs={6} className="team">
          <Team teamData={team} onChange={setTeam} />
        </Grid>
        <Grid item xs={6} className="search">
          <Search teamData={team} onChange={setTeam} />
        </Grid>
      </Grid>
    </DndProvider>
  )
}