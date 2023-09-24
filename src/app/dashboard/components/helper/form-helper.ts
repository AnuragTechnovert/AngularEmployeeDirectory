import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee } from "src/app/models/employee";

export let validateEmail = (email: any): boolean => {
  let emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

export let validatePhoneNumber = (phoneNumber: any): boolean => {
  let phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

export let isFormValid = (employee: Employee, snackBar: MatSnackBar): boolean => {
  let firstName = employee.firstName;
  let lastName = employee.lastName;
  let email = employee.email;
  let phoneNumber = employee.phoneNumber;
  let skypeId = employee.skypeId;

  if (firstName === "") {
    snackBar.open('Please enter your first name.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  if (lastName === "") {
    snackBar.open('Please enter your last name.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  if (email === "") {
    snackBar.open('Please enter your email address.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  if (!validateEmail(email)) {
    snackBar.open('Please enter a valid email address.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  if (phoneNumber === "") {
    snackBar.open('Please enter your phone number.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    snackBar.open('Please enter your phone number.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  if (skypeId === "") {
    snackBar.open('Please enter your Skype ID.', 'Dismiss', {
      duration: 3000,
    });
    return false;
  }

  return true;
}