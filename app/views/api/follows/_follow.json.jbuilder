json.extract! follow, :id, :follower_id, :followee_id

json.followee do
  json.username follow.followee.username
  json.avatar_url asset_path(follow.followee.avatar.url)
end
