import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/latest-prices');
        const result = await response.json();

        if (response.status !== 200) {
          throw new Error(result.message);
        }

        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderTableRows = () => {
    if (!data || !data.prices) {
      return null;
    }
  
    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleString('fi', options);
    };
    const formatDate2 = (dateString) => {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleString('fi', options);
    };
  
    return (
      <>
        {data.prices.map((item, index) => (
          <tr key={index}>
            <td>{formatDate(item.startDate)} - {formatDate2(item.endDate)}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div>
      <Card style={{ width: '16rem', backgroundColor:"#000000" }}>
        <Card.Body>
          {data ? (
           <Table striped bordered variant="dark" size="sm">
             <thead>
               <tr>
                  <th>Hour</th>
                  <th>Price</th>
               </tr>
               </thead>
             <tbody>{renderTableRows()}</tbody>
           </Table>
            ) : (
            <p>Loading...</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;