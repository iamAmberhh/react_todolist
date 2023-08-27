import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const apiUrl = 'https://todolist-api.hexschool.io';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !nickname) {
      Swal.fire('資料錯誤', '請填寫正確的註冊資訊', 'warning');
      return;
    }
    if (password !== passwordCheck) {
      Swal.fire('資料錯誤', '密碼與確認密碼不同', 'warning');
      return;
    }
    const signUpData = {
      email,
      password,
      nickname,
    };
    try {
      const res = await axios.post(`${apiUrl}/users/sign_up`, signUpData);
      console.log(res);
      // setMsg(res.data.uid);
      // setEmail("");
      // setPassword("");
      // setPasswordCheck("");
      // setNickname("");
    } catch (error) {
      Swal.fire('註冊失敗', error.response.data.message, 'error');
    }
  };

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="container signUpPage vhContainer">
        <div className="side">
          <a href="#">
            <img className="logoImg" src="/logo_lg.png" alt="logo" />
          </a>
          <img className="d-m-n" src="/img.png" alt="workImg" />
        </div>
        <div>
          <form className="formControls" action="index.html">
            <h2 className="formControls_txt">註冊帳號</h2>
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
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              name="name"
              id="name"
              placeholder="請輸入您的暱稱"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
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
            <label className="formControls_label" htmlFor="pwdCheck">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwdCheck"
              placeholder="請再次輸入密碼"
              required
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <input
              className="formControls_btnSubmit"
              type="button"
              value="註冊帳號"
              onClick={handleSignUp}
            />
            <a className="formControls_btnLink" href="#loginPage">
              登入
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
