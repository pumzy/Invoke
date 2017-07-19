json.extract! playlist, :id, :title, :description, :user_id, :song_ids, :created_at, :updated_at




json.playlist_songs(playlist.songs) do |song|
  json.username song.user.username
  json.title song.title
  json.cover_art_url asset_path(song.cover_art.url)
  json.playcount song.playcount
  json.track_url asset_path(song.track.url)
end

json.user do
  json.avatar_url asset_path(playlist.user.avatar.url)
end
