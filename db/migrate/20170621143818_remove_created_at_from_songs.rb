class RemoveCreatedAtFromSongs < ActiveRecord::Migration[5.1]
  def change
    remove_column :songs, :release_date
  end
end
