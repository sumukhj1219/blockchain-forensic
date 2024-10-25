'use client'
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState(null);

  const handleCreateInstance = async () => {
    try {
      const res = await fetch('/api/createInstance', {
        method: 'POST',
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Create EC2 Instance</h1>
      <button onClick={handleCreateInstance}>Create Instance</button>
      {response && <div>{JSON.stringify(response)}</div>}
    </div>
  );
}
