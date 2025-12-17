export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkLoginFields = (registerForm: any) => {
  if (
    registerForm.controls['email'].value === "" ||
    registerForm.controls['password'].value === ""
  ) {
    return "All fields are required";
  }

  if (!emailRegex.test(<string>registerForm.value.email)) {
    return "Please enter a valid email address";
  }
  return ""
}
