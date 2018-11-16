const convertApiResponse = function({ entitiesResponse }) {
  let entities = []
  entitiesResponse.forEach(item => {
    entities.push({
      name: 'entidades',
      text: item['dsEntidade'],
      value: item['cdEntidade']
    })
  })
  return entities
}

module.exports = {
  convertApiResponse
}
