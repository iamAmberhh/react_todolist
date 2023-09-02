import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
const { VITE_APP_HOST } = import.meta.env;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate()
  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire('資料錯誤', '請填寫正確的登入資訊');
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, loginData);
      const { data } = await res
      document.cookie = `token=${data.token}; SameSite=None; Secure`;
      Swal.fire(
        '登入成功',
        '即將進入待辦清單'
      ).then(() => {
        navigate('/todo')
      })
    } catch (error) {
      Swal.fire('登入失敗', error.response.data.message);
    }
  };

  return (
    <div>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
        <label className="formControls_label" htmlFor="email">
          Email
        </label>
        <input
          className="formControls_input"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>此欄位不可留空</span>
        <label className="formControls_label" htmlFor="pwd">
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwd"
          placeholder="請輸入密碼"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="formControls_btnSubmit"
          type="button"
          value="登入"
          onClick={handleLogin}
        />
        <NavLink to="/sign_up" className="formControls_btnLink">註冊帳號</NavLink>
      </form>
    </div>
  );
};

export default Login;
