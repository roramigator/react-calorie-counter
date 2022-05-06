import { useState } from 'react';

import './App.css';

import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { DeleteForever, DisabledByDefault, AddBox } from '@mui/icons-material';

import FormModal from './components/FormModal';
import ListItems from './components/ListItems';

import { useLocalStorage } from './context/localStorage';

function App() {
  const storage = useLocalStorage();

  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => setShowModal(!showModal);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Calorie Counter
          </Typography>
          <IconButton size="large" color="inherit" onClick={handleModalClick}>
            {showModal ? <DisabledByDefault /> : <AddBox />}
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => {
              storage.clear();
              window.location.assign('/');
            }}
          >
            <DeleteForever />
          </IconButton>
        </Toolbar>
      </AppBar>

      <FormModal show={showModal} />
      <ListItems />
    </>
  );
}

export default App;
