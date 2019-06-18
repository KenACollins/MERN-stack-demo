import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';
import { formatDateLocal } from '../../utilities/dateUtils';
import { formatNumber } from '../../utilities/numberUtils';

class SurveyList extends Component {
    // Any time SurveyList component is rendered to screen, call fetchSurveys() action creator.
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        // Reverse sort surveys so newest are at the top of the screen.
        return this.props.surveys.reverse().map(survey => {
            return (
                <div key={survey._id} className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Sent: {formatDateLocal(survey.dateSent)}</p>
                    </div>
                    <div class="card-action">
                        <a href="/">Yes: {formatNumber(survey.yes)}</a>
                        <a href="/">No: {formatNumber(survey.no)}</a>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

/**
 * surveysReducer.js output assigned to state.surveys in reducers/index.js
 * @param {Array} surveys - Destructured from state.surveys where state is passed to function.
 */
function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);