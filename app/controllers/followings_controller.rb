class FollowingsController < ApplicationController

  def create
    @following = Following.create(
      follower_id: params[:follower_id],
      user_id: params[:user_id]
      )
    render json: Following.all
  end

  def destroy
    @following = Following.find(params[:id])
    @following.destroy
    render json: Following.all
  end

  private

    def following_params
      params.require(:following).permit(:follower_id, :user_id)
    end
end
