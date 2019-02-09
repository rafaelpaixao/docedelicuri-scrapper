# Doce de Licuri - Scrapper

#### Setup

Add a **firebase-key.json** file with the following format to project's root:

```
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

#### Example

1. Get options

```
yarn extract-options
```

2. Get payments for Feira de Santana

```
yarn extract-payments 2910800
```

3. Generate payments meta

```
yarn validate-payments
```

4. Clean payments

```
yarn clean-payments
```

5. Generate monthly reports

```
yarn make-reports
```
