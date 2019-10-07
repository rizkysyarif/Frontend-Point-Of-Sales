import React from "react";
import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/scss/argon-dashboard-react.scss";
import ls from 'local-storage'
import Axios from "axios";
import { Redirect } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Jumbotron,
  Col
} from "reactstrap";


class Login extends React.Component {
  constructor(props) {
    super()
    this.state = {
      email:'',
      password:'',
      buttonDisable:false,
      message:''

    }
  }

  inputonChange = (e) => {
    this.setState({[e.target.name] : e.target.value })
  }

  login = (e) => {
    e.preventDefault()
    this.setState({ buttonDisable:true })

    let url='http://localhost:9000/api/user/login'
    let payload = {
      email:this.state.email,
      password:this.state.password,     
    }
    Axios.post(url, payload)
    .then (res =>{
      let success = res.data.success
      console.log(success)
      if(success === 200) {
        ls.set('token', res.data.token)
        this.setState({
          buttonDisable: true,
          message: 'Login Success'
        })
      } else{
        this.setState({
          buttonDisable: false,
          message: 'Login Failed'
        })
      }
    })
    .catch(error => {
      console.log(error)
      this.setState({
        buttonDisable:false,
        message:'Login Failed'
      })
    })
  }

  loginInvalid = () => {
    if(this.state.message === 'Login Failed') {
      return (
        window.alert('Login Invalid')
      )
    } else if (this.state.message === 'Login Success'){
      
      return (
        <>
         <Redirect to='/Dashboard'/>
        </>
      )
    }
    }
  


  render() {
    return (
      <div style={{marginRight:"-400px", marginLeft:"500px"}}>
        
        <Col lg="5" md="5">
        
          <Card>
            <Jumbotron>
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <h1>Login</h1>
                </div> 
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.login}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative" >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" value={this.state.email} onChange={this.inputonChange} placeholder="Email" type="email" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="password" value={this.state.password} onChange={this.inputonChange} placeholder="Password" type="password" />
                    </InputGroup>
                  </FormGroup>
                 
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Sign in
                    </Button>
                    <p>{ this.loginInvalid() }</p>
                    <p> Don't Have Account? <a href="Register">Register Here</a></p>
                  </div>
                </Form>
              </CardBody>
            </Jumbotron>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Login;