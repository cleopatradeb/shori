class ArtpiecesController < ApplicationController

  def artpieces_data
    @all_artpieces = Artpiece.all.to_json(include: [:user, :artform, :pact])
    render json: @all_artpieces
  end

  def create
    binding.pry
    @artpiece = Artpiece.create(
      name: params[:name],
      description: params[:description],
      length: params[:length],
      height: params[:height],
      depth: params[:depth],
      price: params[:price],
      insurance: params[:insurance],
      image: params[:image],
      user_id: params[:user_id]
      )
    artform_id = params[:artform]
    artform = Artform.where(id: artform_id)
    @artpiece.artform = artform
    render json: Pact.all
  end


  private
    def artpiece_params
      params[:artpiece]
    end
end