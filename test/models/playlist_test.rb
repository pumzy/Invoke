# == Schema Information
#
# Table name: playlists
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  user_id     :integer          not null
#  description :text
#  album       :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class PlaylistTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
