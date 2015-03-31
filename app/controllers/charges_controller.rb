class ChargesController < ApplicationController
  def new
  end

  def create
    binding.pry
    selected_artpiece_id = request.fullpath.scan( /\d+$/ ).first
    @amount = @price

    customer = Stripe::Customer.create(
      :email => 'example@stripe.com',
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


