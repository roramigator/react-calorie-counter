import { useEffect, useState } from 'react';

import { Box, TextField, Button } from '@mui/material';

import { useLocalStorage } from '../context/localStorage';

const useFormModal = () => {
  const storage = useLocalStorage();

  const [name, setName] = useState<string>('');
  const [calories, setCalories] = useState<number | string>('');
  const [submit, setSubmit] = useState(false);

  return {
    name: {
      val: name,
      set: setName,
    },
    calories: {
      val: calories,
      set: setCalories,
    },
    submit: {
      val: submit,
      set: () => {
        setSubmit(true);
        const item = {
          id: storage.get().length,
          name,
          calories,
        };
        if (name.length > 0 && typeof calories === 'number') {
          storage.store(item);
        }
      },
    },
  };
};

type Titem = { id: number; name: string; calories: number | string };

function FormModal({ show, item }: { show: boolean; item?: Titem }) {
  const { name, calories, submit } = useFormModal();
  const storage = useLocalStorage();

  useEffect(() => {
    if (item) {
      name.set(item.name);
      calories.set(item.calories);
    }
  }, [item]);

  submit.val && window.location.assign('/');

  return (
    <>
      {show && (
        <Box
          component="form"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            label="Name"
            value={name.val}
            onChange={(e) => name.set(e.target.value)}
          />
          <br />
          <TextField
            label="Calories"
            value={calories.val}
            onChange={(e) => {
              !!parseInt(e.target.value)
                ? calories.set(parseInt(e.target.value))
                : calories.set('');
            }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              if (item) {
                storage.update({
                  id: item.id,
                  name: name.val,
                  calories: calories.val,
                });
                window.location.assign('/');
              } else {
                submit.set();
              }
            }}
          >
            Save
          </Button>
        </Box>
      )}
    </>
  );
}

export default FormModal;
