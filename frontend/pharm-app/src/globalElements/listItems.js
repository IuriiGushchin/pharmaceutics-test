import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TableViewIcon from '@mui/icons-material/TableView';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { ROUTES_LIST } from '../helpers/constants';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href={ROUTES_LIST.createDocument} >
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <ListItemText primary="Новый документ" />
    </ListItemButton>
    <ListItemButton href={ROUTES_LIST.createNomenculature}>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Новая номенкулатура" />
    </ListItemButton>
    <ListItemButton href={ROUTES_LIST.getNomenculatures}>
      <ListItemIcon>
        <TableViewIcon />
      </ListItemIcon>
      <ListItemText primary="Номенкулатуры" />
    </ListItemButton>
    <ListItemButton href={ROUTES_LIST.report}>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Отчет" />
    </ListItemButton>
  </React.Fragment>
);
