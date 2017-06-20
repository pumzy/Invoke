class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :track_url, null: false
      t.string :title, null:false
      t.string :genre
      t.date :release_date, null:false
      t.integer :user_id, null:false
      t.string :cover_art_url
      t.timestamps
    end
    add_index :songs, :user_id
  end
end
