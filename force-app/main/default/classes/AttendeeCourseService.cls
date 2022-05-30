public with sharing class AttendeeCourseService {

    @AuraEnabled
    public static List<CourseAttendee__c> upcomingCourses(String attendeeId){    
        List<CourseAttendee__c> courseLists = [Select Id,Name,Course__c,Course__r.Name,
        Course__r.Location__c,Course__r.Location__r.Name,
        Course__r.Course_Organizer__c,Course__r.Course_Organizer__r.Name,
        Course__r.StartDateTime__c From 
        CourseAttendee__c Where Attendee__c =:attendeeId
        AND Course__r.StartDateTime__c >=today AND Course__r.Live__c = true
        WITH SECURITY_ENFORCED
        
        ];
        return courseLists;
    }

    @AuraEnabled
    public static List<CourseAttendee__c> pastCourses(String attendeeId){
        List<CourseAttendee__c> courseLists = [Select Id,Name,Course__c,Course__r.Name,
        Course__r.Location__c,Course__r.Location__r.Name,
        Course__r.Course_Organizer__c,Course__r.Course_Organizer__r.Name,
        Course__r.StartDateTime__c From 
        CourseAttendee__c Where Attendee__c =:attendeeId
        AND Course__r.StartDateTime__c < today 
        WITH SECURITY_ENFORCED
        ];
        return courseLists;
    }
}
