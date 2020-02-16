import React from 'react';

export const NameErrors = ({ nameErrors }) => (
  <div className="formErrors">
    {Object.keys(nameErrors).map((fieldName, i) => {
      if (nameErrors[fieldName].length > 0) {
        return (
          <p key={i} className="pl-3">
            *{fieldName} {nameErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const NameErrorsIcon = ({ nameErrors }) => (
  <div className="formErrors">
    {Object.keys(nameErrors).map((fieldName, i) => {
      if (nameErrors[fieldName].length > 0) {
        return (
          <div key={i}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const EmailErrors = ({ emailErrors }) => (
  <div className="formErrors">
    {Object.keys(emailErrors).map((fieldName, i) => {
      if (emailErrors[fieldName].length > 0) {
        return (
          <p key={i} className="pl-3">
            *{fieldName} {emailErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const EmailErrorsIcon = ({ emailErrors }) => (
  <div className="formErrors">
    {Object.keys(emailErrors).map((fieldName, i) => {
      if (emailErrors[fieldName].length > 0) {
        return (
          <div key={i}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const PhonenumberErrors = ({ phonenumberErrors }) => (
  <div className="formErrors">
    {Object.keys(phonenumberErrors).map((fieldName, i) => {
      if (phonenumberErrors[fieldName].length > 0) {
        return (
          <p key={i} className="pl-3">
            *{fieldName} {phonenumberErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);
export const PhoneErrorsIcon = ({ phonenumberErrors }) => (
  <div className="formErrors">
    {Object.keys(phonenumberErrors).map((fieldName, i) => {
      if (phonenumberErrors[fieldName].length > 0) {
        return (
          <div key={i}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const PasswordErrors = ({ passwordErrors }) => (
  <div className="formErrors">
    {Object.keys(passwordErrors).map((fieldName, i) => {
      if (passwordErrors[fieldName].length > 0) {
        return (
          <p key={i} className="pl-3">
            *{fieldName} {passwordErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);
export const PasswordErrorsIcon = ({ passwordErrors }) => (
  <div className="formErrors">
    {Object.keys(passwordErrors).map((fieldName, i) => {
      if (passwordErrors[fieldName].length > 0) {
        return (
          <div key={i}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const FNameErrors = ({ fnameErrors }) => (
  <div className="formErrors">
    {Object.keys(fnameErrors).map((fieldName, i) => {
      if (fnameErrors[fieldName].length > 0) {
        return (
          <p key={i} className="pl-3">
            *{fnameErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const FNameErrorsIcon = ({ fnameErrors }) => (
  <div className="formErrors">
    {Object.keys(fnameErrors).map((fieldName, i) => {
      if (fnameErrors[fieldName].length > 0) {
        return (
          <div key={i}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const LNameErrors = ({ lnameErrors }) => (
  <div className="formErrors">
    {Object.keys(lnameErrors).map((fieldName, i) => {
      if (lnameErrors[fieldName].length > 0) {
        return (
          <p key={i} className="pl-3">
            *{lnameErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export const LNameErrorsIcon = ({ lnameErrors }) => (
  <div className="formErrors">
    {Object.keys(lnameErrors).map((fieldName, i) => {
      if (lnameErrors[fieldName].length > 0) {
        return (
          <div key={i}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        );
      } else {
        return '';
      }
    })}
  </div>
);
