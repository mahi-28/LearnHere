import { LightningElement } from 'lwc';

export default class RsvpComponent extends LightningElement {

  __rsvpData = {};

handleChange(course) {
  const fieldName = course.target.name;
  const fieldValue = course.target.value;
  this.__rsvpData[fieldName] = fieldValue;
}

valiateInput() {
  const inputFields = this.template.querySelectorAll('lightning-input');
  let isValid = true;
  inputFields.forEach(field => {
    if(field.reportValidity() === false) {
      isValid = false;
    }
  });
  return isValid;
}

handleRsvp(course) {
  course.preventDefault();
  if(this.valiateInput()) {
    // this.dispatchEvent(new CustomEvent('rsvp', {
    //   detail: JSON.stringify(this.__rsvpData)
    // }));
    // make the call to apex class
    console.log('Output :', this.__rsvpData);
  }
}

handleCancel(course) {
  course.preventDefault();
  this.dispatchEvent(new CustomEvent('cancel'));
}

}