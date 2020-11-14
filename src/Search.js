import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import data from './data/datas.json';
import SearchResult from './SearchResult';
import AdvancedSearchPanel from './AdvancedSearchPanel';
import { Badge } from '@material-ui/core';
import { Config } from './Config';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  advancedSearchListItem: {
    justifyContent: 'flex-end',
  },
  advancedSearchListText: {
    textAlign: 'right',
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [showData, setShowData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [advancedSearchFilter, setAdvancedSearchFilter] = React.useState({
    "mainProperty": [],
    "subProperty": [],
    "type": [],
    "awoken" : [],
    "superAwoken": true,
  });
  const [open, setOpen] = React.useState(false);
  const [badgeVisible, setBadgeVisible] = React.useState(false);

  const handleAdvancedSearchClick = () => {
    setOpen(!open);
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    setShowData([]);
    let tmp = [];
    let awokenSum = advancedSearchFilter.awoken.reduce((a, b) => {
      return a + b.count;
    }, 0);
    data.forEach(d => {
      if (d.name.includes(searchText)) {
        if (advancedSearchFilter !== undefined) {
          // main property
          if (advancedSearchFilter.mainProperty.length !== 0){
            if (!advancedSearchFilter.mainProperty.includes(Config.chiToEng[d.main_property.trim()])){
              return
            }
          }
          // sub property
          if (advancedSearchFilter.subProperty.length !== 0){
            if (!advancedSearchFilter.subProperty.includes(Config.chiToEng[d.sub_property.trim()])){
              return
            }
          }
          // type
          if (advancedSearchFilter.type.length !== 0){
            let flag = false;
            d.type.forEach(t => {
              if (advancedSearchFilter.type.includes(Config.chiToEng[t.trim()])){
                flag = true;
                return
              }
            });
            if (!flag){
              return
            }
          }
          // awoken
          if (awokenSum !== 0){
            let tmp = {};
            let flag = true;
            d.awoken.forEach(t => {
              tmp[Config.chiToEng[t]] = (tmp[Config.chiToEng[t]] === undefined) ? 1 : tmp[Config.chiToEng[t]] + 1;
            });
            if (advancedSearchFilter.superAwoken) {
              d.super_awoken.forEach(t => {
                tmp[Config.chiToEng[t]] = (tmp[Config.chiToEng[t]] === undefined) ? 1 : tmp[Config.chiToEng[t]] + 1;
              });
            }
            advancedSearchFilter.awoken.forEach(a => {
              if ((a.count !== 0) && ((tmp[a.label] === undefined) || (a.count > tmp[a.label]))){
                flag = false;
                return
              }
            })
            if (!flag) {
              return
            }
          }

        }
        tmp.push(d);
      }
    });
    setShowData(tmp.slice(0, 100));
  };
  const handleAdvancedSearchChange = (payload) => {
    setAdvancedSearchFilter(payload);
    let awokenSum = payload.awoken.reduce((a, b) => {
      return a + b.count;
    }, 0);
    console.log(payload);
    if (awokenSum === 0 && payload.type.length === 0 && payload.mainProperty.length === 0 && payload.subProperty.length === 0){
      setBadgeVisible(false);
    }
    else {
      setBadgeVisible(true);
    }
  };
  const handleSearchResultClick = (id, d) => {
    props.onChange(props.teamData.map((t) => {
      let tmp = t;
      if (t.selfSelected) {
        tmp['selfId'] = id;
        tmp['selfData'] = d;
        tmp['selfConfig'] = {
          'awokenNum': d.awoken.length,
          'superAwoken': 'unknown'
        }
        tmp['selfSelected'] = false;
      }
      if (t.inheritSelected) {
        tmp['inheritId'] = id;
        tmp['inheritData'] = d
        tmp['inheritSelected'] = false;
      }
      return tmp;
    }))
  }

  return (
    <List>
      <ListItem>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search "
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </ListItem>
      <ListItem className={classes.advancedSearchListItem} onClick={handleAdvancedSearchClick}>
        <ListItemText className={classes.advancedSearchListText} secondary="Advanced search" />
        <IconButton aria-label="Delete" size="small">
          <Badge color="secondary" badgeContent="..." invisible={!badgeVisible}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Badge>
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto">
        <ListItem>
          <AdvancedSearchPanel onChange={handleAdvancedSearchChange}/>
        </ListItem>
      </Collapse>
      <ListItem>
        <Paper className={classes.root}>
          <SearchResult data={showData} onClick={(id, d) => handleSearchResultClick(id, d)}/>
        </Paper>
      </ListItem>
    </List>
  )

}