# == Schema Information
#
# Table name: songs
#
#  id                     :integer          not null, primary key
#  title                  :string           not null
#  genre                  :string
#  user_id                :integer          not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  track_file_name        :string
#  track_content_type     :string
#  track_file_size        :integer
#  track_updated_at       :datetime
#  cover_art_file_name    :string
#  cover_art_content_type :string
#  cover_art_file_size    :integer
#  cover_art_updated_at   :datetime
#  description            :string
#

require 'test_helper'

class SongTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
