from rest_framework.throttling import UserRateThrottle

class ReviewCreateThrottle(UserRateThrottle):
    scope = 'review-create'
    

class ReviewListThrottling(UserRateThrottle):
    scope = 'review-list'