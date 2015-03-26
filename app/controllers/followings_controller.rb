class FollowingsController < ApplicationController
  before_action :set_match, only: [:show, :edit, :update, :destroy]

  def create
    @following = Following.create(
      following_id: params[:following_id],
      user_id: params[:user_id]
      )
  end

  private

    def following_params
      params.require(:following).permit(:following_id, :user_id)
    end
end
