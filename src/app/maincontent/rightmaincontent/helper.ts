import { Employee } from "./variables";

export let getElement = (elementId:string)=>{
    return (<HTMLInputElement>document.getElementById(elementId));
}
export let getElementValue = (elementId:string)=>{
    return (<HTMLInputElement>document.getElementById(elementId)).value;
}

export let setElementValue = (elementId:string, value:any)=>{
    (<HTMLInputElement>document.getElementById(elementId)).value = value;
}

export let findById = (id: number,list:any): Employee => {
    let emp = list.find((data:any) =>data.id === id);
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