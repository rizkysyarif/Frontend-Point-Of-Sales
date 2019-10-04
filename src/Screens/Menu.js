import React from 'react';
import { Container, Row, Col, Jumbotron, Form, CardHeader, Badge, CardBody,Card, CardImg, CardTitle, CardText, Button,Pagination, PaginationItem, PaginationLink, Input} from 'reactstrap';
import Product from './Product'
import axios from 'axios' 
import Rupiah from 'rupiah-format'
import { async } from 'q';



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
       await axios.get(`http://localhost:7373/api/product?search=${search}&sort=${sort}&limit=${limit}&page=${page}`)
          .then(result => {
            let page = []
            this.setState({data: result.data.data})
            console.log(result.data.totalData)
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
        const exists = this.state.cart.find(({ id }) => id === data.id)
        if (exists) {
          window.alert('Barang Sudah Di Cart')
        } else {
          data.count=1
          const cart = [...this.state.cart, data]
          this.setState({
            cart
          })
        }
      }

      addqty(data) {
        let cart = this.state.cart[data]
        cart.count += 1
        this.setState({
          cart:[cart]
        })

      }
      reduceqty(data) {
        let cart = this.state.cart[data]
        let allcart = this.state.cart
        if(cart.count > 1) {
          cart.count -= 1
          this.setState({
            cart:[cart]
          })
          
        } else {
          allcart.splice(data, 1)
          this.setState({
            cart: allcart
          })
        }
      }

  render() {
    return (
      <Row>
        <Col xs="6" sm="10">
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

        <Col xs="6" sm="2">
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
                        <CardImg src={`http://localhost:7373/${val.image}`}/> 
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
          
            <div class="container">
              <span class="text-muted">Place sticky footer content here.</span>
            </div>
         
        </Col>
      </Row>

      
    );
  }
}
