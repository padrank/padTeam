import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, Paper, ListSubheader, ButtonBase } from '@material-ui/core';
import teams from './data/teams.json';
import TeamThumbnail from './TeamThumbnail';
import data from './data/datas.json';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



export default function SimpleAccordion(props) {
  const classes = useStyles();

  const handleTeamClick = (t) => {
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

    t.team.forEach((c, i) => {
      data.forEach(d => {
        let id = parseInt(d.name.substr(3, d.name.indexOf("-") - 4), 10);
        if (id === c.selfId) {
          tmp[i].selfData = d;
        }
        if (id === c.inheritId) {
          tmp[i].inheritData = d;
        }
      })
      tmp[i].selfId = c.selfId;
      tmp[i].selfConfig = c.selfConfig;
      tmp[i].inheritId = c.inheritId;
    });
    console.log(tmp);
    props.onChange(tmp);
  }

  return (
    <List
      subheader={
        <ListSubheader component="div" id="search-result" disableSticky>
          Team list
        </ListSubheader>
    }>
      <ListItem>
        <Paper className={classes.root}>
          {Object.keys(teams).map((d) => {

            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{d}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List style={{width: '100%'}}>
                    {
                      teams[d].map((t) => {
                        return (
                          <ListItem button onClick={() => handleTeamClick(t)}>
                            <TeamThumbnail data={t} />
                          </ListItem>
                        )
                      })
                    }
                  </List>
                </AccordionDetails>
              </Accordion>
            )

          })}

        </Paper>
      </ListItem>
    </List>

  );
}
