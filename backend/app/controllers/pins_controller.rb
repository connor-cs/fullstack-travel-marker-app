class PinsController < ApplicationController
    
    def index
        pins = Pin.all
        render json: pins, status: :ok
    end

    def create
        p "----", params[:username]
        pin = Pin.create!(pin_params)
        render json: pin, status: :created
    end

    private

    def pin_params
        params.permit(:username, :title, :desc, :rating, :lat, :long)
    end
end
