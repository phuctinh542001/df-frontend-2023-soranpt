import styles from './Search.module.css';

const Search = ({ keyword, onChangeKeyword }) => {
  return (
    <div className={`${styles['container']}`}>
      <input
        type="text"
        id="search__keyword"
        name="search__keyword"
        autoComplete="on"
        placeholder="Search book ..."
        defaultValue=""
        onChange={(event) => onChangeKeyword(event.target.value)}
      />
    </div>
  );
};

export default Search;
