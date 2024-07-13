from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.CreateTaskListView.as_view()),
    path('tasks/delete/<int:pk>/', views.DeleteTask.as_view(), name='delete_task'),
]