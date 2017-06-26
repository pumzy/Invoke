class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.integer :user_id, null:false
      t.integer :song_id, null:false
      t.integer :comment_time
      t.timestamps
    end
  end
end
