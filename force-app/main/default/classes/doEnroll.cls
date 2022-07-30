public with sharing class doEnroll {

    @AuraEnabled
    public static void doenrolltoCourse(String params, String courseId){
        Attendee__c attendeeRecord = (Attendee__c) JSON.deserialize(params, Attendee__c.class);

        attendeeRecord.User__c = UserInfo.getUserId();
        String attendeeId = checkAttendee(UserInfo.getUserId());
        try {
            if(String.isBlank(attendeeId)) {
                insert attendeeRecord;
                attendeeId = attendeeRecord.Id;
            } else {
                attendeeRecord.Id = attendeeId;
                update attendeeRecord;
            }
            CourseAttendee__c courseAttendeeRecord = new CourseAttendee__c();
            courseAttendeeRecord.Attendee__c = attendeeId;
            courseAttendeeRecord.Course__c = courseId;
            insert CourseAttendeeRecord;
        }catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }      
    }

    private static String checkAttendee(String userId) {
        String attendeeId = '';
        List<Attendee__c> attendeeList = [Select Id, User__c From Attendee__c Where User__c = :userId WITH SECURITY_ENFORCED];
        if(attendeeList != null && attendeeList.size() > 0) {
            attendeeId = attendeeList[0].Id;
        }
        return attendeeId;
    }

}
