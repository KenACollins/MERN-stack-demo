// SurveyField displays a single input field with a styled label.
import React from 'react';

// props is passed in. Destructure to extract just the input, label, and meta properties.
// Then do nested destructuring to extract just the error and touched properties of props.meta.
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}  {/* If touched is true, then return the error object to show validation errors for particular fields. */}
            </div>
        </div>
    );
};