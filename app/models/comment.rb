# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  body         :string           not null
#  user_id      :integer          not null
#  song_id      :integer          not null
#  comment_time :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ApplicationRecord

  validates_presence_of :body, :user, :song

  belongs_to :user

  belongs_to :song






end
