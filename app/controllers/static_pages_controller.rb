class StaticPagesController < ApplicationController
	def home
		@s3_direct_post = S3_BUCKET.presigned_post(key: "avatars/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :public_read)
	end
end
