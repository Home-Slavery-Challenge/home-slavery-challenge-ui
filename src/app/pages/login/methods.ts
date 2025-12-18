export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkLoginFields = (registerForm: any) => {
  if (
    registerForm.controls['username'].value === "" ||
    registerForm.controls['password'].value === ""
  ) {
    return "All fields are required";
  }
  return ""
}
