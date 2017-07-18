class Api::PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :destroy]

  def index
    @playlists = Playlist.all
  end

  def indexuser
    @playlists = Playlist.where(user_id: params[:userid])
    render :index
  end

  def show
  end



  def new
    @playlist = Playlist.new
  end

  def edit
  end

  def show2
    @playlist = Playlist.find_by(title: params[:title])
    render :show
  end


  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.user_id = current_user.id
      if @playlist.save
        render :show
      else
        render json: @playlist.errors, status: :unprocessable_entity
      end
  end

  def update
      if @playlist.update(playlist_params)
        render :show, status: :ok
      else
       render json: @playlist.errors, status: :unprocessable_entity
      end
  end

  def destroy
    if @playlist.destroy
      render json: destroy
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def playlist_params
      params.require(:playlist).permit(:user_id, :title, :album, :description)
    end
end
