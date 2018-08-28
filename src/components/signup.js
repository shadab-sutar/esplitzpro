import React, { Component } from 'react';
import '../App.css';
import { baseURI, Custom_Token, ftime, userName } from '../globalassets';
import {
  Layout, Header, Navigation, Drawer, Content, Grid, Cell, Card, CardTitle, CardText,
  CardActions, Button, Textfield, RadioGroup, Radio
} from 'react-mdl';

import { Link } from 'react-router-dom';
import $ from 'jquery';

class Signup extends Component {
  constructor(){
    super();
    this.state={
      username:'', email:'', phone:'', password:'', selRadio:'pers', compName:'', noemp:'',
      crn:'', fdisp:'none', errDisp:'none', errMsg:'', confPass:''
    }
  }

  comparePass(e){
    if(e.target.id === "password"){
      this.setState({password:e.target.value});
      if(this.state.confPass.length > 1){
        if(e.target.value.length === this.state.confPass.length){
          if(e.target.value !== this.state.confPass){
            this.setState({errDisp:'inline-block', errMsg:'Entered Password do not match!'});
            return;
          }else{
            this.setState({errDisp:'none', errMsg:''});
          }
        }
      }
    }else{
      this.setState({confPass:e.target.value});
      if(this.state.password.length > 1){
        if(e.target.value.length === this.state.password.length){
          if(e.target.value !== this.state.password){
            this.setState({errDisp:'inline-block', errMsg:'Entered Password do not match!'});
            return;
          }else{
            this.setState({errDisp:'none', errMsg:''});
          }
        }
      }
    }
  }

  signup(e){
    let ss = this.state;
    if(ss.username === "" || ss.password === "" || ss.email === "" || ss.phone === ""){
      this.setState({errDisp:'inline-block', errMsg:'All the fields are mandatory!'});
      return;
    }else{
      this.setState({errDisp:'none', errMsg:''});
    }
    if(ss.selRadio === "buss"){
      if(ss.compName === "" || ss.crn === "" || ss.noemp === ""){
        this.setState({errDisp:'inline-block', errMsg:'All the fields are mandatory!'});
        return;
      }else{
        this.setState({errDisp:'none', errMsg:''});
      }
    }

    let email = this.state.email;
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regex.test(email) === false){
      this.setState({errDisp:'inline-block', errMsg:'Invalid Email Address'});
      return;
    }
    let savingData={
      "name":this.state.username,
      "email":this.state.email,
      "phone":this.state.phone,
      "password":this.state.password
    }

    if(this.state.selRadio === "buss"){
      //payload for business extra fields...
    }
    let $that = $(this);
    let payload = JSON.stringify(savingData);
    $.ajax({
      url:baseURI._defaultValue+'/users',
      data:payload,
      dataType:'json',
      method:'POST',
      contentType:'application/json',
      success:function(data){
          Custom_Token._defaultValue = data.token;
          userName._defaultValue = data.user.name;
          ftime._defaultValue = "New";
          $('#navHome')[0].click();
      },
      error:function(err){
        $that[0].setState({errDisp:'inline-block', errMsg:err.responseJSON.error});
      }
    });
  }

  selRadio(e){
    let sel = e.target.value;
    if(sel === "pers"){
      this.setState({
        selRadio:'pers',
        fdisp:'none'
      });
    }else{
      this.setState({
        selRadio:'buss',
        fdisp:'inline-block'
      });
    }
  }

  phonevalidate(e){
    let phone = e.target.value;
    if(isNaN(phone) || e.target.value.length > 10){
      e.target.value = phone.substr(0,phone.length-1);
    }else{
      this.setState({phone:e.target.value});
    }
  }

  numVal(e){
    if(isNaN(e.target.value)){
      e.target.value = e.target.value.substr(0,e.target.value.length-1);
    }else{
      if(e.target.id === "noemp"){
        this.setState({noemp:e.target.value});
      }else{
        this.setState({crn:e.target.value});
      }
    }
  }

  render() {
    return (
      <div>
        <Link to={'/home'} id="navHome"></Link>
        <div style={{height: '900px', position: 'relative'}}>
            <Layout>
                <Header transparent title="eSplitz" style={{color: '#c00', backgroundColor:'#fff', position:'fixed', top:'0'}}>
                    <Navigation>
                        <a href="/#" style={{color: '#c00'}}>About</a>
                        <a href="/#" style={{color: '#c00'}}>Policies</a>
                        <a href="/#" style={{color: '#c00'}}>Partners</a>
                        <a href="/#" style={{color: '#c00'}}>FAQ</a>
                    </Navigation>
                </Header>
                <Drawer />
                <Content style={{backgroundColor:'whitesmoke', overflowY:'hidden', marginTop:'75px'}}>
                  <div className="content">
                  <Grid style={{padding:'0px', height:'700px'}}>
                    <Cell col={7} style={{marginLeft:'8px', textAlign:'justify'}}>
                    <h4>Supercharge your business and personal payment experience with eSplitzpro</h4>
                    <p>
                      Accept payments from all major credit and debit card networks like Visa, 
                      Mastercard, American Express and RuPay. Also get access to international card payments.
                    </p>
                    <p>
                      With the easiest integration, completely online onboarding, feature filled checkout and 
                      best in class performance, quickly go live with eSplitzpro and experience the future of payments.
                    </p>
                    <p>
                      An easy to integrate Checkout with cards saved across businesses so that your 
                      customers can pay seamlessly everywhere. Get reports and detailed statistics on payments, 
                      settlements, refunds and much more for you to take better business decisions. Robust, clean, 
                      developer friendly APIs, plugins and libraries for all major languages and platforms that 
                      let you focus on building great products. 
                      PCI DSS Level 1 compliant along with frequent third party audits and a dedicated internal 
                      security team to make sure your data is always safe.
                    </p>
                    </Cell>
                    <Cell col={5} style={{height:'800px'}}>
                      <Card shadow={0} style={{width: '70%', margin: 'auto', height:'100%'}}>
                        <CardTitle style={{height: '100px', margin:'0px', justifyContent:'center'}}>
                          Welcome to eSplitz
                        </CardTitle>
                        <p style={{textAlign:'center'}}>Already a member ? <a href="#/">Login</a></p>
                        <div style={{textAlign:'center'}}>
                            <RadioGroup name="acctype" value={this.state.selRadio} onChange={this.selRadio.bind(this)}>
                                <Radio value="pers" ripple className="single-radio">Personal</Radio>
                                <Radio value="buss" ripple>Business</Radio>
                            </RadioGroup>
                        </div>
                        <p style={{display:this.state.errDisp, color:'#c00', textAlign:'center', padding:'0px', margin:'0px', border:'0px'}}>{this.state.errMsg}</p>
                        <CardText style={{textAlign:'center'}}>
                            <Textfield label="Username*" floatingLabel onChange={(e) => this.setState({username:e.target.value})} id="username"/>
                            <Textfield label="Email*" floatingLabel onChange={(e) => this.setState({email:e.target.value})} id="email"/>
                            <Textfield label="Phone*" floatingLabel pattern="-?[0-9]*(\.[0-9]+)?" error="Invalid Phone Number!" onChange={this.phonevalidate.bind(this)} id="phone"/>
                            <Textfield label="Password*" type="password" floatingLabel onChange={this.comparePass.bind(this)} id="password"/>
                            <Textfield label="Confirm Password*" type="password" floatingLabel onChange={this.comparePass.bind(this)} />
                            <Textfield label="Company/Organisation Name" floatingLabel onChange={(e) => this.setState({compName:e.target.value})} style={{display:this.state.fdisp}}/>
                            <Textfield label="No of Employees" floatingLabel onChange={this.numVal.bind(this)} style={{display:this.state.fdisp}} id="noemp"/>
                            <Textfield label="Commercial Registration Number" floatingLabel onChange={this.numVal.bind(this)} style={{display:this.state.fdisp}}/>
                        </CardText>
                        <CardActions style={{textAlign:'center'}}>
                            <Button raised style={{width:'85%', margin:'auto 10px', backgroundColor:'#c00', color:'#fff'}} onClick={this.signup.bind(this)}>SIGN UP</Button>
                        </CardActions>
                      </Card>
                    </Cell>
                  </Grid>
                  </div>
                </Content>
            </Layout>
        </div>
        <div className="footer">
          <p style={{color:'white', textAlign:'center'}}>&copy; eSplitz, 2018</p>
        </div>
      </div>
    );
  }
}

export default Signup;
