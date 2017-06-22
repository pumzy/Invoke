class Api::SongsController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]


  def index
    @songs = Song.all
  end

  def indexuser
    @songs = Song.where(user_id: params[:userid])
    render :index
  end


  def show
  end

  def new
    @song = Song.new
  end

  def edit
  end

  def create
  @song = Song.new(song_params)
  @song.user_id = current_user.id
    if @song.save
     render :show
    else
      render json: @song.errors, status: :unprocessable_entity
    end
  end


  def update
      if @song.update(song_params)
        render :show, status: :ok
      else
        render json: @song.errors, status: :unprocessable_entity
      end
  end

  def destroy
    @song.destroy
  end

  private

    def set_song
      @song = Song.find(params[:id])
    end

    def song_params
      params.require(:song).permit(:title, :genre, :track, :user_id)
    end
end
