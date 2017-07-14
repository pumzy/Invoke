json.extract! user, :id, :username, :likes
json.avatar_url asset_path(user.avatar.url)
json.followernum  user.followers.count
json.followingnum  user.followed_users.count
json.songnum user.songs.count
#
# json.likes do
#   json.array! user.likes
# end
