public with sharing class UserUtility {
    
    @AuraEnabled
    public static string fetchUserName(){
        return UserInfo.getName();   
    }
}
