import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState("");
  const getData = async () => {
    const res = await axios.get("http://localhost:8080/test");
    console.log(res.data)
    setData(res.data.message)
  }
  useEffect(() => {
    getData();
  })
  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
