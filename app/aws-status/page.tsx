'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AwsPage = () => {
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/aws-elasticIp');
        setData(response.data.message);
      } catch (err) {
        setError("Error fetching AWS security groups");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {data ? <pre>{data}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default AwsPage;
