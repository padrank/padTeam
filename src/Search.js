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

  const chiToEng = {"火": "fire", "水": "water", "木": "wood", "光": "light", "暗": "dark", "無": "none",
  "神": "god", "龍": "dragon", "惡魔": "demon", "機械": "machine", "平衡": "balance",
  "攻擊": "attack", "體力": "strength", "回復": "healing", "進化用": "evo", "覺醒用": "aw", "強化用": "power",
  "HP強化": "k1", "攻撃強化": "k2", "回復強化": "k3", "火ダメージ軽減": "k4", "水ダメージ軽減": "k5",
  "木ダメージ軽減": "k6", "光ダメージ軽減": "k7", "闇ダメージ軽減": "k8", "自動回復": "k9", "バインド耐性": "k10",
  "暗闇耐性": "k11", "お邪魔耐性": "k12", "毒耐性": "k13", "火ドロップ強化": "k14", "水ドロップ強化": "k15",
  "木ドロップ強化": "k16", "光ドロップ強化": "k17", "闇ドロップ強化": "k18", "操作時間延長": "k19", "バインド回復": "k20",
  "スキルブースト": "k21", "火属性強化": "k22", "水属性強化": "k23", "木属性強化": "k24", "光属性強化": "k25",
  "闇属性強化": "k26", "2体攻撃": "k27", "封印耐性": "k28", "回復ドロップ強化": "k29", "マルチブースト": "k30",
  "ドラゴンキラー": "k31", "神キラー": "k32", "悪魔キラー": "k33", "マシンキラー": "k34", "バランスキラー": "k35",
  "攻撃キラー": "k36", "体力キラー": "k37", "回復キラー": "k38", "進化用キラー": "k39", "能力覚醒用キラー": "k40",
  "強化合成用キラー": "k41", "売却用キラー": "k42", "コンボ強化": "k43", "ガードブレイク": "k44", "追加攻撃": "k46",
  "チームHP強化": "k47", "チーム回復強化": "k48", "ダメージ無効貫通": "k49", "超追加攻撃": "k50", "スキルチャージ": "k51",
  "バインド耐性＋": "k52", "操作時間延長＋": "k53", "雲耐性": "k54", "操作不可耐性": "k55", "スキルブースト＋": "k56",
  "HP80％以上強化": "k57", "HP50％以下強化": "k58", "回復L字消し": "k59", "L字消し攻撃": "k60", "超コンボ強化": "k61",
  "暗闇耐性＋": "k68", "お邪魔耐性＋": "k69", "毒耐性＋": "k70", "お邪魔ドロップの加護": "k71", "毒ドロップの加護": "k72",
  "スキルボイス": "k80", "ダンジョンボーナス": "k81", "コンボドロップ": "k82", "HP弱化": "k83", "攻撃弱化": "k84",
  "回復弱化": "k85", "覚醒アシスト": "assist"};
  const engToChi = {"fire": "火", "water": "水", "wood": "木", "light": "光", "dark": "暗", "none": "無"};

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
            if (!advancedSearchFilter.mainProperty.includes(chiToEng[d.main_property.trim()])){
              return
            }
          }
          // sub property
          if (advancedSearchFilter.subProperty.length !== 0){
            if (!advancedSearchFilter.subProperty.includes(chiToEng[d.sub_property.trim()])){
              return
            }
          }
          // type
          if (advancedSearchFilter.type.length !== 0){
            let flag = false;
            d.type.forEach(t => {
              if (advancedSearchFilter.type.includes(chiToEng[t.trim()])){
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
              tmp[chiToEng[t]] = (tmp[chiToEng[t]] === undefined) ? 1 : tmp[chiToEng[t]] + 1;
            });
            if (advancedSearchFilter.superAwoken) {
              d.super_awoken.forEach(t => {
                tmp[chiToEng[t]] = (tmp[chiToEng[t]] === undefined) ? 1 : tmp[chiToEng[t]] + 1;
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