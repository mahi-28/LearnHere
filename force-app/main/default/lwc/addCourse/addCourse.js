import { LightningElement,track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import CRS_OBJECT from '@salesforce/schema/Course__c';
import Name from '@salesforce/schema/Course__c.Name';
import Course_Organizer__c from '@salesforce/schema/Course__c.Course_Organizer__c';
import StartDateTime__c from '@salesforce/schema/Course__c.StartDateTime__c';
import EndDateTime__c from '@salesforce/schema/Course__c.EndDateTime__c';
import MaxSeats__c from '@salesforce/schema/Course__c.MaxSeats__c';
import Location__c from '@salesforce/schema/Course__c.Location__c';
import Course_Details__c from '@salesforce/schema/Course__c.Course_Details__c';

export default class AddEvent extends NavigationMixin(LightningElement) {
  @track courseRecord = {
        Name : '',
        Course_Organizer__c : '',
        StartDateTime__c : null,
        EndDateTime__c : null,
        MaxSeats__c : null,
        Location__c : '',
        Course_Details__c : ''

  }

  @track errors;

  handleChange(course) {
    let value = course.target.value;
    let name = course.target.name;

    this.courseRecord[name] = value;

  }

  handleLookup(course) {
    let selectedRecId = course.detail.selectedRecordId;
    let parentId = course.detail.parentfield;
    this.courseRecord[parentId] = selectedRecId;

  }

  handleClick() {
    const fields = {};
    fields[Name.fieldApiName] = this.courseRecord.Name;
    fields[Course_Organizer__c.fieldApiName] = this.courseRecord.Course_Organizer__c;
    fields[StartDateTime__c.fieldApiName] = this.courseRecord.StartDateTime__c;
    fields[EndDateTime__c.fieldApiName] = this.courseRecord.EndDateTime__c;
    fields[MaxSeats__c.fieldApiName] = this.courseRecord.MaxSeats__c;
    fields[Location__c.fieldApiName] = this.courseRecord.Location__c;
    fields[Course_Details__c.fieldApiName] = this.courseRecord.Course_Details__c;

    const courseRecord = {apiName : CRS_OBJECT.objectApiName, fields};

    createRecord(courseRecord) 
    .then((courseRec) => {
      this.dispatchEvent(new ShowToastEvent({
          title: 'Record Saved!',
          message: 'Course Draft is ready!',
          variant: 'success'
      }));
      //alert('Record Saved' + eventRec.id)
      this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
              actionName: "view",
              recordId: courseRec.id,
          }
      });

    }).catch((err) => {
       this.errors = JSON.stringify(err);
       this.dispatchEvent(new ShowToastEvent({
           title: 'Error Occuured!',
           message: this.errors,
           variant: 'error'
       }));
    });

  }

  handleCancel() {
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            actionName: "home",
            objectApiName: "Course__c"
        }
    });
  }
}