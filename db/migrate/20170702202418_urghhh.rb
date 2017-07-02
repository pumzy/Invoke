class Urghhh < ActiveRecord::Migration[5.1]
  def change
    remove_column :follows, :follower_id
    add_column :follows, :follower_id, :integer, null:false
  end
end
