public with sharing class courseListComponentService {
    @AuraEnabled(cacheable = true)
    public static List<Course__c> fetchUpcomingCourses(){
        List<Course__c> courseList = new List<Course__c>();
        try {
            courseList = [Select Id, Name, Location__c,
                          Location__r.Name, CourseContents__c ,StartDateTime__c From Course__c
                          Where StartDateTime__c >= TODAY AND Live__c = true
                          WITH SECURITY_ENFORCED
                         ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return courseList;
    }

    @AuraEnabled(cacheable = true)
    public static List<Course__c> fetchPastCourses(){
        List<Course__c> courseList = new List<Course__c>();
        try {

            courseList = [Select Id, Name, CreatedDate, Location__c, 
            Location__r.Name, CourseContents__c,StartDateTime__c, EndDateTime__c
             From Course__c
            Where StartDateTime__c <= TODAY 
            WITH SECURITY_ENFORCED
           ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return courseList;
    }

}
