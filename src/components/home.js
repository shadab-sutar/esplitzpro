import React, { Component } from "react";
import '../App.css';
import { Custom_Token } from '../globalassets';
import {
    Layout, Header, Navigation,  Grid, Cell, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, RadioGroup, Radio, Textfield, DataTable, TableHeader, Snackbar
  } from 'react-mdl';

import $ from 'jquery';
import { Link } from 'react-router-dom';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ctype:'', c_name:'', cnumber:'', cexpiry:'',ccvv:'', token:'', 
            cards:[], isSnackbarActive:false
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    
    componentDidMount(){
        if(Custom_Token._defaultValue === ""){
            $('#lpNav')[0].click();
        }
        console.log(Custom_Token);
        this.setState({token:Custom_Token._defaultValue})
        this.getCards();
    }

    getCards(){
        let $that = $(this);
        $.ajax({
            url:'http://api.esplitzpro.com/v1/cards',
            dataType:'json',
            contentType:'application/json',
            method:'GET',
            beforeSend: function (xhr, settings) {
                let token = Custom_Token._defaultValue;
                xhr.setRequestHeader("Authorization", token);
            },
            success:function(data){
                debugger;
                console.log(data);
                console.log(JSON.stringify($that[0].state.cards));
                $that[0].setState({cards:data.cards});
            },
            error:function(data){
                console.log(data);
            }
        });
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
        let $that = $(this);
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
            beforeSend: function (xhr, settings) {
                let token = $that[0].state.token;
                xhr.setRequestHeader("Authorization", token);
            },
            success:function(data){
                debugger;
                if(data.success === true){
                    $that[0].setState({isSnackbarActive:true, openDialog: false});
                    $that[0].getCards();
                }
            },
            error:function(data){
                debugger;
                alert(data.responseJSON.error);
            }
        });
    }

    render(){
        let row = [];
        for(var i=0;i<this.state.cards.length;i++){
            let obj = {
                "name":this.state.cards[i].name,
                "cnumber":this.state.cards[i].cc_number,
                "amount":<Textfield label="Amount" floatingLabel />
            }

            row.push(obj);
        }
        return(
            <div>
                <Link to={'/'} id="lpNav"></Link>
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
                            <div className="paybar">
                                <Textfield label="Amount" value="0.00" floatingLabel style={{}} />
                                <Button raised>Pay</Button>
                            </div>
                            <DataTable
                                selectable
                                shadow={0}
                                rowKeyColumn="id"
                                rows={row}
                                style={{width:'100%'}}
                            >
                                <TableHeader name="name" tooltip="The amazing material name">Name</TableHeader>
                                <TableHeader name="cnumber" tooltip="Number of materials">Card Number</TableHeader>
                                <TableHeader name="amount">Amount</TableHeader>
                            </DataTable>
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
                            <Snackbar active={this.state.isSnackbarActive}>
                                Card Added Successfully !
                            </Snackbar>
                        </Cell>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Home;