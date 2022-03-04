import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import config from './Config'

function App() {
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3500/address-book/api/list')
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setData(data)})
  }, []);

  // 會跑兩次 1st:最初始render頁面 
  // 2nd:因為12行setData，狀態值改變，所以會再render一次
  console.log(data)
  return (
    <>
      <div>{data.rows}</div>
    </>
  );
}

export default App;
