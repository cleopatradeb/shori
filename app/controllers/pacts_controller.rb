class PactsController < ApplicationController

  def create
    @pact = Pact.create(
      start_date: params[:start_date],
      end_date: params[:end_date]
      )
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
