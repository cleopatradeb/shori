class ChargesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def new
  end

  def create
    @amount = Artpiece.find(params[:artpiece_id].to_i).price * 100

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

    redirect_to "artpieces/#{params[:artpiece_id]}"
    
    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to "artpieces/#{params[:artpiece_id]}"
  end
end


