import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import Navbar from '../Components/Navbar'

export default class Example extends React.Component {
  render() {
    return (
        <>
        <Navbar></Navbar>
        
        <Container className="mt-5">
            <div className="text-right">
                <Button color="success" className="btn btn-md mb-1 "> <i class="fas fa-plus"></i> Add Product </Button> 
            </div>
            <Table striped>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
      </Container>
      </>
    );
  }
}