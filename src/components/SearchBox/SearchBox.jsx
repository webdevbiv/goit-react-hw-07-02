import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/filtersSlice';
import { setFilter } from '../../redux/filtersSlice';
import { Box, TextField } from '@mui/material';

const SearchBox = () => {
  const userSearch = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Find contacts by name"
        variant="outlined"
        value={userSearch}
        onChange={onChange}
        placeholder="Enter name to search"
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default SearchBox;
