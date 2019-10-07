import React from "react";
import { Label, FormText, Container, Button, Col, FormGroup, Row, Form, Input, CardHeader, Card, CardBody } from 'reactstrap';
import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";

class Add extends React.Component {

  addProduct(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data)
  
    fetch('http://localhost:9000/api/product', {
      method: 'POST',
      body: data,
    })
    window.location.href = 'http://localhost:3000/Dashboard'

  }

  render() {
    return (
      <div style={{marginRight:"-400px", marginLeft:"500px"}}>
        
        <Col lg="5" md="5">
        <Card>
        <Container>
        <CardHeader className="bg-transparent pb-2">
          <div className="text-muted text-center mt-2 mb-3">
            <h1>Add Product</h1>
          </div> 
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">                            
          <Form onSubmit={this.addProduct}>
            <FormGroup>
              <Label>Product Name</Label>
              <Input type="text" name="name" />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input type="textarea" name="description" />
            </FormGroup>
            <FormGroup>
              <Label>Image</Label>
              <Input type="file" name="image" />
              <FormText color="muted">
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Input type="select" name="category">
                <option value='1'>Makanan</option>
                <option value='2'>Minuman</option>
                <option value='3'>Bumbu</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input type="number" name="price" />
            </FormGroup>
            <FormGroup>
              <Label>Count</Label>
              <Input type="number" name="count" />
            </FormGroup>
            
            <Button color="primary">Add</Button>{' '}
            <Button color="danger">Cancel</Button>
          </Form>
          </CardBody> 
         </Container>
         </Card>
        </Col>
      </div>
    );
  }
}

export default Add;