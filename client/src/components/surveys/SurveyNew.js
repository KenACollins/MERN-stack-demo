// SurveyNew shows SurveyForm and SurveyFormReview.
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }
        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        );
    }
}

/**
 * Trick for dumping the form field values when user navigates away from SurveyNew, such as by clicking
 * Cancel button in SurveyForm or clicking some option in header that takes user away from form. This works
 * because the default value of the destroyOnUnmount property is true.
 */
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);