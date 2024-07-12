import spotipy
from django.conf import settings
from django.http import JsonResponse
from spotipy.oauth2 import SpotifyOAuth
from django.shortcuts import redirect

def authorize(request):
    sp_oauth = SpotifyOAuth(
        settings.SPOTIPY_CLIENT_ID, 
        settings.SPOTIPY_CLIENT_SECRET, 
        settings.SPOTIPY_REDIRECT_URI, 
        scope='user-library-read playlist-read-private')
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

def callback(request):
    code = request.GET.get('code')
    sp_oauth = SpotifyOAuth(
        settings.SPOTIPY_CLIENT_ID, 
        settings.SPOTIPY_CLIENT_SECRET, 
        settings.SPOTIPY_REDIRECT_URI)
    token_info = sp_oauth.get_access_token(code)
    if 'access_token' in token_info:
        request.session['token_info'] = token_info
        return redirect('http://localhost:5173/tracks')
    else:
        return JsonResponse({'error': 'Access token not found or expired'}, status=400)
    
def get_playlists(request):
    token_info = request.session.get('token_info')
    if token_info and 'access_token' in token_info:
        access_token = token_info['access_token']
        sp = spotipy.Spotify(auth=access_token)
        playlists = sp.current_user_playlists(limit=10)['items']  # Access 'items' directly
        return JsonResponse({'playlists': playlists})
    else:
        return JsonResponse({'error': 'Access token not found'}, status=400)

def tempo2(request):
    token_info = request.session.get('token_info')
    
    if token_info and 'access_token' in token_info:
        try:
            access_token = token_info['access_token']
            sp = spotipy.Spotify(auth=access_token)

            # Default tempo range (example: 100-150 BPM)
            tempo_range = '100-150'

            # Check if request includes a tempo range parameter
            if 'tempo_range' in request.GET:
                tempo_range = request.GET['tempo_range']

            # Split tempo range into min and max
            min_tempo, max_tempo = map(float, tempo_range.split('-'))

            # Get user's saved tracks
            results = sp.current_user_saved_tracks(limit=10)

            tracks = []

            for item in results['items']:
                track = item['track']

                # Retrieve audio features for the track
                audio_features = sp.audio_features(track['id'])

                if audio_features and len(audio_features) > 0 and 'tempo' in audio_features[0]:
                    tempo = audio_features[0]['tempo']
                    # Check if tempo falls within the specified range
                    if min_tempo <= tempo <= max_tempo:
                        tracks.append({
                            'name': track['name'],
                            'artist': track['artists'][0]['name'],
                            'id': track['id'],
                            'tempo': tempo
                        })

            # Sort tracks by tempo (descending)
            tracks_sorted_by_tempo = sorted(tracks, key=lambda x: x['tempo'], reverse=True)

            return JsonResponse({'tracks': tracks_sorted_by_tempo})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Access token not found'}, status=400)
