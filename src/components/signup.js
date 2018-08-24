import React, { Component } from 'react';
import '../App.css';
//import Banner from 'http://esplitzpro.com/ui/banner.jpg';
import {
  Layout, Header, Navigation, Drawer, Content, Grid, Cell, Card, CardTitle, CardText,
  CardActions, Button, Textfield, RadioGroup, Radio
} from 'react-mdl';

import $ from 'jquery';

class Signup extends Component {
  constructor(){
    super();
    this.state={
      username:'', email:'', phone:'', password:''
    }
  }

  comparePass(e){

  }

  signup(e){
    let savingData={
      "name":this.state.username,
      "email":this.state.email,
      "phone":this.state.phone,
      "password":this.state.password
    }

    let payload = JSON.stringify(savingData);
    $.ajax({
      url:'http://api.esplitzpro.com/v1/users',
      data:payload,
      dataType:'json',
      method:'POST',
      contentType:'application/json',
      success:function(data, response){
        alert(data.message);
      },
      error:function(){
        alert("Error");
      }
    });
  }

  render() {
    return (
      <div>
        <div style={{height: '700px', position: 'relative'}}>
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
                  <Grid style={{padding:'0px'}}>
                    <Cell col={8} style={{margin:'0px'}}>
                        <img src='http://esplitzpro.com/ui/banner.jpg' alt="bnimg" style={{width:'100vw'}}/>
                    </Cell>
                    <Cell col={4}>
                      <Card shadow={0} style={{width: '80%', margin: 'auto', height:'64%'}}>
                        <CardTitle style={{height: '100px', margin:'0px', justifyContent:'center'}}>
                          Welcome to eSplitz
                        </CardTitle>
                        <p style={{textAlign:'center'}}>Already a member ? <a href="#/">Login</a></p>
                        <div style={{textAlign:'center'}}>
                            <RadioGroup name="acctype" value="pers">
                                <Radio value="pers" ripple className="single-radio">Personal</Radio>
                                <Radio value="buss" ripple>Business</Radio>
                            </RadioGroup>
                        </div>
                        <CardText style={{textAlign:'center'}}>
                            <Textfield label="Username*" floatingLabel onChange={(e) => this.setState({username:e.target.value})} id="username"/>
                            <Textfield label="Email*" floatingLabel onChange={(e) => this.setState({email:e.target.value})} id="email"/>
                            <Textfield label="Phone*" floatingLabel pattern="-?[0-9]*(\.[0-9]+)?" error="Invalid Phone Number!" onChange={(e) => this.setState({phone:e.target.value})} id="phone"/>
                            <Textfield label="Password*" type="password" floatingLabel onChange={(e) => this.setState({password:e.target.value})} id="password"/>
                            <Textfield label="Confirm Password*" type="password" floatingLabel onChange={this.comparePass.bind(this)} />
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
        <div className="main-content">
          <h1>Hello World</h1>
          <p>
          Lorem ipsum dolor sit amet, 
          consectetuer adipiscing elit. 
          Nulla quis diam. Praesent dapibus. 
          Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. 
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
          aut odit aut fugit, sed quia consequuntur magni dolores 
          eos qui ratione voluptatem sequi nesciunt. 
          Proin in tellus sit amet nibh dignissim sagittis. 
          Morbi leo mi, nonummy eget tristique non, 
          rhoncus non leo. Aenean fermentum risus id tortor. 
          Vivamus luctus egestas leo. In dapibus augue non sapien.
          Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, 
          eget facilisis enim ipsum id lacus. Nullam faucibus mi quis velit. 
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
          Nulla non arcu lacinia neque faucibus fringilla. In rutrum. 
          Integer imperdiet lectus quis justo. Nullam faucibus mi quis velit. 
          Nunc tincidunt ante vitae massa. Nulla non arcu lacinia neque faucibus fringilla.

          Curabitur vitae diam non enim vestibulum interdum. 
          Etiam commodo dui eget wisi. Mauris elementum mauris vitae tortor. 
          Sed ac dolor sit amet purus malesuada congue. Nunc auctor. 
          Curabitur vitae diam non enim vestibulum interdum. 
          Maecenas aliquet accumsan leo. Fusce tellus. 
          Curabitur vitae diam non enim vestibulum interdum. 
          Etiam ligula pede, sagittis quis, interdum ultricies, 
          scelerisque eu. Etiam sapien elit, consequat eget, 
          tristique non, venenatis quis, ante. Nulla non lectus 
          sed nisl molestie malesuada. Aliquam erat volutpat. 
          Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. 
          Integer in sapien. Donec quis nibh at felis congue commodo. 
          Vestibulum fermentum tortor id mi. In convallis. Neque porro quisquam est, 
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
          sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam 
          aliquam quaerat voluptatem.
          </p>
        </div>
        <div className="footer">
          <h1>Footer</h1>
        </div>
      </div>
    );
  }
}

export default Signup;
