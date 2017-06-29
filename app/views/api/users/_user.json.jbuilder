json.extract! user, :id, :username, :likes
json.avatar_url asset_path(user.avatar.url)

json.likes user.likes.each do |like|
  json.id like.id
  json.song_id like.song_id
end
