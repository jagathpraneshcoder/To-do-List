import React, { useState, useEffect } from "react";

function Button({ jsonData }) {
  return (
    <>
      {jsonData.length > 0 ? (
        jsonData.map((data) => (
          <div className="card" style={{ width: "18rem" }} key={data.todo_id}>
            <img src="client/src/assets/sample.jpeg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{data.description}</h5>
              <a href="#" className="btn btn-primary">Edit</a>
              <a href="#" className="btn btn-danger">Delete</a>
            </div>
          </div>
        ))
      ) : (
        <p>No todos available</p>
      )}
    </>
  );
}

function ListTodo() {
  const [jsonData, setJsonData] = useState([]); // ✅ Initialize as an empty array

  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setJsonData(data); // ✅ Store array directly
    } catch (error) {
      console.error(error.message);
      setJsonData([]); // ✅ Fallback to an empty array
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      {jsonData.length > 0 ? <Button jsonData={jsonData} /> : <p>Loading...</p>}
    </>
  );
}

export default ListTodo;
