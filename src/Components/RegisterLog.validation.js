const validate = (state, setState) => {
    let fullNameError = "";    
    let emailError = "";
    let passwordError = "";
  
    //No blank inputs - validations
    if (!state.fullName) {
      fullNameError = "This field cannot be blank";
    }
    if (!state.password) {
      passwordError = "Cannot be blank";
    }
          
    //Check for valid email
    var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
    if (!emailPattern.test(state.email)) {
      emailError = "invalid email";
    }
  
    //Check for valid password
    var passwordPattern = /^.{6}$/;
  
    if (!passwordPattern.test(state.password)) {
      passwordError = "Password must be at least 6 characters long";
    }    
   
    //If Error in input fields
    if (
      emailError ||
      fullNameError ||
      passwordError
    ) {
      setState({
        emailError,
        fullNameError,    
        passwordError
      });
      //Input fields are not valid
      return false;
    }
    //if no error. Input fields are valid
    return true;
  };
  
  export default validate;