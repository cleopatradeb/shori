class UsersController < ApplicationController
  def user_data
    @current_user = current_user.to_json(include: [:artpieces, :followings, :pacts, :venuepics])
    @all_users = User.all.to_json(include: [:artpieces, :followings, :pacts, :venuepics])
    response = {current_user: @current_user, all_users: @all_users}
    render json: response
  end

  def gon 
    gon.current_user_id = current_user.id
    gon.current_user = current_user
  end
  
end

