import React, { Component } from 'react';
import '../App.css';

import {
  Layout, Header, Navigation, Drawer, Content, Grid, Cell, Card, CardTitle, CardText,
  CardActions, Button, Textfield, RadioGroup, Radio
} from 'react-mdl';

class Signup extends Component {
  render() {
    return (
      <div>
        <div style={{height: '600px', position: 'relative'}}>
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
                        <img src={require('../assests/banner.jpg')} alt="bnimg" style={{width:'100vw'}}/>
                    </Cell>
                    <Cell col={4}>
                      <Card shadow={0} style={{width: '80%', margin: 'auto', height:'54%'}}>
                        <CardTitle style={{height: '100px', margin:'0px', justifyContent:'center'}}>
                          Welcome to eSplitz
                        </CardTitle>
                        <p style={{textAlign:'center'}}>Already a member ? <a href="/#/">Login</a></p>
                        <p style={{textAlign:'center', margin:'20px'}}>
                            <RadioGroup name="demo" value="opt1">
                                <Radio value="opt1" ripple>Personal</Radio>
                                <Radio value="opt2">Business</Radio>
                            </RadioGroup>

                        </p>
                        <CardText style={{textAlign:'center'}}>
                            <Textfield label="Username" floatingLabel />
                            <Textfield label="Email" floatingLabel />
                            <Textfield label="Password" type="password" floatingLabel />
                            <Textfield label="Confirm Password" type="password" floatingLabel />
                        </CardText>
                        <CardActions style={{textAlign:'center'}}>
                            <Button raised style={{width:'85%', margin:'auto 10px', backgroundColor:'#c00', color:'#fff'}}>SIGN UP</Button>
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
        </div>
        <div className="footer">
          <h1>Footer</h1>
        </div>
      </div>
    );
  }
}

export default Signup;
