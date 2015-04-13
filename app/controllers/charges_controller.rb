class ChargesController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def new
  end

  def create
    @artpiece = Artpiece.find(params[:artpiece_id].to_i)
    @amount = @artpiece.price * 100

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
    @artpiece.status = "sold"
    @artpiece.save
    redirect_to "artpieces/#{params[:artpiece_id]}"

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to "artpieces/#{params[:artpiece_id]}"
  end
end


