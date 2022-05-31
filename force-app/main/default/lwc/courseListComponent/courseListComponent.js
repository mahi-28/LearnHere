import { LightningElement, wire } from 'lwc';
import fetchUpcomingCourses from '@salesforce/apex/courseListComponentService.fetchUpcomingCourses';
import fetchPastCourses from '@salesforce/apex/courseListComponentService.fetchPastCourses';
import { NavigationMixin } from 'lightning/navigation';
export default class CourseListComponent extends NavigationMixin(LightningElement) {

  UpcomingCourses;
  PastCourses;
  __errors;
  isSpinner = false;

  @wire(fetchUpcomingCourses)
  wiredUpcomingCourseData({ error, data }) {
    if (data) {
      //console.log('Upcoming courses Data', data);
      this.UpcomingCourses = data;
      //console.log("Upcoming data",data);
    } else if (error) {
      //console.error('Upcoming courses Error:', error);
      this.UpcomingCourses = undefined;
      this.__errors = error
    }
  }

  @wire(fetchPastCourses)
  wiredPastCourseData({ error, data }) {
    if (data) {
      //console.log('Past courses Data', data);
      this.PastCourses = data;
      //console.log("Past data",data);
    } else if (error) {
      //console.error(' Past courses Error:', error);
      this.PastCourses = undefined;
      this.__errors = error
    }
  }

  handleCourseClick = course => {
    course.preventDefault();
    let selectedCourseId = course.currentTarget.dataset.courseId;

    let navigationTarget = {
        type: 'comm__namedPage',
        attributes: {
            name: 'courseDetails__c'
        },
        state : {
          courseId : selectedCourseId,
          source : 'courseListPage'
        }
    }
    this[NavigationMixin.Navigate](navigationTarget);
  }
}