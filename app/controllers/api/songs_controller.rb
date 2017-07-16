class Api::SongsController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]


  def index
    if params[:token] == 'chart' && (!params[:genre] || params[:genre] == 'all')
      @songs = Song.order(playcount: :desc).limit(params[:num])
    elsif  params[:token] == 'chart' && params[:genre] && params[:genre] != 'all'
      @songs = Song.where({genre: params[:genre]}).order(playcount: :desc).limit(params[:num])
    elsif params[:token] == 'search'
      @songs = Song.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
    else
      @songs = Song.all
    end
  end

  def indexuser
    @songs = Song.where(user_id: params[:userid])
    render :index
  end

  def show2
    @song = Song.find_by(title: params[:title])
    render :show
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
    if params[:token] == 'addcount'
      @song.playcount += 1
      if @song.save
        render :show, status: :ok
      else
        render json: @song.errors, status: :unprocessable_entity
      end
      return
    end


      if @song.update(song_params)
        render :show, status: :ok
      else
        render json: @song.errors, status: :unprocessable_entity
      end
  end

  def destroy
    if @song.destroy
     render :destroy
    else
     render json: @song.errors, status: :unprocessable_entity
    end
  end

  private

    def set_song
      @song = Song.find(params[:id])
    end

    def song_params
      params.require(:song).permit(:title, :genre, :track, :cover_art, :description)
    end
end
