import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const apiUrl = 'https://todolist-api.hexschool.io';
const token = '';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    getTodos();
  }, [token]);

  const getTodos = async () => {
    try {
      const res = await axios.get(`${apiUrl}/todos`, {
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
        `${apiUrl}/todos`,
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
  const completeTodo = async (id) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/todos/${id}/toggle`,
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
      const res = await axios.delete(`${apiUrl}/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getTodos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>王小明的代辦</span>
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
            <a href="#" className="p-0" onClick={addTodo}>
						<img src="/plus.png" alt="plus" />
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a href="#" className="active">
                  全部
                </a>
              </li>
              <li>
                <a href="#">待完成</a>
              </li>
              <li>
                <a href="#">已完成</a>
              </li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                {todos.map((todo) => {
                  return (
                    <li key={todo.id}>
                      <label className="todoList_label">
                        <input
                          className="todoList_input"
                          type="checkbox"
                          value={todo.status}
                        />
                        <span>{todo.content}</span>
                      </label>
                      <a href="#" onClick={()=> deleteTodo(todo.id)}>
												<img src="/delete.jpg" alt="delete" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="todoList_statistics">
                <p> 5個已完成項目</p>
                <a href="#">清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
