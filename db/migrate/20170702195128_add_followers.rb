class AddFollowers < ActiveRecord::Migration[5.1]
  def change
    create_table :follows do |t|
      t.string :follower_id, null: false
      t.integer :followee_id, null:false
      t.timestamps
    end
  end
end
