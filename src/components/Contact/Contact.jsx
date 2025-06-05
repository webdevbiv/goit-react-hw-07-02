import { FaPhone } from 'react-icons/fa6';
import { BiSolidContact } from 'react-icons/bi';
import { deleteContact } from '../../redux/contactsOps';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '../../redux/contactsSlice';
import { Box, IconButton, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const handleDeleteContact = async () => {
    try {
      await dispatch(deleteContact(id)).unwrap();
    } catch (error) {
      alert('Failed to delete contact. Please try again.');
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDeleteContact}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : <DeleteIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <BiSolidContact />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaPhone sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {number}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
};

export default Contact;
