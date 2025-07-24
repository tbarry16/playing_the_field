class Api::V1::HealthController < ApplicationController
  allow_unauthenticated_access
  
  def index
    render json: {
      status: 'healthy',
      timestamp: Time.current.iso8601,
      version: '1.0.0'
    }
  end
end
