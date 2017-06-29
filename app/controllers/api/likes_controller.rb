class Api::LikesController < ApplicationController
  before_action :set_like, only: [:show, :edit, :update]

  def index
    @like = Like.all
  end


  def show
  end

  def new
    @like = Like.new
  end

  def edit
  end

  def indexsong

    @likes = Like.where(song_id: params[:songid])
    render :index
  end

  def create
    @like = Like.new(like_params)
    @like.user_id = current_user.id
      if @like.save
        render :show
      else
        render json: @like.errors, status: :unprocessable_entity
      end
  end


  def destroy
    @like = Like.find_by(user_id: current_user.id, song_id: like_params[:song_id])
    if @like.destroy
      render :show
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  private
    def set_like
      @like = Like.find(params[:id])
    end

    def like_params
      params.require(:like).permit(:song_id)
    end
end
