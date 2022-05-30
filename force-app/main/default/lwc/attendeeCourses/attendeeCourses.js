import { LightningElement,api, track } from 'lwc';
import upcomingCourses from '@salesforce/apex/AttendeeCourseService.upcomingCourses';
import pastCourses from '@salesforce/apex/AttendeeCourseService.pastCourses';

const columns = [

  {
    label: 'Course Name',
    fieldName: 'detailsPage',
    type: 'url',
    wrapText: 'true',
    typeAttributes: {
      label: {
        fieldName: 'Name'
      }
    }
  },
  {
    label: 'Name', 
    fieldName: 'EVNT_ORG',
    cellAttributes: 
    {
      iconName: 'standard:user',
      iconPosition: 'left',
    }
  },
  {
    label: 'Course Date',
    fieldName: 'StartDateTime',
    type: 'datetime',
  },
  {
    label: 'Location',
    fieldName: 'Location',
    type: 'text',
    cellAttributes: 
    {
      iconName: 'utility:location',
      iconPosition: 'left',
    }
  },


];


export default class AttendeeCourses extends LightningElement {
   @api recordId;
   @track courses;
   @track past_Courses;
   columnsList = columns;
   errors;

   connectedCallback() {
     this.upcomingCoursesFromApex();
     this.pastCoursesFromApex();

   }


   upcomingCoursesFromApex() {
    upcomingCourses({
      attendeeId : this.recordId
   })
    .then((result) => {
      result.forEach(record => {
        record.Name = record.Course__r.Name;
        record.detailsPage = "https://"+window.location.host+'/'+record.Course__c;
        record.EVNT_ORG = record.Course__r.Course_Organizer__r.Name;
        record.StartDateTime = record.Course__r.StartDateTime__c;
        if(record.Course__r.Location__c) { 
          record.Location = record.Course__r.Location__r.Name;

        } else {
          record.Location = 'This is a virtual Course';
        }

        
      });
      this.courses = result;
      window.console.log('result ', result);
      this.errors = undefined;

    }).catch((error) => {
      window.console.log('error ', error);
      this.events = undefined;
      this.errors = JSON.stringify(error);

    })

   }


   pastCoursesFromApex() {
    pastCourses({
      attendeeId : this.recordId
   })
    .then((result) => {
      result.forEach(record => {
        record.Name = record.Course__r.Name;
        record.detailsPage = "https://"+window.location.host+'/'+record.Course__c;
        record.EVNT_ORG = record.Course__r.Course_Organizer__r.Name;
        record.StartDateTime = record.Course__r.StartDateTime__c;
        if(record.Course__r.Location__c) { 
          record.Location = record.Course__r.Location__r.Name;

        } else {
          record.Location = 'This is a virtual course';
        }

        
      });
      this.past_Courses = result;
      window.console.log('result ', result);
      this.errors = undefined;

    }).catch((error) => {
      window.console.log('error ', error);
      this.courses = undefined;
      this.errors = JSON.stringify(error);

    })

   }


}