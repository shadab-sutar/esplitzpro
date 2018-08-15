import React, { Component } from "react";
import '../App.css';

import {
    Layout, Header, Navigation,  Grid, Cell, Button
  } from 'react-mdl';

class Home extends Component{
    render(){
        return(
            <div>
                <div style={{height:'50px', position: 'relative'}}>
                    <Layout>
                        <Header transparent title="Welcome: John Doe!" style={{color: '#c00', 
                        backgroundColor:'whitesmoke', position:'fixed', top:'0'}}>
                            <Navigation>
                                <a style={{color: '#c00'}}><Button>Manage Payment Options</Button></a>
                                <a style={{color: '#c00'}}><Button>Account Settings</Button></a>
                                <a style={{color: '#c00'}}><Button>Help</Button></a>
                                <a style={{color: '#c00'}}><Button>Logout</Button></a>
                            </Navigation>
                        </Header>
                    </Layout>
                </div>
                <div className="content">
                    <Grid style={{padding:'0px'}}>
                        <Cell col={12} style={{margin:'0px', color:'black'}}>
                            <h1>Main</h1>
                        </Cell>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Home;