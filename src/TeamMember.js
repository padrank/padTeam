import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Badge, Typography, ButtonBase, TextField, InputAdornment } from '@material-ui/core';
import imgPath from './data/imgPath.json';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slider } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CheckIcon from '@material-ui/icons/Check';
// import './TeamMember.css';
import { Config } from './Config';
import Plus from './Plus';
import StarIcon from '@material-ui/icons/Star';
import { useDrop, useDrag } from "react-dnd";
import PotentialAwoken from './PotentialAwoken';

const useStyles = makeStyles((theme) => ({
  root: {
    transition: '0.2s',
  },
  noAndLv: {
    textAlign: 'center',
    fontSize: 6,
    marginBottom: 3,
    // transform: 'scale(0.8)',
    '& > *': {
      paddingRight: 3,
    }
  },
  inheritNoAndLv: {
    textAlign: 'center',
    fontSize: 6,
    marginBottom: 3,
    transform: 'scale(0.6)',
    '& > *': {
      paddingLeft: 3,
      paddingRight: 3,
    }
  },
  selfImgSelectedMask: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 5,
    border: '3px solid red',
    opacity: 1,
    backgroundColor: 'rgba(223, 223, 223, 0)',
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'rgba(223, 223, 223, 0.4)',
    }
  },
  selfImgMask: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 5,
    border: '1px solid',
    backgroundColor: '#dddddd',
    opacity: 0,
    zIndex: 1,
    '&:hover': {
      opacity: 0.4
    }
  },
  selfImg: {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: 5,
    border: '1px solid',
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 0,
  },
  inheritImgSelectedMask: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 5,
    border: '3px solid red',
    backgroundColor: 'rgba(223, 223, 223, 0)',
    zIndex: 20,
    '&:hover': {
      backgroundColor: 'rgba(223, 223, 223, 0.4)',
    }
  },
  inheritImgMask: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 5,
    border: '1px solid',
    backgroundColor: '#dddddd',
    opacity: 0,
    zIndex: 20,
    '&:hover': {
      opacity: 0.4,
    }
  },
  inheritImg: {
    position: "relative",
    width: 50,
    height: 50,
    borderRadius: 5,
    border: '1px solid',
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 10,
  },
  plus: {
    color: '#feff04',
    WebkitTextStroke: '0.75px black',
    fontSize: 15,
    fontWeight: 900,
  },
  inheritPlus: {
    color: '#feff04',
    WebkitTextStroke: '0.75px black',
    fontSize: 15,
    fontWeight: 900,
    transform: 'scale(0.7)',
  },
  selfId: {
    minWidth: 90,
  },
  superAwoken: {
    width: 20,
    height: 20,
    position: 'absolute',
    transform: 'translate(-23px, 25px)',
    borderRadius: 5,
    zIndex: 1,
  }
}));

const AwokenBadge = withStyles((theme) => ({
  badge: {
    right: 13,
    top: 13,
    width: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#0d5e15',
    padding: '0 4px',
  },
}))(Badge);

const PlusBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: 'transparent',
    transform: 'translate(0.1%, 10%)'
  },
}))(Badge);

const InheritBadge = withStyles((theme) => ({
  badge: {
    left: 26,
    bottom: -13,
    backgroundColor: 'transparent',
  },
}))(Badge);

const InheritPlusBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: 'transparent',
    transform: 'scale(0.8) translate(0.1%, 10%)',
    zIndex: 100
  }
}))(Badge);

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

export default function TeamMember(props) {

  const classes = useStyles();

  const handleSelfImgClick = () => {
    props.onClick(!props.data.selfSelected, props.data.inheritSelected)
  }

  const handleInheritImgClick = () => {
    props.onClick(props.data.selfSelected, !props.data.inheritSelected)

  }

  const handleSelfLvChange = (e) => {
    let tmp = parseInt("0" + e.target.value);
    if (props.data.selfData.attack_110 === 0) {
      tmp = tmp > 99 ? 99 : tmp;
    }
    else {
      tmp = tmp > 110 ? 110 : tmp;
    }

    tmp = tmp < 1 ? 1 : tmp;

    setSelfLv(tmp);
  }

  const handleInheritLvChange = (e) => {
    let tmp = parseInt("0" + e.target.value);
    if (props.data.inheritData.attack_110 === 0) {
      tmp = tmp > 99 ? 99 : tmp;
    }
    else {
      tmp = tmp > 110 ? 110 : tmp;
    }

    tmp = tmp < 1 ? 1 : tmp;

    setInheritLv(tmp);
  }

  // const [showSuperAwoken, setShowSuperAwoken] = React.useState(false);
  // const [superAwoken, setSuperAwoken] = React.useState({
  //   selected: 'unknown',
  //   candidates: ['unknown'],
  // });
  const [superAwokenDialogOpen, setSuperAwokenDialogOpen] = React.useState(false);
  const [selfLvDialogOpen, setSelfLvDialogOpen] = React.useState(false);
  const [inheritLvDialogOpen, setInheritLvDialogOpen] = React.useState(false);
  const [awokenDialogOpen, setAwokenDialogOpen] = React.useState(false);
  const [awokenValue, setAwokenValue] = React.useState([]);
  const [selfLv, setSelfLv] = React.useState(0);
  const [inheritLv, setInheritLv] = React.useState(0);

  const [, dropSelf] = useDrop({
    accept: Config.dragAndDropType,
    drop: (item) => {
      props.onDrop(false, item.id, item.data);
    },
  });

  const [, dropInherit] = useDrop({
    accept: Config.dragAndDropType,
    drop: (item) => {
      props.onDrop(true, item.id, item.data);
    },
  });

  const handleSuperAwokenChange = (e, newSuperAwokenSelected) => {
    props.onSuperAwokenChange(newSuperAwokenSelected);
  }

  const handleAwokenChange = (e, newAwokensSelected) => {
    let tmp = parseInt(e.currentTarget.value);
    if (Math.max(...awokenValue) !== tmp){
      tmp += 1;
    }
    setAwokenValue([...Array(tmp).keys()]);
    props.onAwokenChange(tmp);
  }

  useEffect(() => {
    setAwokenValue([...Array(props.data.selfConfig.awokenNum).keys()]);
  }, [props.data.selfConfig])

  useEffect(() =>{
    setSelfLv( props.data.selfData.attack_110 === 0 ? 99 : 110 );
  }, [props.data.selfData.attack_110])

  useEffect(() =>{
    setInheritLv( props.data.inheritData.attack_110 === 0 ? 99 : 110 );
  }, [props.data.inheritData.attack_110])

  return(
    <span className={classes.root}>
      <div className={classes.noAndLv} style={{ visibility: props.data.selfId === undefined ? 'hidden' : 'visible'}}>
        <span>No.{props.data.selfId}</span>
        <span onClick={() => setSelfLvDialogOpen(true)}>Lv.{selfLv}</span>
      </div>
      <AwokenBadge invisible={props.data.selfData.awoken.length === 0} badgeContent={
        <React.Fragment>
          {
            (awokenValue.length === props.data.selfData.awoken.length && awokenValue.length !== 0)
              ? <StarIcon style={{ color: "#feff04" }} fontSize={"inherit"} onClick={() => setAwokenDialogOpen(true)}/>
              : <span style={{ color: "#feff04", fontWeight: 900 }} onClick={() => setAwokenDialogOpen(true)}>{awokenValue.length}</span>
          }
        </React.Fragment>
      }>
        <PlusBadge invisible={props.data.selfId === undefined} badgeContent={
          <React.Fragment >
            <Plus />
          </React.Fragment>
        } anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
          <InheritBadge badgeContent={
            <React.Fragment>
              <InheritPlusBadge  invisible={props.data.inheritId === undefined} badgeContent={
                <React.Fragment>
                  <Plus />
                </React.Fragment>
              } anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <ButtonBase onClick={handleInheritImgClick}>
                  <span className={props.data.inheritSelected ? classes.inheritImgSelectedMask : classes.inheritImgMask} ref={dropInherit}>
                  </span>
                  { (props.data.inheritId === undefined)
                    ? <span className={classes.inheritImg}></span>
                    : <img src={`${Config.imgThumbnailUrl}/${props.data.inheritId}.${Config.imgThumbnailUrlExt}`} alt="" className={classes.inheritImg}/>
                  }
                </ButtonBase>
              </InheritPlusBadge>
              <div className={classes.inheritNoAndLv} style={{ visibility: props.data.inheritId === undefined ? 'hidden' : 'visible'}}>
                <span>No.{props.data.inheritId}</span>
                <span onClick={() => setInheritLvDialogOpen(true)}>Lv.{inheritLv}</span>
              </div>
              {/* <Typography variant="caption" display="block">No.{props.data.inheritId}</Typography> */}
            </React.Fragment>
          } anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <ButtonBase onClick={handleSelfImgClick}>
              <span className={props.data.selfSelected ? classes.selfImgSelectedMask : classes.selfImgMask} ref={dropSelf}></span>
              { (props.data.selfId === undefined)
                  ? <span className={classes.selfImg}></span>
                  : <img src={`${Config.imgThumbnailUrl}/${props.data.selfId}.${Config.imgThumbnailUrlExt}`} alt="" className={classes.selfImg}/>
              }
            </ButtonBase>
          </InheritBadge>
        </PlusBadge>
      </AwokenBadge>

      {/* Super Awoken */}
      { props.data.selfData.super_awoken.length > 0 && <img src={imgPath.awoken[props.data.selfConfig.superAwoken]} alt="" className={classes.superAwoken} onClick={() => setSuperAwokenDialogOpen(true)}/> }
      <Dialog
        open={superAwokenDialogOpen}
        onClose={() => setSuperAwokenDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Super awoken"}</DialogTitle>
        <DialogContent>
          <div>
            <StyledToggleButtonGroup
                size="small"
                value={props.data.selfConfig.superAwoken}
                exclusive
                onChange={handleSuperAwokenChange}
                aria-label="text formatting"
            >
              {
                ['unknown'].concat(props.data.selfData.super_awoken).map((sa) => {
                  return (
                    <ToggleButton value={sa} aria-label={sa}>
                      <img src={imgPath.awoken[sa]} alt="" width={20} height={20}/>
                    </ToggleButton>
                  )
                })
              }
            </StyledToggleButtonGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuperAwokenDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Awoken Dialog */}
      <Dialog
        open={awokenDialogOpen}
        onClose={() => setAwokenDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Awoken"}</DialogTitle>
        <DialogContent>
          <div>
            <StyledToggleButtonGroup
                  size="small"
                  value={awokenValue}
                  onChange={handleAwokenChange}
                  aria-label="text formatting"
              >
                {
                  props.data.selfData.awoken.map((a, k) => {
                    return (
                      <ToggleButton value={k} aria-label={a}>
                        <img src={imgPath.awoken[a]} alt="" width={20} height={20}/>
                      </ToggleButton>
                    )
                  })
                }
              </StyledToggleButtonGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAwokenDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* self Lv dialog */}
      <Dialog
        open={selfLvDialogOpen}
        onClose={() => setSelfLvDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Self level"}</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="LV"
              type="Number"
              className={classes.textField}
              InputProps={{
                startAdornment: <InputAdornment position="start">Lv. </InputAdornment>,
              }}
              value={selfLv}
              variant="outlined"
              onChange={handleSelfLvChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelfLvDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* inherit Lv dialog */}
      <Dialog
        open={inheritLvDialogOpen}
        onClose={() => setInheritLvDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Inherit level"}</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="LV"
              type="Number"
              className={classes.textField}
              InputProps={{
                startAdornment: <InputAdornment position="start">Lv. </InputAdornment>,
              }}
              value={inheritLv}
              variant="outlined"
              onChange={handleInheritLvChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInheritLvDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <PotentialAwoken data={props.data}/>
    </span>
  )
}