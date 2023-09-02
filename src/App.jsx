import { Routes, Route, NavLink } from 'react-router-dom';
import Auth from './Auth';
import Login from './Login';
import SignUp from './SignUp'
import TodoList from './TodoList';
import NotFound from './NotFound';

const App = () => {
  return (<>
    <div>
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route path='' element={<Login />}/>
          <Route path='sign_up' element={<SignUp />}/>
        </Route>
        <Route path="/todo" element={< TodoList />}/>
        <Route path="*" element={< NotFound />} />
      </Routes>
    </div>
  </>
  );
}

export default App;