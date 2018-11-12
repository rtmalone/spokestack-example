# Spokestack Example

Example app for [react-native-spokestack](https://github.com/pylon/react-native-spokestack)

### Google Credentials

Google Credentials need to be formatted as

```
JSON.stringify({
      'type': 'service_account',
      'project_id': 'XXXXX',
      'private_key_id': 'XXXXX',
      'private_key': '-----BEGIN PRIVATE KEY-----\nXXXXX\n-----END PRIVATE KEY-----\n',
      'client_email': 'XXXXX',
      'client_id': 'XXXXX',
      'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
      'token_uri': 'https://accounts.google.com/o/oauth2/token',
      'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
      'client_x509_cert_url': 'XXXXX'
})
```

Note the explicit \n newlines for the private key lines.

In this example app, I've merely put the credentials in a `.json` file (which I've ignored in git), and imported that file as `GoogleKey`
