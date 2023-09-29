import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import PaginationItem from './PaginationItem'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  total: number
  limitBtn: number
  onPageChange: (page) => void
}

const Pagination = ({
  currentPage,
  total,
  limitBtn,
  onPageChange,
}: PaginationProps) => {
  const { theme } = useContext(ThemeContext)
  const pageCount = Math.ceil(total / limitBtn)

  if (pageCount <= 5) {
    return (
      <div className={`${styles['pagination']} ${styles[`theme-${theme}`]}`}>
        {Array(pageCount)
          .fill(0)
          .map((_, index) => (
            <PaginationItem
              key={index + 1}
              page={index + 1}
              selected={index + 1 === currentPage}
              handleClick={onPageChange}
            />
          ))}
      </div>
    )
  }
  return (
    <div className={`${styles['pagination']} ${styles[`theme-${theme}`]}`}>
      {/* Pagination Item: First */}
      <PaginationItem
        page={1}
        selected={currentPage === 1}
        handleClick={onPageChange}
      />
      {!(currentPage <= 3) && '...'}

      {/* Pagination Item: Middle */}
      {currentPage <= 3 &&
        Array(3)
          .fill(0)
          .map((_, index) => (
            <PaginationItem
              key={index + 2}
              page={index + 2}
              selected={index + 2 === currentPage}
              handleClick={onPageChange}
            />
          ))}

      {pageCount > 6 && currentPage > 3 && currentPage <= pageCount - 3 && (
        <>
          <PaginationItem
            page={currentPage - 1}
            selected={false}
            handleClick={onPageChange}
          />
          <PaginationItem
            page={currentPage}
            selected
            handleClick={onPageChange}
          />
          <PaginationItem
            page={currentPage + 1}
            selected={false}
            handleClick={onPageChange}
          />
        </>
      )}

      {currentPage > pageCount - 3 &&
        Array(3)
          .fill(0)
          .map((_, index) => (
            <PaginationItem
              key={pageCount + index - 3}
              page={pageCount + index - 3}
              selected={pageCount + index - 3 === currentPage}
              handleClick={onPageChange}
            />
          ))}

      {/* Pagination Item: Last */}
      {!(currentPage > pageCount - 3) && '...'}
      <PaginationItem
        page={pageCount}
        selected={pageCount === currentPage}
        handleClick={onPageChange}
      />
    </div>
  )
}

export default Pagination
