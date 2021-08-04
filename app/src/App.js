
import './App.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

const axios = require('axios');

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = submitData => {
    if (users !== undefined) {
      users.forEach(element => {
        if(element.id === parseInt(submitData.userInfo)){
          console.log(submitData, element);
        }
      });
    } else {
      console.log(submitData);
    }
  };
  const [users, setUsers] = useState([]);
  
  let resUsers = [];
  const { isLoading, error, isFetching } = useQuery("req", () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(function (res) {
      resUsers = res.data;
    }).catch(function (error) {
      console.log(error);
    }).then(function () {
      setUsers(resUsers);
    });
  });

  if (isLoading)
    console.log('Loading');

  if (error)
    console.log('Error: ' + error.message);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        {
          !isFetching && (users !== []) ?
            <select {...register("userInfo")}>
              {
                users.map(userInfo => (
                  <option key={userInfo.id} value={userInfo.id}>{userInfo.name}</option>
                ))
              }
            </select>
            :
            <div>Updating...</div>
        }
        
        <input type="submit" />

      </form>
    </div>
  );
}

export default App;