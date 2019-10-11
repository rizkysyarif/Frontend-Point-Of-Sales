import React from 'react';
import { Container, Row, ModalBody,Modal, ModalFooter, ModalHeader, Col, Jumbotron, CardHeader, Badge, CardBody,Card, CardImg, CardTitle, 
  CardText, Button,Pagination, PaginationItem, PaginationLink, Input, DropdownMenu, DropdownItem, DropdownToggle, ButtonDropdown} from 'reactstrap';
import Product from './Product'
import axios from 'axios' 
import Rupiah from 'rupiah-format'
import { async } from 'q';
import './Menu.css'
import { getProduct } from '../Public/Redux/Actions/Product'
import { connect } from 'react-redux'



class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
          data: [],
          cart: [],
          search: '',
          sort: '',
          limit: '8',
          page: '1',
          allPage:[],
          modal: false,
          dropdownOpen: false,
          total_price: 0
        };
      }

      toggleDropdown() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
        if(!this.state.modal){
          this.checkout()
        }else{
          this.setState({ cart:[], total_price: 0 })
        }
      }

      checkout = () => {
        let resOrders = []
        this.state.cart.map(item=>{
          const finalData = Object.keys(item).map(i=> {return item[i]})
          resOrders.push([finalData[0], finalData[2],finalData[5]])
        })
        let order = { total_price: this.state.total_price, order: resOrders}
        axios.post('http://localhost:9000/api/order', order )
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
        const page = []
        const result =  await this.props.dispatch(getProduct({
          search: this.state.search,
          sort: this.state.sort,
          limit: this.state.limit,
          page: this.state.page
        }))
        const currentAllpage = Math.ceil(result.value.data.totalData / this.state.limit)
            
        for(let i=0; i < currentAllpage; i++){
          page.push(i+1)
        }
        this.setState({allPage:page})
      }
    
      async addCart(data) {
        const { id, name, price, image, count } = { ...data }
        let cart = { id, name, price, image, count, qty: 1}
        const exists = this.state.cart.find(({ id }) => id === data.id)
        if (exists) {
          window.alert('This Product is already in the cart')
        } else if(count < 1){
          window.alert('This Product is empty')
        }
        else {
          data.qty = 1
          const carts = [...this.state.cart, cart]
          await this.setState({
            cart : carts
          })
        }
        await this.renderTotalCart()
      }

      async addqty(data) {
        let cart = this.state.cart[data]
        let product = this.props.data.productList.find(product => product.id == cart.id)
        if(cart.qty < product.count){
          cart.qty += 1
        cart.price += product.price
        await this.setState({
          carts:[cart]
        })
        }
        await this.renderTotalCart()
      }
      async reduceqty(data) {
        let cart = this.state.cart[data]
        let allcart = this.state.cart
        let product = this.props.data.productList.find(product => product.id == cart.id)
        if(cart.qty > 1) {
          cart.qty -= 1
          cart.price -= product.price
          await this.setState({
            carts:[cart]
          })
          
        } else {
          allcart.splice(data, 1)
          await this.setState({
            cart: allcart
          })
        }
        await this.renderTotalCart()
      }

      remove(data){
        let allcart = this.state.cart

        allcart.splice(data, 1)
          this.setState({
            cart: allcart
        })
      }
      
      async renderTotalCart() {
        let total = 0
        this.state.cart.forEach((val, key) => {
          total += val.price
        })
        await this.setState({total_price: total})
        console.log(this.state.total_price)
        // return (<b>{Rupiah.convert(total)}</b>)
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
      <>
      <Row style={{ marginTop: 50 }}>
        <Col md="10" sm="12">
          <Jumbotron>
            
              <Input
               type="text" name="search" id="search" placeholder="Search" onChange={(e) => this.searchValue(e)} 
               style={{ width:"30%" }}
               />      
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>
                      Sort By
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem  onClick={() => this.sortProduct("name")}>Name</DropdownItem>
                      <DropdownItem onClick={() => this.sortProduct("price")}>Price</DropdownItem>
                      <DropdownItem onClick={() => this.sortProduct("date_added")}>Date Add</DropdownItem>
                      <DropdownItem onClick={() => this.sortProduct("date_update")}>Date Update</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <div className="text-right">
                    <Button color="success" href="Add"><i class="fas fa-plus"></i> Add Product </Button> 
                  </div>
    
            
           
            <Row>
              {
                this.props.data.productList.map((item, index) => {
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
              <Pagination className="mt-3" >
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
                                <Button color="success" className="btn btn-sm ml-3 mr-2" onClick={()=>{ this.addqty(key) } } > <i className="fas fa-plus"/> </Button> 
                                <span>{val.qty}</span>
                                <Button color="danger" className="btn btn-sm ml-3" onClick={()=>{ this.reduceqty(key) } } > <i class="fas fa-minus"></i> </Button> 
                                <Button color="danger" className="btn btn-sm ml-4 mt-2" onClick={()=>{ this.remove(key) } } > Remove </Button> 
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
                  <p>{ Rupiah.convert(this.state.total_price) }</p>
                  <Button block color="success" className="btn btn-md ml-2" onClick={this.toggle}> CHECKOUT </Button> 
                </Col>
                <Col md={12}>
                  <Button block color="danger" className="btn btn-md ml-2" onClick={this.cancel} > CANCEL </Button>
                </Col>
              </Row>
            </div>
        </Col>
      </Row>


      {/* MODAL */}
      <div>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>CHECKOUT</ModalHeader>
          <ModalBody>
          <Row>
                          <Col xs="5"><th>Name</th></Col>
                          <Col xs="3"> <th>Quantity</th></Col>
                          <Col xs="4"><th>Price</th></Col>
                        </Row>
          {
                  this.state.cart.map((val, key) => {
                    return (
                      <div>
                        <Row>
                          <Col xs="6">{val.name}</Col>
                          <Col xs="1"> {val.qty} </Col>
                          <Col xs="1"> : </Col>
                          <Col xs="4">{Rupiah.convert(val.price)}</Col>
                        </Row>               
                      </div>
                        
                    )
                  })
                }
                <br/>
                <div>
                  <Card>
                  <Row>
                    <Col xs="7">Total</Col>
                    <Col xs="1"> : </Col>
                    <Col xs="4">{Rupiah.convert(this.state.total_price)}</Col>
                 </Row>
                 </Card>
                </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}> <i class="fas fa-print"></i> Print</Button>{' '}
            <Button color="success" onClick={this.toggle}> <i class="fas fa-envelope"></i> Send Email</Button>
          </ModalFooter>
        </Modal>
      </div>
      
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.productList
  }
}

export default connect (mapStateToProps)(Menu)
