json.array!(@artforms) do |artform|
  json.extract! artform, :id
  json.url artform_url(artform, format: :json)
end
