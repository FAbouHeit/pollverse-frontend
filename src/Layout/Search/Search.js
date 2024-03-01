import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ListItemButton } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Search() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Dog Breeds" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary="Labrador Retriever" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="German Shepherd" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Golden Retriever" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Bulldog" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Beagle" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

