import React from "react";

function App() {

  const [data, setDAta] = React.useState("")

  const [name, setName] = React.useState("")

  React.useEffect(() => {
    fetch("http://localhost:4000/all")
      .then((res) => res.json())
      .then(data => {
        setDAta(data)
      })
      .catch(console.error);
  }, []);

  const saveName = () => {

    if (name) {
      fetch(`http://localhost:4000/create/${name}`)
      setName("")
      return
    }

    alert("Please enter name")
  }

  return <>
    <ul>
      {
        data && data.users.length > 0 && data.users.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
    </ul>
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={saveName}>Save</button>
    </div>

  </>;
}

export default App;
