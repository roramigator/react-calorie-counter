import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Warning } from '@mui/icons-material';

import { useLocalStorage } from '../context/localStorage';
import FormModal from './FormModal';

type Titem = { id: number; name: string; calories: number | string };

function ListItems() {
  const storage = useLocalStorage();
  const [showModal, setShowModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  const [totalCalories, setTotalCalories] = useState(0);

  itemUpdate && !showModal && setShowModal(!showModal);

  useEffect(() => {
    const addItemCalories = storage.get().reduce((acc: number, item: Titem) => {
      if (typeof item.calories === 'number') {
        acc = acc + item.calories;
      }
      return acc;
    }, 0);
    setTotalCalories(addItemCalories);
  }, []);

  return (
    <>
      <FormModal show={showModal} item={itemUpdate} />
      <List
        sx={{
          maxWidth: 400,
          margin: '0 auto',
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {storage.get().length > 0 ? (
          <>
            <ListItem disablePadding>
              <ListItemButton role={undefined} onClick={() => {}} dense>
                <ListItemText primary={'TOTAL'} />
                <ListItemText primary={totalCalories} />
              </ListItemButton>
            </ListItem>
            <br />
            <ListItem
              secondaryAction={<ListItemText primary={'Actions'} />}
              disablePadding
            >
              <ListItemButton role={undefined} onClick={() => {}} dense>
                <ListItemText primary={'Name'} />
                <ListItemText primary={'Calories'} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <IconButton edge="end">
              <Warning />
            </IconButton>
          </>
        )}

        {storage.get().map((item: any) => {
          const key = `data-list-${item.id}`;

          return (
            <ListItem
              key={key}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => {
                      !itemUpdate && setItemUpdate(item);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => {
                      storage.remove(item);
                      window.location.assign('/');
                    }}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={() => {}} dense>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.calories} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default ListItems;
