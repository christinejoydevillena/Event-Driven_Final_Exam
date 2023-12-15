import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import SalesBarGraph from './SalesBarGraph';

const TransactionReport = () => {
  const [reportData, setReportData] = useState([]);
  const [sortByQuantity, setSortByQuantity] = useState(false);
  const [sortByTotalAmount, setSortByTotalAmount] = useState(false);

  useEffect(() => {
    const storedReportData = JSON.parse(localStorage.getItem('reportData')) || [];
    setReportData(storedReportData);
  }, []);

  const shouldRenderTable = reportData.length > 0;

  const sortByColumn = (columnName) => {
    const sortedData = [...reportData];
    if (columnName === 'quantity') {
      sortedData.sort((a, b) => a.productQuantity - b.productQuantity);
      if (sortByQuantity) {
        sortedData.reverse();
      }
      setSortByQuantity(!sortByQuantity);
    } else if (columnName === 'totalAmount') {
      sortedData.sort((a, b) => a.productTotalAmount - b.productTotalAmount);
      if (sortByTotalAmount) {
        sortedData.reverse();
      }
      setSortByTotalAmount(!sortByTotalAmount);
    }
    setReportData(sortedData);
  };

  

  return (
    <div>
      <h2 style={{ marginBottom: '50px' }}>Transaction Reports</h2>
      <div style={{ marginBottom: '30px' }}>
        <Button variant="primary" onClick={() => sortByColumn('quantity')}>
          Sort by Quantity
        </Button>
        <span style={{ marginRight: '10px' }}></span>
        <Button variant="primary" onClick={() => sortByColumn('totalAmount')}>
          Sort by Total Amount
        </Button>
      </div>
      <Row>
        <Col xs={12} lg={6}>
          {shouldRenderTable ? (
            <div style={{ marginLeft: '0px' }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.productName}</td>
                      <td>₱{item.productPrice}</td>
                      <td>{item.productQuantity}</td>
                      <td>₱{item.productTotalAmount}</td>
                      <td>{item.dateTime}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </Col>
        <Col xs={12} lg={6}>
          <div style={{ paddingLeft: '20px' }}>
            <SalesBarGraph reportData={reportData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionReport;
