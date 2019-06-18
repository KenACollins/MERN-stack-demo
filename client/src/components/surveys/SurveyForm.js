// SurveyForm shows a form for a user to add input.
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utilities/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                {formFields.map(field => (<Field key={field.name} type="text" {...field} component={SurveyField} />))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

/**
 * Create validate() function with rules for form validation. It will be the value set for validate property passed in export to reduxForm().
 * Note: Redux Form automatically runs our validate() function the first time it loads the form. This can be annoying for users to get errors
 * before they have begun to fill out the form. We take care of avoiding missing fields errors in the SurveyField component by checking if
 * fields are touched. We take care of avoiding invalid email addresses errors with the 'or empty string' part passed to validateEmails().
 * @param {Object} values Object supplied by Redux Form containing the name properties and user-entered data of all form fields.
 */
function validate(values) {
    const errors = {};

    /**
     * Verify that the user specified valid email addresses with comma separator.
     * This code runs when form first loads and values.recipients is null. Avoid error with 'or empty string' clause.
     * If this code were placed after the formFields.forEach() statement, the invalid emails error would replace the missing emails error.
     */
    errors.recipients = validateEmails(values.recipients || '');

    // All fields are required. Check for missing values.
    formFields.forEach( ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });


    return errors;
}

// Redux Form Helper initializes and helps configure the survey form we are about to work on.
export default reduxForm({
    validate,               // ES6 consise syntax for matching property and value, validate: validate.
    form: 'surveyForm',     // Tell Redux Form how to correctly manage (i.e., namespace) all of the values for THIS particular form inside the form reducer.
    destroyOnUnmount: false // When false, don't dump the form field data when SurveyForm is no longer on-screen. Default is true. Applies to Next button but not Cancel.
})(SurveyForm);