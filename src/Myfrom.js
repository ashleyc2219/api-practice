import React from 'react';
import { useState, useEffect } from 'react';
import config from './Config';

function Myfrom(props) {
  const [row, setRow] = useState({});
  const API = config.Admin_LIST + '/1';
  useEffect(() => {
    (async () => {
      const data = await fetch(API);
      const dataJson = await data.json();
      console.log(dataJson);
      setRow(dataJson[0]);
    })();
  }, []);

  const whenChangedAvatar = (event) => {
    console.log(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = function (event) {
      document.querySelector('#myImg').src = reader.result;
    };
    // 讀取資料
    reader.readAsDataURL(event.target.files[0]);
  };

  const whenSubmit = async (event) => {
    //   避免傳統方式送出表單
    event.preventDefault();

    const fd = new FormData(document.form1);

    const r = await fetch(API, {
      method: 'PUT',
      body: fd,
    });
    const obj = await r.json();
    console.log(obj);
  };
  return (
    <>
      <div className="container">
        <form name="form1" onSubmit={whenSubmit}>
          <div className="mb-3">
            <label htmlFor="account" className="form-label">
              Account
            </label>
            <input
              type="text"
              className="form-control"
              disabled
              value={row.admin_name}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your info with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nickname" className="form-label">
              Nickname
            </label>
            <input
              type="text"
              className="form-control"
              id="nickname"
              name="nickname"
              defaultValue={row.nickname}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="avatar"
              name="avatar"
              onChange={whenChangedAvatar}
            />
            <img
              src={config.IMG_PATH + '/' + (row.avatar || 'default.jpg')}
              alt=""
              id="myImg"
              className="imgSize"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Myfrom;
