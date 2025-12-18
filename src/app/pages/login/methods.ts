export const checkLoginFields = (registerForm: any) => {
  if (
    registerForm.controls['username'].value === "" ||
    registerForm.controls['password'].value === ""
  ) {
    return "All fields are required";
  }
  return ""
}
