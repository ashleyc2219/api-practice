import './App.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// 將連接資料庫需要用到的參數，丟到一個檔案裡方便管理
import config from './Config';

function App() {
  const [data, setData] = useState([]);

  // 取資料 改寫成一個function
  // ?page=${page} 是node後端資料庫 寫好的可以透過res.query接住page的值
  const getData = async (page = 1) => {
    const obj = await (await fetch(config.AB_LIST + `?page=${page}`)).json();
    console.log(obj);
    setData(obj);
  };
  let history = useHistory();
  let location = useLocation();
  // 要取資料直接呼叫function
  useEffect(() => {
    const usp = new URLSearchParams(location.search);
    const page = parseInt(usp.get('page'));
    console.log({ page });
    getData(page || 1);
  }, [location.search]);

  // 會跑兩次 1st:最初始render頁面
  // 2nd:因為12行setData，狀態值改變，所以會再render一次
  console.log(data);

  function changeQueryString(page) {
    history.push(`?page=${page}`);
  }

  // 判斷data拿到沒有，如果是undefined的時候render就會報錯
  const renderMe = (data) => {
    if (data.rows && data.rows.length) {
      return data.rows.map((value) => (
        <tr key={'test' + value.pro_id}>
          <td>{value.pro_id}</td>
          <td>{value.pro_name}</td>
          <td>{value.pro_stock}</td>
          <td>{value.pro_condition}</td>
        </tr>
      ));
    } else {
      return '';
    }
  };

  return (
    <div className="App">
      <div className="container">
        {data.rows && data.rows.length ? (
          <ul className="pagination">
            <li className={data.page <= 1 ? 'disabled page-item' : 'page-item'}>
              <a
                className="page-link"
                href="#/"
                onClick={() => {
                  getData(data.page - 1);
                }}
              >
                Previous
              </a>
            </li>

            {Array(data.totalPages)
              .fill(1)
              .map((value, index) => {
                return (
                  <li
                    key={'page' + index}
                    className={
                      data.page === index + 1 ? 'page-item active' : 'page-item'
                    }
                  >
                    <a
                      className="page-link"
                      href="#/"
                      onClick={(event) => {
                        event.preventDefault();
                        getData(index + 1);
                        changeQueryString(index + 1);
                      }}
                    >
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            <li
              className={
                data.page >= data.totalPages
                  ? 'disabled page-item'
                  : 'page-item'
              }
            >
              <a
                className="page-link"
                href="#/"
                onClick={() => {
                  getData(data.page + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        ) : (
          ''
        )}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">stock</th>
              <th scope="col">condition</th>
            </tr>
          </thead>
          <tbody>{renderMe(data)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
