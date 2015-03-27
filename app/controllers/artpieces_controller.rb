class ArtpiecesController < ApplicationController
  before_action :authenticate_user!
  
  def create
    binding.pry
  end

  private
    def artpiece_params
      params[:artpiece]
    end
end
