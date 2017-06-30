class Api::SearchController < ApplicationController
def index
   if params[:query].present?
    @results = PgSearch.multisearch(params[:query])
    render json: @results
   else
     @users = User.all
     @songs = Song.all
   end
 end
end
