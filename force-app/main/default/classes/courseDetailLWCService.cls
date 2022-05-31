public with sharing class courseDetailLWCService {

    @AuraEnabled(cacheable=true)
    public static Course__c fetchCourseDetails(String recordId){
        Course__c courseRecord = new Course__c();
        try {
            courseRecord = [Select Id,Name,Course_Organizer__c, Course_Organizer__r.Name,
                            Course_Details__c, Location__c, Location__r.Name, StartDateTime__c,
                            Location__r.Street__c,Location__r.City__c,Location__r.State__c,
                            Location__r.Country__c, Location__r.PostalCode__c,
                            EndDateTime__c, Recurring__c, MaxSeats__c, Live__c, 
                            PeopleAttending__c, RemainingSeats__c From Course__c Where Id =: recordId
                            WITH SECURITY_ENFORCED
                            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return courseRecord;
    }

    @AuraEnabled(cacheable=true)
    public static void fetchTrainerDetails(String courseId){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
 
}
