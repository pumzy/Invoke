class ChangeCommentCreatedTime < ActiveRecord::Migration[5.1]
  def change
    change_column :comments, :comment_time, :string
  end
end
