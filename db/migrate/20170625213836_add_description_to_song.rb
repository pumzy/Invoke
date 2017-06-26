class AddDescriptionToSong < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :description, :string
  end
end
