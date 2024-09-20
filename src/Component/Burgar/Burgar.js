import React, { Component } from 'react';
import Burgarchild from './Burgarchild/Burgarchild';
import Controls from './Controls/Controls';
import Summary from './Summary/summary';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addElement, removeElement, updatePurchasable } from '../../Redux/actionCreators';

const mapStateToProps = state => {
    return {
        BurgarElements: state.BurgarElements,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        addElement: (igtype) => dispatch(addElement(igtype)),
        removeElement: (igtype) => dispatch(removeElement(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}

class Burgar extends Component {
    state = {
        modalOpen: false,
    }

    addBurgarElementHandle = type => {
        this.props.addElement(type);
        this.props.updatePurchasable();

    }

    removeBurgarHandle = type => {
        this.props.removeElement(type);
        this.props.updatePurchasable();

    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () => {
        this.props.history.push("/checkout");
    }

    render() {
        return (
            <div>
                <div className='d-flex flex-md-row flex-column'>
                    <Burgarchild BurgarElements={this.props.BurgarElements} />
                    <Controls
                        addedElement={this.addBurgarElementHandle}
                        removedElement={this.removeBurgarHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Burgar Order Summary</ModalHeader>
                    <ModalBody>
                        <h4>Total Price: {this.props.totalPrice.toFixed(0)}  BDT</h4>
                        <Summary BurgarElements={this.props.BurgarElements} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: '#810541' }} onClick={this.handleCheckout}>Continue Checkout</Button>
                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Burgar);