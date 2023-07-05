import { useRef } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { BoxProps } from '@mui/material/Box';

interface Option {
  label: string;
  id: string;
}

type Props = BoxProps & {
  options: Option[];
};

const FilterForm = (props: Props) => {
  const formRef = useRef<HTMLFormElement>();
  const submit = useSubmit();

  const handleSelect = (_: any, selectedValue: Option | null) => {
    const formData = new FormData(formRef.current);
    if (selectedValue) {
      formData.set('filterId', selectedValue.id);
    }
    submit(formData);
  };

  return (
    <Box
      sx={{
        order: { xs: 1, sm: 0 },
        flexGrow: { xs: 1, sm: 0 },
        width: { xs: 1, sm: 200 },
      }}
      component={Form}
      ref={formRef}
    >
      <Autocomplete
        options={props.options}
        size="small"
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by user"
            variant="outlined"
            color="secondary"
          />
        )}
      />
    </Box>
  );
};

export default FilterForm;
