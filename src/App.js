import React, { Component } from 'react';
import './App.css';
//import Banner from 'http://esplitzpro.com/ui/banner.jpg';
import { Custom_Token, baseURI, userName } from './globalassets';

import {
  Layout, Header, Navigation, Drawer, Content, Grid, Cell, Card, CardTitle, CardText,
  CardActions, Button, Textfield
} from 'react-mdl';

import $ from 'jquery';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state={
      username:'', password:'', token:'', msg1:'', msgdisp1:'hidden'
    }
  }

  loginUser(){
    let $that = $(this);
    let loginData = {
      "unique_key":this.state.username,
      "password":this.state.password
    }
    let payload = JSON.stringify(loginData);
    $.ajax({
      url:baseURI._defaultValue+'/users/login',
      data:payload,
      dataType:'json',
      method:'POST',
      contentType:'application/json',
      success:function(data){
        if(data.success === true){
          $that[0].setState({token:data.token});
          Custom_Token._defaultValue = data.token;
          userName._defaultValue = data.user.name;
          $('#navHome')[0].click();
        }
      },
      error:function(data){
       $that[0].setState({
         msg1:data.responseJSON.error, 
         msgdisp1:'visible',
         username:'',
         password:''
      });
      }
    });
  }

  render() {
    return (
      <div>
        <Link to={'/home'} id="navHome"></Link>
        <div style={{height: '100%', position: 'relative'}}>
            <Layout>
                <Header transparent title="eSplitz" style={{color: '#c00', 
                  backgroundColor:'#fff', position:'fixed', top:'0'}}>
                    <Navigation>
                        <a href="/" style={{color: '#c00'}}>About</a>
                        <a href="/" style={{color: '#c00'}}>Policies</a>
                        <a href="/" style={{color: '#c00'}}>Partners</a>
                        <a href="/" style={{color: '#c00'}}>FAQ</a>
                    </Navigation>
                </Header>
                <Drawer />
                <Content />
            </Layout>
            <div className="content" style={{height:'100%'}}>
                  <Grid style={{padding:'0px', marginTop:'75px', gridGap:'0'}}>
                    <Cell col={8} style={{textAlign:'justify'}}>
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
                    <Cell col={4} style={{height:'100%'}}>
                      <Card shadow={0} style={{width: '80%', margin: 'auto', height:'100%', padding:'15px'}}>
                        <CardTitle style={{height: '100px', margin:'0px', justifyContent:'center'}}>
                          Welcome to eSplitz
                        </CardTitle>
                        <p style={{textAlign:'center'}}>New to eSplitz ? <a href="#/signup">Sign Up!</a></p>
                        <p style={{visibility:this.state.msgdisp1, textAlign:'center', color:'#c00', margin:'0px', padding:'0px', border:'0px'}}>{this.state.msg1}</p>
                        <CardText style={{textAlign:'center'}}>
                            <Textfield label="Enter Email or Phone" value={this.state.username} floatingLabel onChange={(e) => this.setState({username:e.target.value})}/>
                            <Textfield label="Password" type="password" value={this.state.password} floatingLabel onChange={(e) => this.setState({password:e.target.value})}/>
                        </CardText>
                        <CardActions style={{textAlign:'center'}}>
                            <Button raised style={{width:'85%', margin:'auto 10px', backgroundColor:'#c00', color:'#fff'}}
                            onClick={this.loginUser.bind(this)}>Login</Button>
                        </CardActions>
                      </Card>
                    </Cell>
                  </Grid>
                  <div className="main-content">
                    
                  </div>
                  <div className="footer">
                    <p style={{color:'white', textAlign:'center'}}>&copy; eSplitz, 2018</p>
                  </div>
                  </div>
        </div>
      </div>
    );
  }
}

export default App;
