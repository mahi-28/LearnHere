import { LightningElement, api, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import fetchCourseDetails from '@salesforce/apex/courseDetailLWCService.fetchCourseDetails';
import fetchTrainerDetails from '@salesforce/apex/courseDetailLWCService.fetchTrainerDetails';
import fetchUserName from '@salesforce/apex/UserUtility.fetchUserName';
import { NavigationMixin } from 'lightning/navigation';

export default class CourseDetailComponent extends NavigationMixin(LightningElement) {

  @api courseId;
  @api source;
  __CurrentPageReference;
  isSpinner = false;

  __trainers;
  __courseDetails;
  __errors;

  // variable to show/hide enroll button
 __showEnrollButton = false;

 // variable to show rsvp modal
 __showModal = false;
 __showContactModal = false;

  @wire(fetchUserName)
  wiredGuestData({ error, data }) {
    if (data) {
      console.log('Data', data);
      if(data.includes('Site Guest User')) {
        this.__showEnrollButton = false;
        console.log("Guest User!");
        console.log(this.__showEnrollButton);
      } else {
        this.__showEnrollButton = true;
        console.log("Logged User!");
        console.log(this.__showEnrollButton);
      }
    } else if (error) {
      console.error('Error:', error);
    }
    console.log("New ", this.__showEnrollButton);
  }
  
  

  @wire(CurrentPageReference) 
  getCurrentPageReference(PageReference) {
    this.__CurrentPageReference = PageReference;
    // window.console.log('PageReference', this.__CurrentPageReference);
    // window.console.log('state', this.__CurrentPageReference.state);
    // window.console.log('state', this.__CurrentPageReference.state.c__courseId);
    // window.console.log('state', this.__CurrentPageReference.state.courseId);

    this.courseId = this.__CurrentPageReference.state.courseId;
    this.source = this.__CurrentPageReference.state.source;
    this.fetchCourseDetailsJS();
    this.fetchTrainerDetailsJS();
   }

   fetchCourseDetailsJS() {
     this.isSpinner = true;
    fetchCourseDetails({ recordId: this.courseId })
       .then(result => {
         console.log('Result', result);
         console.log("location", result);
         this.__courseDetails = result;
       })
       .catch(error => {
         console.error('Error:', error);
         this.__errors = error;
     })
     .finally(() => {
      this.isSpinner = false;
    });

   }

   fetchTrainerDetailsJS() {
    this.isSpinner = true;
    fetchTrainerDetails({ courseId: this.courseId })
    .then(result => {
      console.log('Result', result);
      this.__trainers = result;
    })
    .catch(error => {
      console.error('Error:', error);
      this.__errors = error;
    })

   .finally(() => {
     this.isSpinner = false;
    });
  }

   handleEnroll() {
     console.log('output', this.courseId);

  }
  handleContactUs() {

  }

  handleLoginRedirect() {
    let navigationTarget = {
      type: 'comm__namedPage',
      attributes: {
          name: 'Login'
      }
  }
  // this[NavigationMixin.Navigate](navigationTarget);
  alert('Login to enroll');
  }

}

