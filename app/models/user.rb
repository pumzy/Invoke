# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#
  require 'paperclip/media_type_spoof_detector'
  module Paperclip
  class MediaTypeSpoofDetector
   def spoofed?
     false
   end
  end
  end

  class User < ActiveRecord::Base
    include PgSearch
    multisearchable :against => [:username]
      #               :using => {
      #                 :tsearch => {:prefix => true}
      #               }
      #
      # pg_search_scope :kinda_spelled_like,
      # :against => :username,
      # :using => :trigram


	attr_reader :password

	validates :username, :password_digest, :session_token, presence: true
	validates :username, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

  # validates_with AttachmentPresenceValidator, attributes: :avatar
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100#" }, default_url: "photo.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  # Need to do the song models.


  has_many :songs
  has_many :comments
  has_many :likes
  has_many :playlists

  has_many :followed_users,
  foreign_key: :follower_id,
  class_name: :Follow

  has_many :followers,
  foreign_key: :followee_id,
  class_name: :Follow


  has_many :liked_songs,
  through: :likes,
  source: :song



	def password=(password)
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

  def avatar_thumb
     avatar.url(:thumb)
  end

  def avatar_medium
     avatar.url(:medium)
  end

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		return nil unless user
		user.is_password?(password) ? user : nil
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = SecureRandom.base64
		ensure_session_token_uniqueness
		self.save
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= SecureRandom.base64
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = SecureRandom.base64
		end
	end



end
