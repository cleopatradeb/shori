class ArtpiecesController < ApplicationController
  
  def artpieces_data
    @all_artpieces = Artpieces.all.to_json(include: [:users, :artforms, :pacts])
    render json: @all_artpieces
  end

  def create
  end

  private
    def artpiece_params
      params[:artpiece]
    end
end
