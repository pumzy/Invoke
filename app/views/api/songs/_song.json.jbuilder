json.extract! song, :id, :title, :genre, :created_at, :user_id
json.track_url asset_path(song.track.url)
