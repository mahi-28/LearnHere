public with sharing class CourseDetailsController {

    @AuraEnabled
    public static List<CourseTrainer__c> getTrainers(String courseId){
        List<CourseTrainer__c> trainerList = [Select Id,Name,Trainer__c,
        Trainer__r.Name,Trainer__r.Phone__c,Trainer__r.Email__c,Trainer__r.Company__c
        From CourseTrainer__c
        Where Course__c =: courseId
        WITH SECURITY_ENFORCED
        ];
        return trainerList;
    }
    @AuraEnabled
    public static Course__c getLocationDetails(String courseId){
        Course__c courseRecord = [Select Id,Name,Location__c,
        Location__r.Name,Location__r.City__c,Location__r.Country__c,
        Location__r.State__c,Location__r.PostalCode__c,Location__r.Landmark__c,Location__r.Street__c
        From Course__c
        Where Id =: courseId
        WITH SECURITY_ENFORCED];
        return courseRecord;
    }

    @AuraEnabled
    public static List<CourseAttendee__c> getCourseAttendee(String courseId){
         
        List<CourseAttendee__c> courseAttendeeList = [Select Id,Name,Attendee__c,
        Attendee__r.Name,Attendee__r.Phone__c,Attendee__r.Email__c
        From CourseAttendee__c Where Course__c =: courseId
        WITH SECURITY_ENFORCED];
        return courseAttendeeList;

    }

    }

