import React from "react";
import { Label, FormText, Jumbotron, Button, Col, FormGroup, Form, Input, CardHeader, Card, CardBody } from 'reactstrap';
import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import Axios from "axios";
import { Link } from 'react-router-dom'

class Add extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          categories: [],
          category: 0,
          name: "",
          description:"",
          price: 0,
          count: 0,
          image:""
        }
    }

    componentDidMount = async () => {
      await this.getAllCategory()
      this.getProduct()
      console.log(this.props.match.params.id)
    }

    getAllCategory = async () => {
      await Axios.get('http://localhost:9000/api/category')
      
      .then(result => {
        this.setState({ categories: result.data.data })
      })
      
      .catch(err => {
        console.log(err)
      })
    }

    getProduct = async () => {
      await Axios.get(`http://localhost:9000/api/product/${this.props.match.params.id}`)
      .then(result => {
        this.setState({
          category: result.data.data[0].category,
          description: result.data.data[0].description,
          image: result.data.data[0].image,
          name: result.data.data[0].name,
          price: result.data.data[0].price,
          count: result.data.data[0].count,

        })
      })
      .catch(err => {
        console.log(err)
      })
    }

    handlerChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      this.setState({
        [name]: value
      })
    }

    handlerImage = (event) => {
      if (typeof event.target.data[0] != "undefined") {
        this.setState({
          image: event.target.data[0]
        })
      }
    }

    updateProduct = () => {
      let data = new FormData();
      data.append('name', this.state.name);
      data.append('price', this.state.price);
      data.append('category', this.state.category);
      data.append('description', this.state.description);
      data.append('count', this.state.count);
      data.append('image', this.state.image);
  
  
      Axios.patch('http://localhost:9000/api/product/' + this.props.match.params.id, data)
        .then(response => {
          window.location.href = 'http://localhost:3000/Dashboard'
        })
        .catch(error => {
          console.log(error)
        });
    }
  



  render() {
    return (
      <>
      
      <div style={{marginRight:"-400px", marginLeft:"500px"}}>
        
        <Col lg="5" md="5">
        <Card>
          <Jumbotron>
            <CardHeader className="bg-transparent pb-2">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>Edit Product</h1>
              </div> 
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">                            
              <Form>
                <FormGroup>
                  <Label>Product Name</Label>
                  <Input type="text" name="name" value={this.state.name} onChange={(event) => this.handlerChange(event)} />
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input type="textarea" name="description" value={this.state.description} onChange={(event) => this.handlerChange(event)} />
                </FormGroup>
                <FormGroup>
                  <Label>Image</Label>
                  <Input type="file" name="image" onChange={(event) => this.handlerImage(event)} />
                  <FormText color="muted">
                  </FormText>
                </FormGroup>
                <FormGroup>
                <Label>Category</Label>
                  <Input type="select" name="category" id="category" value={this.state.category} onChange={(event) => this.handlerChange(event)}>
                    {this.state.categories.map((item) => {
                      return(
                      <option key={item.id} value={item.id} >{item.name_category}</option>
                      )
                    }) 
                      
                      
                      
                    }
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Price</Label>
                  <Input type="number" name="price" value={this.state.price} onChange={(event) => this.handlerChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <Label>Count</Label>
                  <Input type="number" name="count" value={this.state.count} onChange={(event) => this.handlerChange(event)} />
                </FormGroup>
                
                <Button color="primary" onClick={() => this.updateProduct()}>Update</Button>{' '}
                <Link to="/dashboard">
                <Button color="danger">Cancel</Button>
                </Link>
              </Form>
            </CardBody> 
          </Jumbotron>
        </Card>
        </Col>
      </div>

      </>
    );
  }
}

export default Add;