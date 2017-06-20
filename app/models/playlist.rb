# == Schema Information
#
# Table name: playlists
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  user_id     :integer          not null
#  description :text
#  album       :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Playlist < ApplicationRecord
end
