class Follow < ActiveRecord::Base
  validates_presence_of :follower, :followee

  belongs_to :follower,
  foreign_key: :follower_id,
  class_name: :User

  belongs_to :followee,
  foreign_key: :followee_id,
  class_name: :User

end
