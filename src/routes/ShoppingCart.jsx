import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ShoppingCart extends Component {
    render() {
        return (
            <div>
                ShoppingCart
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
