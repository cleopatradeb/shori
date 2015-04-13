class StaticController < ApplicationController
  def index
    gon.aws_access_key = ENV["AWS_ACCESS_KEY"]
    gon.aws_secret_key = ENV["AWS_SECRET_KEY"]
    gon.stripe_publishable_key = ENV["STRIPE_PUBLISHABLE_KEY"]
    gon.stripe_secret_key = ENV["STRIPE_SECRET_KEY"]
  end

end