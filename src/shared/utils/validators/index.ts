// Validation functions to be used with Redux-Form / Formik.
// If the value is valid, the validation function should return undefined.
// If the value is invalid, the validation function should return an error. This
// is usually a string, but it does not have to be.

export const required = (value: any) => {
  let empty = false;
  if (value === null) {
    empty = true;
  } else if (Array.isArray(value)) {
    empty = !value.length;
  } else if (typeof value === "object") {
    empty = Object.keys(value).length === 0 && value.constructor === Object;
  } else if (typeof value === "string") {
    empty = value.trim() === "";
  } else if (typeof value === "number") {
    empty = false;
  } else {
    empty = !value;
  }
  return !empty ? undefined : "This field is required.";
};

export const number = (value: any) =>
  value && isNaN(Number(value)) ? "Must be a number." : undefined;

// A simple email check. This isn't exhaustive, it's meant as a quick check.
export const email = (value: any) =>
  /(.+)@(.+){2,}\.(.+){2,}/.test(value) !== true
    ? "Must be a valid email."
    : undefined;

export const composedValidators = (
  ...args: Array<(value: any) => string | undefined>
) => (value: any) => {
  for (let validator of args) {
    const result = validator(value);
    if (result) {
      return result;
    }
  }
  return undefined;
};
