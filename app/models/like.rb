class Like < ApplicationRecord
  validates_presence_of :user, :song
  belongs_to :user
  belongs_to :song




  validates :user, uniqueness: {scope: :song}
  # has_many :playlists
  # has_many :comments

end
