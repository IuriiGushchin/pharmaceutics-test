import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DifferenceIcon from '@mui/icons-material/Difference';
import TableViewIcon from '@mui/icons-material/TableView';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href='/create-document' >
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <ListItemText primary="Новый документ" />
    </ListItemButton>
    <ListItemButton href='/create-nomenculature'>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Новая номенкулатура" />
    </ListItemButton>
    <ListItemButton href='/edit-nomenculature' >
      <ListItemIcon>
        <DifferenceIcon />
      </ListItemIcon>
      <ListItemText primary="Правка номенкулатуры" />
    </ListItemButton>
    <ListItemButton href='/'>
      <ListItemIcon>
        <TableViewIcon />
      </ListItemIcon>
      <ListItemText primary="Номенкулатуры" />
    </ListItemButton>
  </React.Fragment>
);
