import React, { Component } from 'react';
import './App.css';

import {
  Layout, Header, Navigation, Drawer, Content, Grid, Cell, Card, CardTitle, CardText,
  CardActions, Button, Textfield
} from 'react-mdl';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{height: '500px', position: 'relative'}}>
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
                <Content style={{backgroundColor:'whitesmoke', overflowY:'hidden', marginTop:'75px'}}>
                  <div className="content">
                  <Grid style={{padding:'0px'}}>
                    <Cell col={8} style={{margin:'0px'}}>
                        <img src={require('./assests/banner.jpg')} alt="bnimg" style={{width:'100vw'}}/>
                    </Cell>
                    <Cell col={4}>
                      <Card shadow={0} style={{width: '80%', margin: 'auto', height:'43%'}}>
                        <CardTitle style={{height: '100px', margin:'0px', justifyContent:'center'}}>
                          Welcome to eSplitz
                        </CardTitle>
                        <p style={{textAlign:'center'}}>New to eSplitz ? <a href="/#/signup">Sign Up!</a></p>
                        <CardText style={{textAlign:'center'}}>
                            <Textfield label="Username" floatingLabel />
                            <Textfield label="Password" type="password" floatingLabel />
                        </CardText>
                        <CardActions style={{textAlign:'center'}}>
                            <Button raised style={{width:'85%', margin:'auto 10px', backgroundColor:'#c00', color:'#fff'}}>Login</Button>
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

export default App;
