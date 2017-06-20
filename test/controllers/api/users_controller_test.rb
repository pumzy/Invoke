require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = api_users(:one)
  end

  test "should get index" do
    get api_users_url
    assert_response :success
  end

  test "should get new" do
    get new_api_user_url
    assert_response :success
  end

  test "should create user" do
    assert_difference('Api::User.count') do
      post api_users_url, params: { user: {  } }
    end

    assert_redirected_to api_user_url(Api::User.last)
  end

  test "should show user" do
    get api_user_url(@user)
    assert_response :success
  end

  test "should get edit" do
    get edit_api_user_url(@user)
    assert_response :success
  end

  test "should update user" do
    patch api_user_url(@user), params: { user: {  } }
    assert_redirected_to api_user_url(@user)
  end

  test "should destroy user" do
    assert_difference('Api::User.count', -1) do
      delete api_user_url(@user)
    end

    assert_redirected_to api_users_url
  end
end
