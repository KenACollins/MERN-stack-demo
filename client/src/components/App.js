import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

/**
 * connect() function allows App to call action creators.  It accepts parameters.
 * o mapStateToProps - we don't have so pass null
 * o actions - all the different action creators we want to wire up
 * Once we pass in all the action creators they are assigned to App as props and
 * we can therefore reference this.props.fetchUser() in componentDidMount().
 */
export default connect(null, actions)(App);

