import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardBody, CardTitle, Container, Row, Col, Table,Pagination, PaginationItem, PaginationLink,Jumbotron } from "reactstrap";
import NavBar from '../../Components/Navbar'
import Backdrop from '../../Components/Backdrop/Backdrop'
import SideDrawer from '../../Components/SideDrawer/SideDrawer'
import Axios from 'axios';
import Rupiah from 'rupiah-format'
import FormatDate from 'moment'
import './History.css'


export default class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dailyIncome: [],
            weeklyIncome:[],
            monthlyIncome:[],
            yearlyIncome: [],
            yearlyIncomeCard: [],
            weekly:[],
            thisWeek:[],
            data: {},
            order:[],
            allPage:[],
            limit:"10",
            page: "1",
            checkOrder: "",
            sideDrawerOpen: false
        }
    }
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen:false})
  }

  async  componentDidMount(){
     await this.getDailyIncome()
     await this.getWeeklyIncome()
     await this.getmonthlyIncome()
     await this.getYearlyIncome()
     await this.drawGraph("weekly")
     await this.getOrder()
    //  console.log(this.getYearlyIncome())
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
            this.setState({
              weeklyIncome: result.data.data,
              weekly: result.data.week,
              weeklyAmount: result.data.data[0].AMOUNT
            })
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
            this.setState({yearlyIncome: result.data.data.chart})
            this.setState({yearlyIncomeCard: result.data.data.card})
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
        if(val === "weekly") {
            let weekly = [0]
            let weekly_new = []
            let weekly_last = []
            let labels = []
            this.state.weekly.thisWeek.map(item =>{ 
              return(weekly_new.push(item.TOTAL))
            })
            this.state.weekly.lastWeek.map(item =>{
             return(
              labels.push(item.DAY),
              weekly_last.push(item.TOTAL)
             ) 
            })
            const dataChart = {
                labels: labels,
                datasets: [
                    {
                        label: "This Week",
                        borderColor: "rgba(255, 0, 255, 0.75)",
                        backgroundColor: "",
                        fill: null,
                        data: weekly_new
                    },
                    {
                        label: "Last Week",
                        borderColor: "rgba(0, 255, 0, 0.75)",
                        fill: null,
                        data: weekly_last
                    }
                ]
                
            }
            this.setState({data: dataChart})
        }else if( val === "monthly" ) {
          let monthly = [0]
            this.state.monthlyIncome.map(item =>{
               return (monthly.push(item.INCOME))
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

        } else if(val === "annual"){
          let yearly = [0]
            this.state.yearlyIncome.map(item =>{
                return(yearly.push(item.INCOME))
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
      let backdrop

      if(this.state.sideDrawerOpen){
        backdrop = <Backdrop click={this.backdropClickHandler} />
      }
        let orderId = ""
        let annual = 0
        this.state.yearlyIncomeCard.map(item =>{
            return(annual = item.INCOME)
        })
        return (
    <>
    <NavBar drawerClickHandler={this.drawerToggleClickHandler} />
    <SideDrawer show={this.state.sideDrawerOpen}/>
    {backdrop}
      <Jumbotron className="jumbotron">
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
                            {Rupiah.convert(this.state.dailyIncome['today'])}
                          </span>
                        </div>
                        
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" />      
                          { Math.round(
                            ((this.state.dailyIncome['yesterday'] - this.state.dailyIncome['today']) / 
                            this.state.dailyIncome['yesterday'] * 100) 
                            
                          ) } %
                          
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
                            {this.state.weeklyAmount}
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
            
            <Card className="chart mt-5 mb-5" style={{
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
        <Container className=" mt-5 mb-5" style={{
          backgroundColor: "white",
          boxShadow: "6px 4px 8px 6px rgba(0, 0, 0, 0.2)",
          padding: "16px",
        }}>
          <div className="recent-order">
            <h3> Recent Order </h3>
            <Table striped > 
            
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
                      if(orderId !== val.no_recipient){
                        orderId = val.no_recipient
                        return(
                          <tr>
                            
                            <td>{val.no_recipient}</td>
                            <td>{FormatDate(val.create_date).format("MMM Do YY")}</td>
                            <td>{val.name}</td>
                            <td> {val.quantity} </td>
                            <td> {Rupiah.convert(val.price_order)} </td>
                          </tr>
                        )
                      } else {
                        return(
                          <tr>
                            
                            <td></td>
                            <td></td>
                            <td>{val.name}</td>
                            <td> {val.quantity} </td>
                            <td> {Rupiah.convert(val.price_order)} </td>
                          </tr>
                        )
                      }
                      
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
            </div>
        </Container>
      </Jumbotron>
      
    
        
      
    </>
        )
    }
}