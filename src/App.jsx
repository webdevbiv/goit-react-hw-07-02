import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Box, Paper } from '@mui/material';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import { fetchContacts } from './redux/contactsOps';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Phonebook
          </Typography>
          <ContactForm />
          <SearchBox />
          <ContactList />
        </Paper>
      </Box>
    </Container>
  );
};

export default App;
