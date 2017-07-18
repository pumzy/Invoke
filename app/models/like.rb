# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  song_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord
  validates_presence_of :user, :song
  belongs_to :user
  belongs_to :song




  validates :user, uniqueness: {scope: :song}
  # has_many :playlists
  # has_many :comments

end
