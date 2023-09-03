import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <>
      <div className="bg-yellow">
        <div className="container signUpPage vhContainer">
          <div className="side">
            <img className="logoImg" src="/react_todolist/logo_lg.png" alt="logo" />
            <img className="d-m-n" src="/react_todolist/img.png" alt="workImg" />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
