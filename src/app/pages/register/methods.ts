
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkRegisterFields=(registerForm: any)=>{
  if (
    registerForm.controls['email'].value ==="" ||
    registerForm.controls['username'].value ==="" ||
    registerForm.controls['password'].value ==="" ||
    registerForm.controls['confirmPassword'].value ===""
  ) {
    return "All fields are required";
  }

  if(registerForm.value.username!.length < 4 || registerForm.value.username!.length > 20){
    return "Username length between 4 and 20 characters";
  }
  if(!emailRegex.test(<string>registerForm.value.email )){
    return "Please enter a valid email address";
  }
  if(registerForm.value.password!.length < 6 || registerForm.value.password!.length > 20){
    return "Password length between 6 and 20 characters";
  }
  if(registerForm.value.password! !== registerForm.value.confirmPassword){
    return "Password confirmation is required";
  }
  return ""
}
