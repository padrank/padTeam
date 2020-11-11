import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import { Divider, List, FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0px 10px',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  superAwokenPaper: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    minHeight: 32,
  },
  awokenPaper: {
    display: 'flex',
    justifyContent: 'left',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    minHeight: 32,
  },
  awoken: {
    margin: theme.spacing(0.5),
  },
  awokenButton: {
    border: 0,
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function AdvancedSearchPanel(props) {
  const drops = ["fire", "water", "wood", "light", "dark", "none"];
  const types = ["god", "dragon", "demon", "machine", "balance", "attack", "strength", "healing", "evo", "aw", "power"];
  const awokens = ["assist", "k1", "k10", "k11", "k12", "k13", "k14", "k15", "k16", "k17", "k18", "k19", "k2", "k20", "k21", "k22", "k23", "k24", "k25", "k26", "k27", "k28", "k29", "k3", "k30", "k31", "k32", "k33", "k34", "k35", "k36", "k37", "k38", "k39", "k4", "k40", "k41", "k42", "k43", "k44", "k46", "k47", "k48", "k49", "k5", "k50", "k51", "k52", "k53", "k54", "k55", "k56", "k57", "k58", "k59", "k6", "k60", "k61", "k68", "k69", "k7", "k70", "k71", "k72", "k8", "k80", "k81", "k82", "k83", "k84", "k85", "k9"];

  const [mainProperty, setMainProperty] = React.useState([]);
  const [subProperty, setSubProperty] = React.useState([]);
  const [type, setType] = React.useState([]);
  const [superAwoken, setSuperAwoken] = React.useState(true);
  const [awoken, setAwoken] = React.useState(() => awokens.map((a) => { return ({'label': a, 'count': 0})}));

  const handleMainPropertyChange = (event, newMainProperty) => {
    setMainProperty(newMainProperty);
    props.onChange({
      "mainProperty": newMainProperty,
      "subProperty": subProperty,
      "type": type,
      "awoken" : awoken,
      "superAwoken": superAwoken,
    });
  };
  const handleSubPropertyChange = (event, newSubProperty) => {
    setSubProperty(newSubProperty);
    props.onChange({
      "mainProperty": mainProperty,
      "subProperty": newSubProperty,
      "type": type,
      "awoken" : awoken,
      "superAwoken": superAwoken,
    });
  };
  const handleTypeChange = (event, newType) => {
    setType(newType);
    props.onChange({
      "mainProperty": mainProperty,
      "subProperty": subProperty,
      "type": newType,
      "awoken" : awoken,
      "superAwoken": superAwoken,
    });
  };
  const handleSuperAwokenChange = () => {
    let tmp = !superAwoken;
    setSuperAwoken(tmp);
    props.onChange({
      "mainProperty": mainProperty,
      "subProperty": subProperty,
      "type": type,
      "awoken" : awoken,
      "superAwoken": tmp,
    });
  };
  const handleAwokenMinus = (awokenToMinus) => () => {
    let tmp = awoken.map((a) => {
      if (a.label === awokenToMinus.label.split('-')[0]){
        a['count'] -= 1;
      }
      return a;
    })
    setAwoken(tmp);
    props.onChange({
      "mainProperty": mainProperty,
      "subProperty": subProperty,
      "type": type,
      "awoken" : tmp,
      "superAwoken": superAwoken,
    });
  };
  const handleAwokenAdd = (e) => {
    let tmp = awoken.map((a) => {
      if (a.label === e.target.id.split('-')[0]){
        a['count'] += 1;
      }
      return a;
    })
    setAwoken(tmp);
    props.onChange({
      "mainProperty": mainProperty,
      "subProperty": subProperty,
      "type": type,
      "awoken" : tmp,
      "superAwoken": superAwoken,
    });
  };

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={3}>
            Main property:
          </Grid>
          <Grid item xs={9}>
            <StyledToggleButtonGroup
              size="small"
              value={mainProperty}
              onChange={handleMainPropertyChange}
              aria-label="text formatting"
            >
              {
                drops.map((d) => {
                  return (
                    <ToggleButton value={d} aria-label={d}>
                      <img src={`images/drop/${d}.png`} alt="" width={20} height={20}/>
                    </ToggleButton>
                  )
                })
              }
            </StyledToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={3}>
            Sub property:
          </Grid>
          <Grid item xs={9}>
            <StyledToggleButtonGroup
              size="small"
              value={subProperty}
              onChange={handleSubPropertyChange}
              aria-label="text formatting"
            >
              {
                drops.map((d) => {
                  return (
                    <ToggleButton value={d} aria-label={d}>
                      <img src={`images/drop/${d}.png`} alt="" width={20} height={20}/>
                    </ToggleButton>
                  )
                })
              }
            </StyledToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container direction="row" wrap="nowrap" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={3}>
            Type:
          </Grid>
          <Grid item xs={9}>
            <StyledToggleButtonGroup
              size="small"
              value={type}
              onChange={handleTypeChange}
              aria-label="text formatting"
            >
              {
                types.map((t) => {
                  return (
                    <ToggleButton value={t} aria-label={t}>
                      <img src={`images/type/${t}.png`} alt="" width={20} height={20}/>
                    </ToggleButton>
                  )
                })
              }
            </StyledToggleButtonGroup>
          </Grid>
        </Grid>
        <Divider />
        <Grid container direction="row" wrap="nowrap" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={3}>
            Awoken:
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={0} className={classes.superAwokenPaper}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={superAwoken} onChange={handleSuperAwokenChange} color="primary" />}
                  label="Super awoken"
                />
              </FormGroup>
            </Paper>
            <Paper elevation={0} component="ul" className={classes.awokenPaper}>
              {
                awoken.map((a) => {
                  if (a.count === 0){
                    return <></>
                  }
                  let icon;
                  return (
                    <li>
                      <Chip
                        variant="outlined"
                        icon={icon}
                        label={`×${a.count}`}
                        size="small"
                        avatar={<Avatar alt="Natacha" src={`images/awoken/${a.label}.png`} />}
                        deleteIcon={<RemoveCircleIcon />}
                        onDelete={handleAwokenMinus(a)}
                        className={classes.awoken}
                      />
                    </li>
                  );
                })
              }
            </Paper>
            {
              awokens.map((a) => {
                return (
                  <ToggleButton className={classes.awokenButton} onClick={handleAwokenAdd} id={`${a}-btn`}>
                    <img src={`images/awoken/${a}.png`} alt="" width={20} height={20} id={`${a}-img`}/>
                  </ToggleButton>
                )
              })
            }
          </Grid>
        </Grid>
      </List>
    </Paper>
  );
}
