json.extract! song, :id, :title, :genre, :created_at, :user_id, :description, :playcount

json.user do
  json.avatar_url asset_path(song.user.avatar.url)
  json.username song.user.username
end

json.track_url asset_path(song.track.url)
json.cover_art_url asset_path(song.cover_art.url)
json.commentnum  song.comments.count


json.likes song.likes.each do |like|
  json.id like.id
  json.user_id like.user_id
end
