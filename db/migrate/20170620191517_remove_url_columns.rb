class RemoveUrlColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :songs, :cover_art_url
    remove_column :songs, :track_url
  end
end
