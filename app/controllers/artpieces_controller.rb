class ArtpiecesController < ApplicationController

  def artpieces_data
    @all_artpieces = Artpiece.all.to_json(include: [:user, :artform, :pact])
    render json: @all_artpieces
  end

  def create
    @artpiece = Artpiece.create(
      name: params[:name],
      description: params[:description],
      width: params[:length],
      height: params[:height],
      depth: params[:depth],
      price: params[:price],
      insurance: params[:insurance],
      image: params[:image],
      user_id: params[:user_id]
      )
    artform_id = params[:type]
    artform = Artform.find(artform_id.to_i)
    @artpiece.artform = artform
    @user = User.find(params[:user_id]).artpieces << @artpiece
    render json: Artpiece.all

  end


  private
    def artpiece_params
      params[:artpiece]
    end
end