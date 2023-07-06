import { useState, useEffect } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Option {
  label: string;
  id: string;
}

interface Props {
  options: Option[];
  selectedOption: Option | null;
}

const FilterForm = ({ options, selectedOption }: Props) => {
  const [option, setOption] = useState<Option | null>(selectedOption);
  const submit = useSubmit();

  useEffect(() => setOption(selectedOption), [selectedOption]);

  const handleSelect = (_: any, value: Option | null) => {
    const searchParams = new URLSearchParams();
    if (value) searchParams.set('filterId', value.id);
    submit(searchParams);
  };

  return (
    <Box
      sx={{
        order: { xs: 1, sm: 0 },
        flexGrow: { xs: 1, sm: 0 },
        width: { xs: 1, sm: 200 },
      }}
      component={Form}
    >
      <Autocomplete
        options={options}
        size="small"
        value={option}
        onChange={handleSelect}
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
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
