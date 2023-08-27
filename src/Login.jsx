import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const apiUrl = "https://todolist-api.hexschool.io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire(
        '資料錯誤',
        '請填寫正確的登入資訊',
        'warning'
      )
      return;
    }

    const loginData = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post(`${apiUrl}/users/sign_in`, loginData);
      Swal.fire(
        '登入成功',
        'res.data.token',
        'success'
      )
      // setToken(res.data.token);
      // setMsg();
      // setEmail("");
      // setPassword("");
    } catch (error) {
      // setMsg(error.response.data.message);
      Swal.fire(
        '登入失敗',
        error.response.data.message,
        'error'
      )
    }
  };

  return  (
    <div id="loginPage" className="bg-yellow">
      <div className="container loginPage vhContainer ">
          <div className="side">
              <a href="#"><img className="logoImg" src="/logo_lg.png" alt="logo"/></a>
              <img className="d-m-n" src="/img.png" alt="workImg" />
          </div>
          <div>
          <form className="formControls" action="index.html">
                  <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                  <label className="formControls_label" htmlFor="email">Email</label>
                  <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  <span>此欄位不可留空</span>
                  <label className="formControls_label" htmlFor="pwd">密碼</label>
                  <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                  <input className="formControls_btnSubmit" type="button" value="登入" onClick={handleLogin}/>
                  <a className="formControls_btnLink" href="#signUpPage">註冊帳號</a>
              </form>
          </div>
      </div>
    </div>
  )
 
}

export default Login;
