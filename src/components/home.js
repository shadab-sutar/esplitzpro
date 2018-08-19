import React, { Component } from "react";
import '../App.css';

import {
    Layout, Header, Navigation,  Grid, Cell, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, RadioGroup, Radio, Textfield
  } from 'react-mdl';

import $ from 'jquery';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ctype:'', c_name:'', cnumber:'', cexpiry:'',ccvv:''
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    
    handleOpenDialog() {
    this.setState({
        openDialog: true
    });
    }

    handleCloseDialog() {
    this.setState({
        openDialog: false
    });
    }
    
    savepayoption(){
        let savingData={
            "cc_number": this.state.cnumber,
            "cc_expiry": this.state.cexpiry,
            "cc_cvv": this.state.ccvv,
            "name": this.state.c_name
        }

        let payload = JSON.stringify(savingData);

        $.ajax({
            url:'http://api.esplitzpro.com/v1/cards',
            data:payload,
            dataType:'json',
            contentType:'application/json',
            method:'POST',
            success:function(){
                alert("Successful");
            },
            error:function(){
                alert("Error");
            }
        });
    }

    render(){
        return(
            <div>
                <div style={{height:'50px', position: 'relative'}}>
                    <Layout>
                        <Header transparent title="Welcome: John Doe!" style={{color: '#c00', 
                        backgroundColor:'whitesmoke', position:'fixed', top:'0'}}>
                            <Navigation>
                                <a style={{color: '#c00'}}><Button onClick={this.handleOpenDialog}>Manage Payment Options</Button></a>
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
                            <Dialog open={this.state.openDialog} style={{width:'40%'}}>
                                <DialogTitle style={{textAlign:'center'}}>Your Payment Options</DialogTitle>
                                <p style={{borderBottom:'0.5px solid #c00', margin:'10px'}}></p>
                                <DialogContent>
                                    <div style={{textAlign:'center'}}>
                                        <RadioGroup name="paytype" value="cc">
                                            <Radio value="cc" ripple className="single-radio">Credit Card</Radio>
                                            <Radio value="dc" ripple className="single-radio">Debit Card</Radio>
                                            <Radio value="ba" ripple className="single-radio" disabled>Bank Account</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div style={{textAlign:'center', marginTop:'20px'}}>
                                        <Textfield label="Name" floatingLabel style={{width:'80%'}} onChange={(e) => this.setState({c_name:e.target.value})}/>
                                        <Textfield label="Card Number" floatingLabel style={{width:'80%'}} onChange={(e) => this.setState({cnumber:e.target.value})}/>
                                        <Textfield label="Expiry Date" floatingLabel style={{width:'80%'}} onChange={(e) => this.setState({cexpiry:e.target.value})}/>
                                        <Textfield label="Card CVV" floatingLabel style={{width:'80%'}} onChange={(e) => this.setState({ccvv:e.target.value})}/>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button' onClick={this.savepayoption.bind(this)}>Verify and Save</Button>
                                    <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Cell>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Home;