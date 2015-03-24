json.array!(@artpieces) do |artpiece|
  json.extract! artpiece, :id
  json.url artpiece_url(artpiece, format: :json)
end
