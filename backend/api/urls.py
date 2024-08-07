from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.CreateTaskListView.as_view()),
    path('tasks/delete/<int:pk>/', views.DeleteTask.as_view(), name='delete_task'),
    path('tasks/edit/<int:pk>/', views.EditTaskView.as_view(), name='edit_task'),
    path('events/', views.GetEventsView.as_view(), name='get_events'),
]