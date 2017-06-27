class Api::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  def index
    @comments = Comment.all
  end


  def show
  end

  def new
    @comment = Comment.new
  end

  def indexsong
    @comments = Comment.where(song_id: params[:songid])
    render :index
  end



  def edit
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
      if @comment.save
        render :show
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
  end

  def update
      if @comment.update(comment_params)
        render :show
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
  end

  def destroy
    if @comment.destroy
      render :destroy
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:body, :song_id, :comment_time)
    end
end
