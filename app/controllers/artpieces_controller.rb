class ArtpiecesController < ApplicationController


  def artpieces_data
    # @artpieces = Artpiece.all
    # @artpieces.each do |art|
    #   art.qr_code.to_img.save
    # end
    # @artpieces.save
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
