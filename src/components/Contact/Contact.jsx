import { FaPhone } from 'react-icons/fa6';
import { BiSolidContact } from 'react-icons/bi';
import { deleteContact } from '../../redux/contactsOps';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '../../redux/contactsSlice';
import s from './Contact.module.css';

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
    <li className={s.contactItem}>
      <div className={s.contactInfo}>
        <div className={s.nameContainer}>
          <BiSolidContact className={s.icon} />
          <div>{name}</div>
        </div>
        <div className={s.numberContainer}>
          <FaPhone className={s.icon} />
          <div>{number}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDeleteContact}
        disabled={loading}
        className={s.deleteButton}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

export default Contact;
