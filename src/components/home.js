import React, { Component } from "react";
import '../App.css';
import { Custom_Token, baseURI, userName, ftime } from '../globalassets';
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
            ctype:'', c_name:'', cnumber:'', cexpiry:'',ccvv:'', token:'', loggedinuser:'', selRadio:'',
            cards:[], isSnackbarActive:false, amountpayable:0, msg1:'', msgdisp:'none', tabheader:'Amount'
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    
    componentDidMount(){
        this.setState({loggedinuser:userName._defaultValue})
        this.setState({token:Custom_Token._defaultValue})
        if(ftime._defaultValue === "New"){
            this.setState({openDialog: true});
        }
        if(Custom_Token._defaultValue === ""){
            $('#lpNav')[0].click();
        }
        this.getCards();
    }

    logout(){
        Custom_Token._defaultValue = "";
        $('#lpNav')[0].click();
    }

    getCards(){
        let $that = $(this);
        $.ajax({
            url:baseURI._defaultValue+'/cards',
            dataType:'json',
            contentType:'application/json',
            method:'GET',
            beforeSend: function (xhr, settings) {
                let token = Custom_Token._defaultValue;
                xhr.setRequestHeader("Authorization", token);
            },
            success:function(data){
                $that[0].setState({cards:data.cards});
            },
            error:function(data){
                console.log(data);
            }
        });
    }

    addAmount(e){
        //this.setState({amountpayable:e.target.value});
        let value = e.target.value;
        //let regex = "-?[0-9]*(\.[0-9]+)?";
        if(isNaN(value)){
            //remove last entered character.
            e.target.value = value.substr(0,value.length-1);
        }else{
            //push to array.
        }

    }

    handleOpenDialog() {
    this.setState({
        openDialog: true
    });
    }

    handleCloseDialog() {
    this.setState({
        openDialog: false,
        ctype:'', c_name:'', cnumber:'', cexpiry:'',ccvv:'',
        msg1:'',
        msgdisp:'none'
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
            url:baseURI._defaultValue+'/cards',
            data:payload,
            dataType:'json',
            contentType:'application/json',
            method:'POST',
            beforeSend: function (xhr, settings) {
                let token = $that[0].state.token;
                xhr.setRequestHeader("Authorization", token);
            },
            success:function(data){
                if(data.success === true){
                    $that[0].setState({isSnackbarActive:true, openDialog: false});
                    $that[0].getCards();
                }
            },
            error:function(data){
                $that[0].setState({msgdisp:'block', msg1:data.responseJSON.error});
            }
        });
    }

    paytypeselected(e){
        let headername;
        if(e.target.value === "valu"){
            headername = "Amount";
            this.setState({selRadio:'valu'});
        }else{
            headername = "Percentage";
            this.setState({selRadio:'perc'});
        }
        this.setState({tabheader:headername});
    }

    onTimeOut(){

    }

    cardfunc(e){
        let card = e.target.value;
        if(card.length > 16){
            e.target.value = card.substr(0,card.length-1);
        }
        if(isNaN(card)){
            e.target.value = card.substr(0,card.length-1);
        }else{
            this.setState({cnumber:e.target.value});
        }
    }

    expfunc(e){
        let exp = e.target.value;
        if(isNaN(exp)){
            e.target.value = exp.substr(0,exp.length-1);
        }else{
            this.setState({cexpiry:e.target.value});
        }
    }

    cvvfunc(e){
        let cvv = e.target.value;
        if(cvv.length > 3){
            e.target.value = cvv.substr(0,cvv.length-1);
        }
        if(isNaN(cvv) || cvv.length > 3){
            e.target.value = cvv.substr(0,cvv.length-1);
        }else{
            this.setState({ccvv:e.target.value});
        }
    }

    render(){
        let row = [];
        for(var i=0;i<this.state.cards.length;i++){
            let obj = {
                "name":this.state.cards[i].name,
                "cnumber":this.state.cards[i].cc_number,
                "amount":<Textfield label={this.state.tabheader} floatingLabel onChange={this.addAmount.bind(this)} />
            }

            row.push(obj);
        }
        return(
            <div>
                <Link to={'/'} id="lpNav"></Link>
                <div style={{height:'50px', position: 'relative'}}>
                    <Layout>
                        <Header transparent title={'Welcome : '+this.state.loggedinuser} style={{color: '#c00', 
                        backgroundColor:'whitesmoke', position:'fixed', top:'0'}}>
                            <Navigation>
                                <a style={{color: '#c00'}}><Button onClick={this.handleOpenDialog}>Manage Payment Options</Button></a>
                                <a style={{color: '#c00'}}><Button>Account Settings</Button></a>
                                <a style={{color: '#c00'}}><Button>Help</Button></a>
                                <a style={{color: '#c00'}}><Button onClick={this.logout.bind(this)}>Logout</Button></a>
                            </Navigation>
                        </Header>
                    </Layout>
                </div>
                <div className="content">
                    <Grid style={{padding:'0px'}}>
                        <Cell col={12} style={{margin:'0px', color:'black'}}>
                            <div className="paybar">
                                <RadioGroup name="paytype" value={this.state.selRadio} onChange={this.paytypeselected.bind(this)}>
                                    <Radio value="valu" ripple className="single-radio">Pay By Value</Radio>
                                    <Radio value="perc" ripple className="single-radio">Pay By Percentage</Radio>
                                </RadioGroup>
                                <Textfield label="Total Amount" value={this.state.amountpayable} floatingLabel style={{marginLeft:'20px'}} />
                                <Button raised style={{marginLeft:'10px'}}>Pay</Button>
                            </div>
                            {/* <div className="scrollcontainer"> */}
                            <DataTable
                                selectable
                                shadow={0}
                                rowKeyColumn="id"
                                rows={row}
                                style={{width:'80%', marginLeft:'20px'}}
                            >
                                <TableHeader style={{width:'30%'}} name="name" tooltip="The amazing material name">Name</TableHeader>
                                <TableHeader style={{width:'30%'}} name="cnumber" tooltip="Number of materials">Card Number</TableHeader>
                                <TableHeader style={{width:'30%'}} name="amount">{this.state.tabheader}</TableHeader>
                            </DataTable>
                            {/* </div> */}
                            <Dialog open={this.state.openDialog} style={{width:'40%'}}>
                                <DialogTitle style={{textAlign:'center'}}>Your Payment Options</DialogTitle>
                                <p style={{borderBottom:'0.5px solid #c00', margin:'10px'}}></p>
                                <DialogContent>
                                    <div style={{textAlign:'center'}}>
                                        <RadioGroup name="cctype" value="cc">
                                            <Radio value="cc" ripple className="single-radio">Credit Card</Radio>
                                            <Radio value="dc" ripple className="single-radio">Debit Card</Radio>
                                            <Radio value="ba" ripple className="single-radio" disabled>Bank Account</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div style={{textAlign:'center', marginTop:'20px'}}>
                                        <Textfield label="Name" value={this.state.c_name} floatingLabel style={{width:'80%'}} onChange={(e) => this.setState({c_name:e.target.value})}/>
                                        <Textfield label="Card Number" value={this.state.cnumber} floatingLabel style={{width:'80%'}} onChange={this.cardfunc.bind(this)}/>
                                        <Textfield label="Expiry Date" value={this.state.cexpiry} floatingLabel style={{width:'80%'}} onChange={this.expfunc.bind(this)}/>
                                        <Textfield label="Card CVV" type="password" value={this.state.ccvv} floatingLabel style={{width:'80%'}} onChange={this.cvvfunc.bind(this)}/>
                                    </div>
                                    <p style={{display:this.state.msgdisp, color:'#c00', textAlign:'center'}}>{this.state.msg1}</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button' onClick={this.savepayoption.bind(this)}>Verify and Save</Button>
                                    <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                            <Snackbar active={this.state.isSnackbarActive} onTimeout={this.onTimeOut.bind(this)}>
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