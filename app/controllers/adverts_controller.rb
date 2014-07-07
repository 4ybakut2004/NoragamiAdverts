class AdvertsController < ApplicationController
	before_action :set_advert, only: [:show]

	respond_to :json

	LAST_COUNT = 10

	def index
		respond_with Advert.last(LAST_COUNT)
	end

	def show
		respond_with @advert
	end

	def create
		@advert = Advert.new(advert_params)

		respond_to do |format|
			if @advert.save
				format.json { render json: @advert, status: :created }
			else
				format.json { render json: @advert.errors, status: :unprocessable_entity }
			end
		end
	end

	private

		def advert_params
			params.require(:advert).permit(:nickname, :text, :avatar, :title)
		end

		def set_advert
			@advert = Advert.find(params[:id])
		end
end
