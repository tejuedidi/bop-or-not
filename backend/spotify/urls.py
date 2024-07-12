from django.urls import path
from . import views

#* defines URL patterns
urlpatterns = [
    path('authorize/', views.authorize, name='spotify authorize'),
    path('callback/', views.callback, name='spotify callback'),
    path('tracks/', views.get_playlists, name='get_playlists'),
    path('tempo2/', views.tempo2, name='get tempo'),

]
