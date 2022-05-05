import './App.css';

import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { DeleteForever, AddBox } from '@mui/icons-material';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Calorie Counter
          </Typography>
          <IconButton size="large" color="inherit">
            <AddBox />
          </IconButton>
          <IconButton size="large" color="inherit">
            <DeleteForever />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
