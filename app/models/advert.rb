class Advert < ActiveRecord::Base
	validates :nickname, presence: true, length: { maximum: 50 }
	validates :title, length: { maximum: 50 }
	validates :avatar, length: { maximum: 255 }
	validates :text, presence: true, length: { maximum: 300 }
end
