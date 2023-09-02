import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_APP_HOST } = import.meta.env;

const TodoList = () => {
  const [nickname, setNickName] = useState('');
  const [todos, setTodos] = useState([]);
  const [filterTodos, setfilterTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [finish, setFinish] = useState(0);
  const [tabStatus, setTabStatus] = useState('all')
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const finishItem = todos.filter((i) => i.status === true)
    setFinish(finishItem.length)
  }, [todos]);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/users/checkout`, {
        headers: {
          Authorization: token,
        },
      });
      setNickName(res.data.nickname);
      getTodos();
    } catch (error) {
      Swal.fire('驗證失敗', '請重新登入').then(() => {
        navigate('/');
      });
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/todos`, {
        headers: {
          Authorization: token,
        },
      });
      setTodos(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addTodo = async () => {
    if (!newTodo) {
      Swal.fire('新增失敗', '請輸入代辦', 'warning');
      return;
    }
    try {
      const res = await axios.post(
        `${VITE_APP_HOST}/todos`,
        {
          content: newTodo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setNewTodo('');
      getTodos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const finishTodo = async (id) => {
    try {
      const res = await axios.patch(
        `${VITE_APP_HOST}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getTodos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${VITE_APP_HOST}/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getTodos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const clearFinishItem = async () => {
    console.log(tabStatus)
    todos.filter((i) => {
      if(i.status) {
        deleteTodo(i.id)
      }
    })
  }

  const showAll = () => {
    setfilterTodos(todos)
    setTabStatus('all')
  }

  const showNotFinish = () => {
    const notFinish = todos.filter((i)=> i.status === false)
    setfilterTodos(notFinish)
    setTabStatus('notFinish')
  }

  const showFinish = () => {
    const finish = todos.filter((i)=> i.status === true)
    setfilterTodos(finish)
    setTabStatus('finish')
  }

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>{nickname}的代辦</span>
            </a>
          </li>
          <li>
            <a href="#loginPage">登出</a>
          </li>
        </ul>
      </nav>
      <div className="container todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="請輸入待辦事項"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <a
              href="#"
              className="p-0"
              onClick={(e) => {
                e.preventDefault();
                addTodo();
              }}
            >
              <img src="/plus.png" alt="plus" />
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a href="#" className={tabStatus === 'all' ? 'active' : ''}
                 onClick={(e) => {
                  e.preventDefault();
                  showAll()
                }}
                >
                  全部
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={tabStatus  === 'notFinish'? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    showNotFinish(e)
                  }}
                >
                  待完成
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={tabStatus === 'finish'? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    showFinish()
                  }}
                >
                  已完成
                </a>
              </li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                {filterTodos.map((todo) => {
                  return (
                    <li key={todo.id}>
                      <label className="todoList_label">
                        <input
                          className="todoList_input"
                          type="checkbox"
                          checked={todo.status}
                          onChange={() => finishTodo(todo.id)}
                        />
                        <span>{todo.content}</span>
                      </label>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTodo(todo.id);
                        }}
                      >
                        <img src="/delete.jpg" alt="delete" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="todoList_statistics">
                <p> {finish}個已完成項目</p>
                <a href="#" onClick={(e)=> {
                  e.preventDefault()
                  clearFinishItem()
                }}>清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
