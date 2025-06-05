import s from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/filtersSlice';
import { setFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const userSearch = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={s.searchBox}>
      <p>Find contacts by name</p>
      <input type="text" value={userSearch} onChange={onChange} />
    </div>
  );
};

export default SearchBox;
