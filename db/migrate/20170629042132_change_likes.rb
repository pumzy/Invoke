class ChangeLikes < ActiveRecord::Migration[5.1]
  def change
    remove_column :likes, :user_id
    add_column :likes, :user_id, :integer, null:false
  end
end
