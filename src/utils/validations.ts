import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

export const userValidator = {
  validator: {
    given_name: (value = "") => value.trim().length >= 2,
    family_name: (value = "") => value.trim().length >= 2,
    username: (value = "") => /^[0-9A-Za-z]{8,}$/.test(value.trim()),
    email: (value = "") => isEmail(value.trim()),
    type: (value = "") => ['Internal', 'External'].includes(value.trim()),
    phone_number: (value = "") => /^(\+91|0)?[0-9]{10}$/.test(value.trim()),
    qualification: (value = "") => /^[a-zA-Z][a-zA-Z0-9\s]*$/.test(value.trim()) && value.trim().length >= 5,
    address_line_one: (value = "") => !!value.trim(),
    address_line_two: (value = "") => !!value.trim(),
    country: (value = "") => !!value.trim(),
    region: (value = "") => !!value.trim(),
    organization: (value = "") => value.trim().length >= 3,
    empcode: (value = "") => value.trim().length >= 3,
    department: (value = "") => value.trim().length >= 2,
    designation: (value = "") => value.trim().length >= 3,
    roleId: (value = "") => /^\d+\.?\d*$/.test(value),
  },
  errorMessage: {
    given_name: "First Name must be at least 2 characters",
    family_name: "Last Name must be at least 2 characters",
    username: "Username must be at least 8 characters without special characters",
    // email: "Email Address is invalid",
    email: "Please Enter Valid email address",
    type: "User type is not selected",
    phone_number: "Invalid Phone Number",
    qualification: "Qualification must be at least 5 characters and must start with a letter",
    address_line_one: "Address Line 1 is required",
    address_line_two: "Address Line 2 is required",
    country: "Country is required",
    region: "Region is required",
    organization: "Organization must be at least 3 characters",
    empcode: "Employee Code must be at least 3 characters",
    department: "Department must be at least 2 characters",
    designation: "Designation must be at least 3 characters",
    role: "Role is required",
  }
}