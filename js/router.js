import React, { Component } from 'react';
import { connect } from 'react-redux';

class RouterOwn extends Component{
    componentDidMount(){
    }
    render(){
        return(
            null
        )
    }
}

function mapStateToProps(state) {
    return {
        dataRemote: state.WeekData.dataManu
    }
}
  
export default connect(mapStateToProps)(RouterOwn);