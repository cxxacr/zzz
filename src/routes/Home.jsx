import React, { Component } from "react";
import { connect } from "react-redux";
import {Switch,Route,Redirect} from 'react-router-dom'
import Pet from './pet/Pet'
import Info from './pet/Info'

import '../static/css/pet.less'

export class Home extends Component {
  render() {
    return <Switch>
      <Route path='/pet' exact component={Pet}></Route>
      <Route path='/pet/info' component={Info}></Route>
      <Redirect to='/pet'></Redirect>
    </Switch>;
  }
}


export default connect()(Home);
