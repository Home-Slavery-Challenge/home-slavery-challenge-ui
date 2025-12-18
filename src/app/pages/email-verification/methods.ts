export const checkMailVerifcationFields = (registerForm: any) => {
  if (
    registerForm.controls['code'].value === "") {
    return "Code fields are required";
  }
  return ""
}
