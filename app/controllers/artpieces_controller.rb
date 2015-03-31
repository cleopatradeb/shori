class ArtpiecesController < ApplicationController


  def artpieces_data
    @all_artpieces = Artpiece.all.to_json(include: [:user, :artform, :pact])
    render json: @all_artpieces
  end

  def create
  end

  def buy_art
    # Amount in cents
    @pizza = Pizza.find(params[:pizza_id])

    customer = Stripe::Customer.create(
      :email => 'example@stripe.com',
      :card  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => params[:price],
      :description => 'Shori Stripe Customer',
      :currency    => 'gbp'
    )

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to charges_path
    end
  end

  private
    def artpiece_params
      params[:artpiece]
    end
end
