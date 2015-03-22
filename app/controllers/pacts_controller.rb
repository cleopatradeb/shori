class PactsController < ApplicationController
  before_action :set_pact, only: [:show, :edit, :update, :destroy]

  # GET /pacts
  # GET /pacts.json
  def index
    @pacts = Pact.all
  end

  # GET /pacts/1
  # GET /pacts/1.json
  def show
  end

  # GET /pacts/new
  def new
    @pact = Pact.new
  end

  # GET /pacts/1/edit
  def edit
  end

  # POST /pacts
  # POST /pacts.json
  def create
    @pact = Pact.new(pact_params)

    respond_to do |format|
      if @pact.save
        format.html { redirect_to @pact, notice: 'Pact was successfully created.' }
        format.json { render :show, status: :created, location: @pact }
      else
        format.html { render :new }
        format.json { render json: @pact.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pacts/1
  # PATCH/PUT /pacts/1.json
  def update
    respond_to do |format|
      if @pact.update(pact_params)
        format.html { redirect_to @pact, notice: 'Pact was successfully updated.' }
        format.json { render :show, status: :ok, location: @pact }
      else
        format.html { render :edit }
        format.json { render json: @pact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pacts/1
  # DELETE /pacts/1.json
  def destroy
    @pact.destroy
    respond_to do |format|
      format.html { redirect_to pacts_url, notice: 'Pact was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pact
      @pact = Pact.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pact_params
      params[:pact]
    end
end
