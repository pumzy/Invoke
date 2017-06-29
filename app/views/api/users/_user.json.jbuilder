json.extract! user, :id, :username, :likes
json.avatar_url asset_path(user.avatar.url)

# 
# json.likes do
#   json.array! user.likes
# end
