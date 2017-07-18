# == Schema Information
#
# Table name: song_playlists
#
#  id          :integer          not null, primary key
#  song_id     :integer          not null
#  playlist_id :integer          not null
#

class SongPlaylist < ApplicationRecord

  validates_presence_of :song
  validates_presence_of :playlist

  belongs_to :song
  belongs_to :playlist


end
