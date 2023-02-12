class PinsController < ApplicationController
    
    def index
        pins = Pin.all
        render json: pins, status: :ok
    end

    def create
        p "----", params
        pin = Pin.create!(pin_params)
        # pin = Pin.create(username: params[:username], title: params[:title], desc: params[:desc], rating: params[:rating], lat: params[:lat], long: params[:long])
        render json: pin, status: :created
    end

    private

    def pin_params
        params.permit(:username, :title, :desc, :rating, :lat, :long)
    end
end
