class ArtpiecesController < ApplicationController
  before_action :set_artpiece, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  # GET /artpieces
  # GET /artpieces.json
  def index
    @artpieces = Artpiece.all
  end

  # GET /artpieces/1
  # GET /artpieces/1.json
  def show
  end

  # GET /artpieces/new
  def new
    @artpiece = Artpiece.new
  end

  # GET /artpieces/1/edit
  def edit
  end

  # POST /artpieces
  # POST /artpieces.json
  def create
    @artpiece = Artpiece.new(artpiece_params)

    respond_to do |format|
      if @artpiece.save
        format.html { redirect_to @artpiece, notice: 'Artpiece was successfully created.' }
        format.json { render :show, status: :created, location: @artpiece }
      else
        format.html { render :new }
        format.json { render json: @artpiece.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /artpieces/1
  # PATCH/PUT /artpieces/1.json
  def update
    respond_to do |format|
      if @artpiece.update(artpiece_params)
        format.html { redirect_to @artpiece, notice: 'Artpiece was successfully updated.' }
        format.json { render :show, status: :ok, location: @artpiece }
      else
        format.html { render :edit }
        format.json { render json: @artpiece.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /artpieces/1
  # DELETE /artpieces/1.json
  def destroy
    @artpiece.destroy
    respond_to do |format|
      format.html { redirect_to artpieces_url, notice: 'Artpiece was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artpiece
      @artpiece = Artpiece.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def artpiece_params
      params[:artpiece]
    end
end
