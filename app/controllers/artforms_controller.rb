class ArtformsController < ApplicationController
  before_action :set_artform, only: [:show, :edit, :update, :destroy]

  # GET /artforms
  # GET /artforms.json
  def index
    @artforms = Artform.all
  end

  # GET /artforms/1
  # GET /artforms/1.json
  def show
  end

  # GET /artforms/new
  def new
    @artform = Artform.new
  end

  # GET /artforms/1/edit
  def edit
  end

  # POST /artforms
  # POST /artforms.json
  def create
    @artform = Artform.new(artform_params)

    respond_to do |format|
      if @artform.save
        format.html { redirect_to @artform, notice: 'Artform was successfully created.' }
        format.json { render :show, status: :created, location: @artform }
      else
        format.html { render :new }
        format.json { render json: @artform.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /artforms/1
  # PATCH/PUT /artforms/1.json
  def update
    respond_to do |format|
      if @artform.update(artform_params)
        format.html { redirect_to @artform, notice: 'Artform was successfully updated.' }
        format.json { render :show, status: :ok, location: @artform }
      else
        format.html { render :edit }
        format.json { render json: @artform.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /artforms/1
  # DELETE /artforms/1.json
  def destroy
    @artform.destroy
    respond_to do |format|
      format.html { redirect_to artforms_url, notice: 'Artform was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artform
      @artform = Artform.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def artform_params
      params[:artform]
    end
end
