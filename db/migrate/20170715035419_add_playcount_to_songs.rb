class AddPlaycountToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :playcount, :integer, :default => 0
  end
end
