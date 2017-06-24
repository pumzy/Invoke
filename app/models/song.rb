# == Schema Information
#
# Table name: songs
#
#  id                     :integer          not null, primary key
#  title                  :string           not null
#  genre                  :string
#  user_id                :integer          not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  track_file_name        :string
#  track_content_type     :string
#  track_file_size        :integer
#  track_updated_at       :datetime
#  cover_art_file_name    :string
#  cover_art_content_type :string
#  cover_art_file_size    :integer
#  cover_art_updated_at   :datetime
#

class Song < ApplicationRecord


  validates_presence_of :title
  belongs_to :user

  has_attached_file :cover_art, styles: { medium: "300x300>", thumb: "100x100#" }, default_url: "photo.jpg"
  validates_attachment_content_type :cover_art, content_type: /\Aimage\/.*\z/

  has_attached_file :track,  default_url: "app/assets/songs/Save-Tonight.mp3"
  validates_attachment_content_type :track, :content_type => /\Aaudio\/.*\z/

  #  [ ["audio/mpeg"], 'audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio' ]



  # has_many :playlists
  # has_many :comments

end
