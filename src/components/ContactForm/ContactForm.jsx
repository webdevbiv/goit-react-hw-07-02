import { useId } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts, selectLoading } from '../../redux/contactsSlice';

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
      alert(`${values.name} is already in contacts.`);
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ isSubmitting }) => (
        <Form className={s.contactForm}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field id={nameFieldId} name="name" />
          <ErrorMessage name="name" component="span" />

          <label htmlFor={numberFieldId}>Number</label>
          <Field id={numberFieldId} name="number" type="tel" />
          <ErrorMessage name="number" component="span" />

          <button type="submit" disabled={loading || isSubmitting}>
            {loading || isSubmitting ? 'Adding...' : 'Add Contact'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
