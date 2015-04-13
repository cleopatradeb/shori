class ChargesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def new
  end

  def create
    binding.pry
    selected_artpiece_id = request.fullpath.scan( /\d+$/ ).first
    @amount = @price

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :card  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Shori Stripe Customer',
      :currency    => 'gbp'
    )

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to artpiece_path(artpiece)
  end
end


