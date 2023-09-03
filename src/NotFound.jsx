import { Routes, Route, NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
       <div>
        <h2 className="formControls_txt">Not Found</h2>
        <div className="fs-lg">404</div>
        <NavLink to="/" className="formControls_btnLink">
          登入
        </NavLink>
    </div>
    </>
  );
};

export default NotFound;
