//This is for login
export const LogInFormControls = [
  {
    name: "userEmail",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autComplete: "current-password",
  },
];
//This is for forgot password
export const ForgotPasswordFormControls = [
  {
    name: "userEmail",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
];
//This is for reset password
export const ResetPasswordFormControls = [
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your new password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your new password",
    autoComplete: "new-password",
  },
];

//initial login form
export const initialLoginFormData = {
  userEmail: "",
  password: "",
};


export const SignupFormControls = [
  {
    name: "fName",
    label: "First Name",
    type: "string",
    placeholder: "Enter  your First Name",
    autoComplete: "given-name",
  },
  {
    name: "lName",
    label: "Last Name",
    type: "string",
    placeholder: "Enter  your Last Name",
    autoComplete: "family-name",
  },
  {
    name: "userEmail",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "state",
    label: "State",
    type: "string",
    placeholder: "State",
    autoComplete: "state",
  },
  {
    name: "city",
    label: "City",
    type: "string",
    placeholder: "City",
    autoComplete: "city",
  },
  {
    name: "street",
    label: "Street",
    type: "string",
    placeholder: "Street",
    autoComplete: "street",
  },

  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autComplete: "new-password",
  },
  {
    name: "confirmpassword",
    label: "ConfirmPassword",
    type: "password",
    placeholder: "Confirm  your password",
    autComplete: "new-password",
  },
];

//initial login form
export const initialSignupFormData = {
  fName: "",
  lName: "",
  userEmail: "",
  password: "",
  confirmpassword: "",

};
