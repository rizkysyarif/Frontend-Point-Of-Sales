import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardBody, CardTitle, Container, Row, Col, Table,Pagination, PaginationItem, PaginationLink,Jumbotron, Nav, Navbar, NavbarBrand } from "reactstrap";
import Sidebar from '../Components/Sidebar'
import Axios from 'axios';
import Rupiah from 'rupiah-format'
import { async } from 'q';


export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dailyIncome: [],
            weeklyIncome:[],
            monthlyIncome:[],
            yearlyIncome: [],
            data: {},
            order:[],
            allPage:[],
            limit:"10",
            page: "1"
        }
    }

  async  componentDidMount(){
     await this.getDailyIncome()
     await this.getWeeklyIncome()
     await this.getmonthlyIncome()
     await this.getYearlyIncome()
     await this.drawGraph("weekly")
     await this.getOrder()
    }

    getOrder = async () => {
      const { limit, page } = this.state
      await Axios.get(`http://localhost:9000/api/order?limit=${limit}&page=${page}`)
      .then(result => {
        let page = []
        this.setState({order: result.data.data}) 
        const currentAllpage = Math.ceil(result.data.totalData / this.state.limit)

        for(let i=0; i < currentAllpage; i++){
          page.push(i+1)
        }

        this.setState({allPage:page})
      })
      .catch(err =>{
        console.log(err)
      }) 
    }

    getDailyIncome = async () => {
       await Axios.get('http://localhost:9000/api/history/dailyincome')
        .then(result => {
            this.setState({dailyIncome: result.data.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getWeeklyIncome = async () => {
       await Axios.get('http://localhost:9000/api/history/weeklyIncome')
        .then(result => {
            this.setState({weeklyIncome: result.data.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getmonthlyIncome = async () => {
      await Axios.get('http://localhost:9000/api/history/monthlyIncome')
       .then(result => {
           this.setState({monthlyIncome: result.data.data})
       })
       .catch(err => {
           console.log(err)
       })
   }

    getYearlyIncome = async () => {
       await Axios.get('http://localhost:9000/api/history/yearlyIncome')
        .then(result => {
            this.setState({yearlyIncome: result.data.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    pageChange = async (page) => {
      await this.setState({page:page})
      this.getOrder()
    }



    handleLineChart = (event) => {
        let val = event.target.value
        this.drawGraph(val)
    }

    drawGraph = (val) => {
        if(val == "weekly") {
            let weekly = [0]
            this.state.weeklyIncome.map(item =>{
                weekly.push(item.INCOME)
            })
            const dataChart = {
                labels: ["", "", "", "", "","",""],
                datasets: [
                    {
                        label: "This Week",
                        borderColor: "rgba(255, 0, 255, 0.75)",
                        backgroundColor: "",
                        fill: null,
                        data: weekly.slice(Math.max(weekly.length - 7, 0))
                    },
                    {
                        label: "Last Week",
                        borderColor: "rgba(0, 255, 0, 0.75)",
                        fill: null,
                        data: weekly.slice(Math.max(weekly.length - 14, 0)).slice(0, 7)
                    }
                ]
                
            }
            this.setState({data: dataChart})
        }else if( val == "monthly" ) {
          let monthly = [0]
            this.state.monthlyIncome.map(item =>{
                monthly.push(item.INCOME)
            })
            const dataChart = {
                labels: ["", "", "", ""],
                datasets: [
                    {
                        label: "This Month",
                        borderColor: "rgba(255, 0, 255, 0.75)",
                        backgroundColor: "",
                        fill: null,
                        data: monthly.slice(Math.max(monthly.length - 4, 0))
                    },
                    {
                        label: "Last Month",
                        borderColor: "rgba(0, 255, 0, 0.75)",
                        fill: null,
                        data: monthly.slice(Math.max(monthly.length - 8, 0)).slice(0, 4)
                    }
                ]
                
            }
            this.setState({data: dataChart})

        } else if(val == "annual"){
          let yearly = [0]
            this.state.yearlyIncome.map(item =>{
                yearly.push(item.INCOME)
            })
            const dataChart = {
                labels: [ "August", "September","October", "November", "December", "January", "February", "March", "April", "May","June","July", ],
                datasets: [
                    {
                        label: "This Year",
                        borderColor: "rgba(255, 0, 255, 0.75)",
                        backgroundColor: "",
                        fill: null,
                        data: yearly.slice(Math.max(yearly.length - 12, 0))
                    },
                    {
                        label: "Last Year",
                        borderColor: "rgba(0, 255, 0, 0.75)",
                        fill: null,
                        data: yearly.slice(Math.max(yearly.length - 24, 0)).slice(0, 12)
                    }
                ]
                
            }
            this.setState({data: dataChart})
        }
    }



    render() {
        let daily = [0]
        let dailyAmount = []
        this.state.dailyIncome.map(item => {
            daily.push(item.INCOME)
            dailyAmount.push(item.AMOUNT)
        })

        let annual = 0
        this.state.yearlyIncome.map(item =>{
            annual = item.INCOME
        })
        console.log(dailyAmount)
        return (
    <>
    <Row>
      <Col xs="1">
          <Sidebar />
      </Col>
      <Col xs="11" style={{ marginLeft: "-40px" }}>
        <Navbar color="light" light expand="md" style={{ zIndex : 1 }}>
          <Nav className="ml-5">
           <h2 style={{ marginLeft: "650px"}} >History</h2>
          </Nav> 
        </Navbar>
      <Jumbotron>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0" 
                  style={{
                    backgroundColor: "rgba(119, 223, 187, 0.9)",
                    boxShadow: "6px 4px 8px 6px rgba(0, 0, 0, 0.2)",
                    padding: "16px",
                  
                  }}
                  
                  
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase  mb-0"
                          >
                            Today's Income
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {Rupiah.convert(daily[daily.length - 1])}
                          </span>
                        </div>
                        
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-danger mr-2">
                          <i className="fa fa-arrow-down" /> 10%
                          {/* { Math.round(
                            ((daily[daily.length - 1] - daily[daily.length - 2]) / 
                              daily[daily.length - 2 ]) 
                            
                          ) } */}
                          
                        </span>{" "}
                        <span className="text-nowrap">Yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0" style={{
                    backgroundColor:"rgba(207, 228, 47, 0.89)",
                    boxShadow: "6px 4px 8px 6px rgba(0, 0, 0, 0.2)",
                    padding: "16px",
                }}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase mb-0"
                          >
                            Orders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {dailyAmount[dailyAmount.length - 1]}
                          </span>
                        </div>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-plus" /> 
                          {/* { Math.round(
                            ((dailyAmount[dailyAmount.length - 1] - dailyAmount[dailyAmount.length - 2]) / 
                              dailyAmount[dailyAmount.length - 2 ]) 
                            
                          ) } */}
                          
                          5 %
                        </span>{" "}
                        <span className="text-nowrap">Last Week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0" style={{
                    backgroundColor:"rgba(140, 188, 243, 0.89)",
                    boxShadow: "6px 4px 8px 6px rgba(0, 0, 0, 0.2)",
                    padding: "16px",
                }}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase mb-0"
                          >
                            This Year's Income
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"> {Rupiah.convert(annual)} </span>
                        </div>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-plus" /> 10%
                        </span>{" "}
                        <span className="text-nowrap">Last Year</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div> 

        {/* Chart */}
        <Container>
            
            <Card className="mt-5 mb-4" style={{
               boxShadow: "6px 4px 8px 6px rgba(0, 0, 0, 0.2)",
               padding: "16px",
            }}>
            <h3>Revenue</h3>
            <select style={{ width:'20%' }} onChange={this.handleLineChart} >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annual" > Annual </option>
            </select>
                {/* <div style={{ position: "relative", width: "100%", height: "" }}> */}
                    <Line 
                        options= {{
                            responsive: true
                        }}
                        data={this.state.data}
                    />
                {/* </div> */}
            </Card>
        </Container>
        

        {/* History Order */}
        <Container className="mt-5 mb-5" style={{
          backgroundColor: "white",
          boxShadow: "6px 4px 8px 6px rgba(0, 0, 0, 0.2)",
          padding: "16px",
        }}>
          
            <h3> Recent Order </h3>
            <Table striped>
            
                <thead>
                <tr>
                    <th>Invoices</th>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                
                  {
                    this.state.order.map((val, key) => {
                      return(
                        <tr>
                          <td>{val.no_recipient}</td>
                          <td>{val.create_date}</td>
                          <td>{val.name}</td>
                          <td> {val.quantity} </td>
                          <td> {Rupiah.convert(val.price_order)} </td>
                        </tr>
                      )
                    })
                  }
                    
                
                </tbody>
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
            </Table>
            
        </Container>
      </Jumbotron>
      </Col>
    </Row>
        
      
    </>
        )
    }
}