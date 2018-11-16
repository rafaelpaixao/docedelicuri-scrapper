module.exports = {
  URLS: {
    SALARIES: 'https://www.tcm.ba.gov.br/portal-da-cidadania/pessoal/',
    ENTITIES:
      'https://www.tcm.ba.gov.br/Webservice/index.php/entidades?cdMunicipio='
  },
  SELECTORS: {
    CITIES: '#formConsulta #municipios',
    MONTHS: '#formConsulta #mes',
    YEARS: '#formConsulta #ano'
  },
  FORM: {
    ENTITY_FIELD_NAME: 'entidades'
  },
  ENTITIES_RESPONSE: {
    KEY_FOR_TEXT: 'dsEntidade',
    KEY_FOR_VALUE: 'cdEntidade'
  }
}
