import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import Pagination from '../../common/Pagination/Pagination';
import styles from './DataTable.module.css';

const DataTable = ({
  dataTitle,
  data,
  limitPage,
  currentPage,
  handlePageChange,
  handleActions,
}) => {
  const { theme } = useContext(ThemeContext);

  // const [currentPage, setCurrentPage] = useState(initPage);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    let dataCurrentPage = [];
    for (let i = 0; i < limitPage; i++) {
      dataCurrentPage[i] = {
        serial: i + (currentPage - 1) * limitPage + 1,
        ...data[i + (currentPage - 1) * limitPage],
      };
    }
    setCurrentData(dataCurrentPage);
  }, [data, limitPage, currentPage]);

  return (
    <div className={`${styles['container']} ${styles[`theme-${theme}`]}`}>
      <table>
        <thead>
          <tr>
            {dataTitle.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.serial}</td>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>{item.topic}</td>
                <td>
                  {item.id && (
                    <>
                      <button onClick={() => handleActions[0](item)}>
                        Update
                      </button>
                      <button onClick={() => handleActions[1](item)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        total={data.length}
        limitBtn={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTable;