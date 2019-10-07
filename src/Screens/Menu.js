import React from 'react';
import { Container, Row, Col, Jumbotron, Form, CardHeader, Badge, CardBody,Card, CardImg, CardTitle, CardText, Button,Pagination, PaginationItem, PaginationLink, Input} from 'reactstrap';
import Product from './Product'
import axios from 'axios' 
import Rupiah from 'rupiah-format'
import { async } from 'q';
import './Menu.css'



export default class Menu extends React.Component {
    constructor(props) {
        super()
        this.state = {
          data: [],
          cart: [],
          search: '',
          sort: '',
          limit: '8',
          page: '1',
          allPage:[]
        }
      }
    
      async componentDidMount() {
        await this.getAll()
        
      }
      async searchValue(e) {
        let value = e.target.value
        setTimeout(() => {
          this.setState({ search: value })
          this.getAll()
        }, 1000)
      }
      sortProduct = async (value) => {
        await this.setState({sort:value})
        this.getAll()
      }
      pageChange = async (page) => {
        await this.setState({page:page})
        this.getAll()
      }
      
    
      getAll = async () => {
        const { search, sort, limit, page } = this.state
       await axios.get(`http://localhost:9000/api/product?search=${search}&sort=${sort}&limit=${limit}&page=${page}`)
          .then(result => {
            let page = []
            this.setState({data: result.data.data})
            const currentAllpage = Math.ceil(result.data.totalData / this.state.limit)

            for(let i=0; i < currentAllpage; i++){
              page.push(i+1)
            }

            this.setState({allPage:page})
            
          })
          .catch(err => {
            console.log(err)
          })
      }

      addCart(data) {
        const { id, name, price, image, count } = data
        let cart = { id, name, price, image, count: 1}
        const exists = this.state.cart.find(({ id }) => id === data.id)
        if (exists) {
          window.alert('This Product is already in the cart')
        } else {
          data.count=1
          const carts = [...this.state.cart, cart]
          this.setState({
            cart : carts
          })
        }
      }

      addqty(data) {
        let cart = this.state.cart[data]
        let product = this.state.data.find(product => product.id == cart.id)
        cart.count += 1
        cart.price += product.price
        this.setState({
          carts:[cart]
        })

      }
      reduceqty(data) {
        let cart = this.state.cart[data]
        let allcart = this.state.cart
        let product = this.state.data.find(product => product.id == cart.id)
        if(cart.count > 1) {
          cart.count -= 1
          cart.price -= product.price
          this.setState({
            carts:[cart]
          })
          
        } else {
          allcart.splice(data, 1)
          this.setState({
            cart: allcart
          })
        }
      }

      renderTotalCart() {
        let total = 0
        this.state.cart.forEach((val, key) => {
          total += val.price
        })
        return (<b>{Rupiah.convert(total)}</b>)
      }

      cancel = (e) => {
        e.preventDefault()
        if(window.confirm('Are You Sure to Empty the Cart'))
        {
          this.setState({
            cart: [],  
          })
        }
      }

      

  render() {
    return (
      <Row>
        <Col md="10" sm="12">
          <Jumbotron>
            
              <Input
               type="text" name="search" id="search" placeholder="Search" onChange={(e) => this.searchValue(e)} 
               style={{ width:"30%" }}
               />     
                <Button type="button" className="btn btn-secondary dropdown-toggle mt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By</Button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" onClick={() => this.sortProduct("name")} >Name</a>
                    <a className="dropdown-item" onClick={() => this.sortProduct("price")} >Price</a>
                    <a className="dropdown-item" onClick={() => this.sortProduct("date_update")} >Date Update</a>
                  </div>    
                  <div className="text-right">
                    <Button color="success" href="Add"><i class="fas fa-plus"></i> Add Product </Button> 
                  </div>
    
            
           
            <Row>
              {
                this.state.data.map((item, index) => {
                  
                  return(
                    <Col className="mt-5" sm="3">
                      <Product dataProduct={item} addCart={data => this.addCart(item)} />
                    </Col>
                    
                  )
                })
              }
            </Row>
            <Row>
              <Col sm="9">
              <Pagination>
              {
                this.state.allPage.map(item => (  
                <PaginationItem key={item}>
                  <PaginationLink onClick={() => this.pageChange(item)}>
                    {item}
                  </PaginationLink>
                </PaginationItem>
                 ))
              }
              </Pagination>
              </Col>
            </Row>
          </Jumbotron>
        </Col>

        <Col md="2" sm="12">
          <Container>
            <div>
              <CardHeader className="bg-transparent pb-2">
                <div className="text-muted text-center mt-2 mb-1">
                  <h2><i class="fas fa-cart-plus"></i> Cart <Badge color="secondary">{this.state.cart.length}</Badge></h2>
                </div>
                
              </CardHeader>
              <CardBody>
                {
                  this.state.cart.map((val, key) => {
                    return (
                      <Card style={{ marginTop:"10px" }}><Badge color="success">{this.state.cart.count}</Badge>
                        <CardImg src={`http://localhost:9000/${val.image}`}/> 
                        <CardTitle>{val.name}</CardTitle>
                        <CardText>
                          <div style={{display: "grid"}}>
                            <span>
                              {Rupiah.convert(val.price)}
                              <div className="container mt-3">
                                <Button color="success" className="btn btn-sm ml-2" onClick={()=>{ this.addqty(key) } } > <i className="fas fa-plus"/> </Button> 
                                <span>{val.count}</span>
                                <Button color="danger" className="btn btn-sm ml-3" onClick={()=>{ this.reduceqty(key) } } > <i class="fas fa-minus"></i> </Button> 
                              </div> 
                            </span>              
                          </div>
                        </CardText>
                      </Card>
                    )
                  })
                }
              </CardBody>
            </div>
          </Container>
          
            <div style={{backgroundColor: "white" , position: "sticky", bottom: 0, height:"100px" }} className="container">
              <Row>
                <Col md={12}>
                  <p>{ this.renderTotalCart() }</p>
                  <Button block color="success" className="btn btn-md ml-2"> CHECKOUT </Button> 
                </Col>
                <Col md={12}>
                  <Button block color="danger" className="btn btn-md ml-2" onClick={this.cancel} > CANCEL </Button>
                </Col>
              </Row>
            </div>
         
        </Col>
      </Row>

      
    );
  }
}
