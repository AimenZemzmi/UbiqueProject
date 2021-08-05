import './App.css';
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
const axios = require('axios');

function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = submitData => {
        if (data !== undefined && submitData.user !== 0) {
            data.forEach(user => {
                if(user.id === submitData.user){
                    console.log(submitData, user);
                }
            });
        } else
            console.log(submitData);
    };

    const fetchUsers = async () => {
        const result = await axios('https://jsonplaceholder.typicode.com/users')
        return result.data
    };

    const { isLoading, error, data } = useQuery('fetchUsers', fetchUsers);

    if (error)
        console.log('Error: ' + error.message);

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register("user", { valueAsNumber: true, setValueAs: v => parseInt(v) })}>
                    <option value="0" defaultValue={0}>...</option>
                    {
                        !isLoading && 
                            data.map((userInfo, key) => (
                                <option key={userInfo.id} value={userInfo.id}>{userInfo.name}</option>
                            ))
                    }
                </select>
                <input type="submit" />
                {error && <div>ERROR</div>}
            </form>
        </div>
      );
}

export default App;