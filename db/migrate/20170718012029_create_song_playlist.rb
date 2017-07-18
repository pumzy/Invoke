class CreateSongPlaylist < ActiveRecord::Migration[5.1]
  def change
    create_table :song_playlists do |t|
      t.integer :song_id, null: false
      t.integer :playlist_id, null: false
    end
  end
end
