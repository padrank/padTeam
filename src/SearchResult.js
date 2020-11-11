import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Config } from './Config'
import SearchResultItem from './SearchResultItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: '70vh',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  awokenList: {
    width: 'fit-content',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
    '& hr': {
      margin: theme.spacing(0, 1),
    },
  }
}));

export default function SearchResult(props) {

  const classes = useStyles();

  const handleItemClick = (id, d) => {
    props.onClick(id, d);
  }

  const items = props.data.map((d) => {
    return (
      <SearchResultItem d={d} onClick={(id) => handleItemClick(id, d)}/>
    )
  });

  return (
    <List
      component="nav"
      aria-labelledby="search-result"
      subheader={
        <ListSubheader component="div" id="search-result">
          Find {items.length} result(s)
        </ListSubheader>
      }
      className={classes.root}
    >
      {items}
    </List>
  );
}
