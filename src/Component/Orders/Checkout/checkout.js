import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { connect } from 'react-redux';
import { resetburgarelement } from '../../../Redux/actionCreators';



const mapStateToProps = state => {
    return {
        BurgarElements: state.BurgarElements,
        totalPrice: state.totalPrice,
        userId: state.userId,
        token: state.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetburgarelement: () => dispatch(resetburgarelement()),
    }
}
class Checkout extends Component {
    state = {
        values: {
            delevaryAddress: '',
            phone: '',
            paymentType: 'Cash on Delevary',
        },
        isLodding: false,
        isModalOpen: false,
        modalMsg: '',
    }

    goBack = () => {
        this.props.history.goBack("/");
    }
    inputChangeHandle = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandle = () => {
        this.setState({ isLodding: true });
        const Order = {
            BurgarElements: this.props.BurgarElements,
            customar: this.state.values,
            price: this.props.totalPrice,
            OrderTime: new Date(),
            userId: this.props.userId,
        }
        axios.post("https://burgar-project-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, Order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLodding: false,
                        isModalOpen: true,
                        modalMsg: 'You have Successfully Done',
                    })
                    this.props.resetburgarelement();
                } else {
                    this.setState({
                        isLodding: false,
                        isModalOpen: true,
                        modalMsg: 'Something Wrong Order Again',
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLodding: false,
                    isModalOpen: true,
                    modalMsg: 'Please Error This Situation',
                })
            })
    }
    render() {
        let form = (<div>
            <h3
                style={{
                    border: '1px solid gray',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px',
                }}>Payment : {this.props.totalPrice} BDT</h3>
            <form style={{
                border: '1px solid gray',
                boxShadow: '1px 1px #888888',
                borderRadius: '5px',
                padding: '20px',
            }}>
                <textarea name='delevaryAddress' value={this.state.values.delevaryAddress} className='form-control' onChange={(e) => this.inputChangeHandle(e)}></textarea>
                <br />
                <input name='phone' placeholder='Phone' className='form-control' value={this.state.values.phone} onChange={(e) => this.inputChangeHandle(e)} />
                <br />
                <select name='paymentType' value={this.state.values.paymentType} className='form-control' onChange={(e) => this.inputChangeHandle(e)}>
                    <option value='Cash On Delevary'>Cash Delevary</option>
                    <option value='Bkash'>Bkash</option>
                </select>
                <br />
                <Button className="mr-auto" style={{ backgroundColor: '#810541' }} onClick={this.submitHandle} >Place Order</Button>
                <Button style={{ marginLeft: '5px' }} color='secondary' onClick={this.goBack}>Cancel</Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLodding ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

// Save Data firbase database