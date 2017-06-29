class Api::LikesController < ApplicationController
  before_action :set_like, only: [:show, :edit, :update, :destroy]

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
    @comments = Comment.where(song_id: params[:songid])
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
      params.require(:like).permit(:body, :song_id, :like_time)
    end
end
