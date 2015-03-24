json.array!(@pacts) do |pact|
  json.extract! pact, :id
  json.url pact_url(pact, format: :json)
end
