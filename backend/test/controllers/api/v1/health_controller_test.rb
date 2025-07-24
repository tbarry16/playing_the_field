require "test_helper"

class Api::V1::HealthControllerTest < ActionDispatch::IntegrationTest
  def test_should_get_index_and_return_healthy_status
    get api_v1_health_index_url
    assert_response :success
    
    json_response = JSON.parse(response.body)
    
    assert_equal "healthy", json_response["status"]
    assert_equal "1.0.0", json_response["version"]
    assert_not_nil json_response["timestamp"]
    
    # Verify timestamp is in ISO8601 format
    assert_nothing_raised do
      Time.parse(json_response["timestamp"])
    end
  end

  def test_should_return_json_content_type
    get api_v1_health_index_url
    assert_equal "application/json; charset=utf-8", response.content_type
  end

  def test_should_return_correct_json_structure
    get api_v1_health_index_url
    json_response = JSON.parse(response.body)
    
    expected_keys = %w[status timestamp version]
    assert_equal expected_keys.sort, json_response.keys.sort
  end

  def test_should_return_timestamp_close_to_current_time
    freeze_time do
      get api_v1_health_index_url
      json_response = JSON.parse(response.body)
      
      returned_time = Time.parse(json_response["timestamp"])
      current_time = Time.current
      
      # Timestamp should be within 1 second of current time
      assert_in_delta current_time.to_f, returned_time.to_f, 1.0
    end
  end
end