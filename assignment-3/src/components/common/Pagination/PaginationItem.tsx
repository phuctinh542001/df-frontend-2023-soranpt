import styles from './Pagination.module.css'

interface PaginationItemProps {
  page: number
  selected: boolean
  handleClick: (page) => void
}

const PaginationItem = ({
  page,
  selected,
  handleClick,
}: PaginationItemProps) => {
  return (
    <div
      className={`${styles['pagination-item']} ${
        selected && styles['selected']
      }`}
    >
      <button onClick={() => handleClick(page)}>{page}</button>
    </div>
  )
}

export default PaginationItem
