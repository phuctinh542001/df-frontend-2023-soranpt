import styles from './Search.module.css'

interface SearchProps {
  onChangeKeyword: (keyword) => void
}

const Search = ({ onChangeKeyword }: SearchProps) => {
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
  )
}

export default Search
