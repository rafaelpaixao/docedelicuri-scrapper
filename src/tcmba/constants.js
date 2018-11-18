module.exports = {
  URLS: {
    SALARIES: 'https://www.tcm.ba.gov.br/portal-da-cidadania/pessoal/',
    ENTITIES:
      'https://www.tcm.ba.gov.br/Webservice/index.php/entidades?cdMunicipio='
  },
  SELECTORS: {
    CITIES: '#formConsulta #municipios',
    MONTHS: '#formConsulta #mes',
    YEARS: '#formConsulta #ano',
    SALARIES_CONTENT: '#texto',
    SALARIES_TABLE: 'table#tabelaResultado:last-of-type',
    SALARIES_ALERT: 'div.alert.alert-warning'
  },
  FORM: {
    ENTITY_FIELD_NAME: 'entidades'
  },
  ENTITIES_RESPONSE: {
    KEY_FOR_TEXT: 'dsEntidade',
    KEY_FOR_VALUE: 'cdEntidade'
  },
  ALERTS_CONTENT: {
    DATA_NOT_INFORMED: 'Os dados n&#xE3;o foram informados pelo Jurisdicionado!'
  }
}
