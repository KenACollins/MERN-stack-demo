// SurveyFormReview shows users the previously entered form data in read-only mode for their review.
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from "react-router";
import * as actions from '../../actions';

// props is passed in. Destructure to extract just the onCancel and formValues properties.
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

/**
 * Function that takes our Redux state and transforms it into props.
 * Name of this function does not matter, but we normally choose 'mapStateToProps'.
 * Here, we pass state containing survey form values to a formValues property we access above.
 */
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));