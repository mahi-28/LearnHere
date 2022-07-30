import { LightningElement, api } from 'lwc';
import doenrolltoCourse from '@salesforce/apex/doEnroll.doenrolltoCourse';

export default class RsvpComponent extends LightningElement {

  __rsvpData = {};
  __isSpinner = false;

  @api courseId;

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

handleEnroll(course) {
  course.preventDefault();
  if(this.valiateInput()) {
    // this.dispatchEvent(new CustomEvent('rsvp', {
    //   detail: JSON.stringify(this.__rsvpData)
    // }));
    // make the call to apex class
    //console.log('Output :', this.__rsvpData);
    this.__isSpinner = true;

    doenrolltoCourse({
      params: JSON.stringify(this.__rsvpData),
      courseId: this.courseId
    })
    .then(result => {
      console.log('enroll result', result);
      alert('Enrolled Successfully!');
      this.dispatchEvent(new CustomEvent('success'));

    })
    .catch(error => {
      console.log('enroll error', error);
    })
    .finally(() => {
      this.__isSpinner = false;
    })
  }
}

handleCancel(course) {
  course.preventDefault();
  this.dispatchEvent(new CustomEvent('cancel'));
}

}