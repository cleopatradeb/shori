class UsersController < ApplicationController
  def user_data
    @current_user = current_user.to_json(:include => :artpieces)
    @all_users = User.all.to_json(:include => :artpieces)
    response = {:current_user => @current_user, :all_users => @all_users}
    render json: response
  end
end