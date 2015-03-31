class ArtpiecesController < ApplicationController

  def artpieces_data
    @all_artpieces = Artpiece.all.to_json(include: [:user, :artform, :pact])
    render json: @all_artpieces
  end

  def create
  end


  private
    def artpiece_params
      params[:artpiece]
    end
end
