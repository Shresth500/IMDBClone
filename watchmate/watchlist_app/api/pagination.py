from rest_framework import pagination
from rest_framework.response import Response


class WatchListPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    