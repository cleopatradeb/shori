class PactsController < ApplicationController
  def pacts_data
    @current_venue_pacts = Pact.where(venue_id: current_user.id)
    @current_artist_pacts = Pact.where(artist_id: current_user.id)
    @all_pacts = Pact.all
    response = {current_venue_pacts: @current_venue_pacts, current_artist_pacts: @current_artist_pacts, all_pacts: @all_pacts}
    render json: response
  end

  def create
    @pact = Pact.create(
      start_date: params[:start_date],
      end_date: params[:end_date],
      venue_id: params[:venue_id],
      artist_id: params[:artist_id]
      )
    artpieces_id_array = params[:selected_artpieces]
    choosen_artpieces = Artpiece.where(id: artpieces_id_array)
    @pact.artpieces = choosen_artpieces
    user_ids = [params[:venue_id], params[:artist_id]]
    pact_users = User.where(id: user_ids )
    @pact.users = pact_users
    render json: Pact.all
  end

  def destroy
    @pact = Pact.find(params[:id])
    @pact.destroy
    render json: Pact.all
  end

  private
  def pact_params
    params.require(:pact).permit(:start_date, :end_date)
  end
end
