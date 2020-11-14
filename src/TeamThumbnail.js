import React from 'react';
import { Grid, Paper, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Config } from './Config';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 600,
    padding: '10px 20px 70px 20px',
  },
  selfImg: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  inhertImg: {
    width: 30,
    height: 30,
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    bottom: 0
  }

}))

export default function TeamThumbnail(props) {

  const classes = useStyles();

  return (
    <div>
      {
        props.data.team.map((t) => {
          return(
            <span style={{position: 'relative'}}>
              <img src={`${Config.imgThumbnailUrl}/${t.selfId}.${Config.imgThumbnailUrlExt}`} alt="" className={classes.selfImg}/>
              <img src={`${Config.imgThumbnailUrl}/${t.inheritId}.${Config.imgThumbnailUrlExt}`} alt="" className={classes.inhertImg}/>
            </span>
          )
        })
      }
    </div>
  )

}