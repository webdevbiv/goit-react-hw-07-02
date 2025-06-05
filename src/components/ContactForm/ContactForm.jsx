import { useId } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts, selectLoading } from '../../redux/contactsSlice';
import { Box, TextField, Button, Alert, AlertTitle } from '@mui/material';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9-]+$/, 'Phone number can only include digits and hyphens')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === values.name.toLowerCase() &&
        contact.number === values.number
    );

    if (isDuplicate) {
      setSubmitting(false);
      return;
    }

    try {
      await dispatch(addContact(values)).unwrap();
      resetForm();
    } catch (error) {
      alert('Failed to add contact. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={FeedbackSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id={nameFieldId}
              name="name"
              label="Name"
              variant="outlined"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              id={numberFieldId}
              name="number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter phone number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.number && Boolean(errors.number)}
              helperText={touched.number && errors.number}
            />
            {contacts.some(contact =>
              contact.name.toLowerCase() === values.name.toLowerCase() &&
              contact.number === values.number
            ) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Contact Exists</AlertTitle>
                This contact already exists in your phonebook.
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
              fullWidth
            >
              Add contact
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
