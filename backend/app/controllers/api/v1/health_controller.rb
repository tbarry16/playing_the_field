class Api::V1::HealthController < ApplicationController
  def index
    render json: {
      status: 'healthy',
      timestamp: Time.current.iso8601,
      version: '1.0.0'
    }
  end
end
