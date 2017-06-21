class AddTrackToSong < ActiveRecord::Migration[5.1]
  def change
    def self.up
      change_table :songs do |t|
        t.attachment :track
        t.attachment :cover_art
      end
    end

    def self.down
      remove_attachment :songs, :track
      remove_attachment :songs, :cover_art
    end
  end
end
