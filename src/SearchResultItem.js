import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Config } from './Config'
import imgPath from './data/imgPath.json';
import Divider from '@material-ui/core/Divider';
import { useDrag } from "react-dnd";


const useStyles = makeStyles((theme) => ({
  awokenList: {
    width: 'fit-content',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
    '& hr': {
      margin: theme.spacing(0, 1),
    },
  }
}));

export default function SearchResultItem(props) {

  const classes = useStyles();

  const id = parseInt(props.d.name.substr(3, props.d.name.indexOf("-") - 4), 10);
  const imageUrl = `${Config.imgThumbnailUrl}/${id}.${Config.imgThumbnailUrlExt}`;

  const [ , drag] = useDrag({
    item: { id: id, data: props.d, type: Config.dragAndDropType },
  });

  return (
    <ListItem button onClick={() => props.onClick(id)}>
      <div ref={drag}>
        <ListItemIcon>
          <img src={imageUrl} alt="" width={50} height={50}/>
        </ListItemIcon>
      </div>
      <ListItemText
        primary={
          <React.Fragment>
            {
              props.d.type.map((t) => {
                return (
                  <img src={imgPath["type"][t]} alt="" width={20} height={20} style={{ verticalAlign: 'middle' }}/>
                )
              })
            }
            {props.d.name}
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Grid container alignItems="center" className={classes.awokenList}>
              {
                props.d.awoken.map((a) => {
                  return (
                    <img src={imgPath["awoken"][a]} alt="" width={20} height={20}/>
                  )
                })
              }
              { (props.d.super_awoken.length > 0) ?
                <Divider orientation="vertical" flexItem/>
                  : <></>
              }
              {
                props.d.super_awoken.map((sa) => {
                  return (
                    <img src={imgPath["awoken"][sa]} alt="" width={20} height={20}/>
                  )
                })
              }
            </Grid>
          </React.Fragment>
        }
      />
    </ListItem>
)
}