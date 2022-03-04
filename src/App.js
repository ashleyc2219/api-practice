import './App.css';
import { useEffect, useState } from 'react';

// 將連接資料庫需要用到的參數，丟到一個檔案裡方便管理
import config from './Config';

function App() {
  const [data, setData] = useState([]);
  // 改寫成async, await的方式
  useEffect(() => {
    (async () => {
      const r1 = await fetch(config.AB_LIST);
      const obj = await r1.json();
      console.log(obj);
      setData(obj);
    })();
  }, []);

  // 會跑兩次 1st:最初始render頁面
  // 2nd:因為12行setData，狀態值改變，所以會再render一次
  console.log(data);

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
            <li className="page-item">
              <a className="page-link" href="#/">
                Previous
              </a>
            </li>

            {Array(data.totalPages)
              .fill(1)
              .map((value, index) => {
                return (
                  <li className="page-item">
                    <a className="page-link" href="#/">
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            <li className="page-item">
              <a className="page-link" href="#/">
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
