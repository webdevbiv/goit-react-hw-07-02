import { useSelector } from 'react-redux';
import { selectFilteredContacts, selectLoading, selectError } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <div className={s.loading}>Loading contacts...</div>;
  }

  if (error) {
    return <div className={s.error}>Error: {error}</div>;
  }

  if (contacts.length === 0) {
    return <div className={s.loading}>No contacts found</div>;
  }

  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default ContactList;
