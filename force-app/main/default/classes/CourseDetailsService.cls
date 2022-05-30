public with sharing class CourseDetailsService {

    @AuraEnabled
    public static List<Course__c> upcomingCourses(){
        List<Course__c> courseList = [select Id,Name,Course_Details__c,
        Location__c,StartDateTime__c,Course_Organizer__c,Course_Organizer__r.Name,Location__r.Name
        from Course__c 
        where StartDateTime__c >= Today AND Live__c = true
        WITH SECURITY_ENFORCED];

        return courseList;

    }


}
