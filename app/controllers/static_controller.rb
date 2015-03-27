class StaticController < ApplicationController
  def index
    gon.aws_access_key = ENV["AWS_ACCESS_KEY"]
    gon.aws_secret_key = ENV["AWS_SECRET_KEY"]
  end
end