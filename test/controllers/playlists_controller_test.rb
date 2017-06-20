require 'test_helper'

class PlaylistsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @playlist = playlists(:one)
  end

  test "should get index" do
    get playlists_url
    assert_response :success
  end

  test "should get new" do
    get new_playlist_url
    assert_response :success
  end

  test "should create playlist" do
    assert_difference('Playlist.count') do
      post playlists_url, params: { playlist: {  } }
    end

    assert_redirected_to playlist_url(Playlist.last)
  end

  test "should show playlist" do
    get playlist_url(@playlist)
    assert_response :success
  end

  test "should get edit" do
    get edit_playlist_url(@playlist)
    assert_response :success
  end

  test "should update playlist" do
    patch playlist_url(@playlist), params: { playlist: {  } }
    assert_redirected_to playlist_url(@playlist)
  end

  test "should destroy playlist" do
    assert_difference('Playlist.count', -1) do
      delete playlist_url(@playlist)
    end

    assert_redirected_to playlists_url
  end
end
