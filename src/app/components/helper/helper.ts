import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee } from "src/app/modals/employee";

export let getElement = (elementId: string) => {
  return (<HTMLInputElement>document.getElementById(elementId));
}
export let getElementValue = (elementId: string) => {
  return (<HTMLInputElement>document.getElementById(elementId)).value;
}

export let setElementValue = (elementId: string, value: any) => {
  (<HTMLInputElement>document.getElementById(elementId)).value = value;
}

export let findById = (id: number, list: any): Employee => {
  let emp = list.find((data: any) => data.id === id);
  return emp!;
}

export let validateEmail = (email: any): boolean => {
  let emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

export let validatePhoneNumber = (phoneNumber: any): boolean => {
  let phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

export let isFormValid = (employee: Employee, snackBar: MatSnackBar): boolean => {
  let firstName = employee.firstName.trim();
  let lastName = employee.lastName.trim();
  let email = employee.email.trim();
  let phoneNumber = employee.phoneNumber.trim();
  let skypeId = employee.skypeId.trim();

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