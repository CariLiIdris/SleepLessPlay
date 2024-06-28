import admin from 'firebase-admin';

const serviceAccount = {
  "type": "service_account",
  "project_id": "sleeplessplayarcade",
  "private_key_id": "e46d4353f253451602a1f7373a02f4a5953510a3",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6MLNyuKglNV1G\nMajUuFtfM6ewcuCkVWKSoZGF47vn17xLOSQqUl7iBVUE0x2FC4mOPFC89qbtakx4\n+ebB2KMAED86W5knnNHfYpNGV5GwGY0CcO6SxmWcbA3b7haQjsxHeMkdQsgF1c90\nbGYQ44jU7c+hOTEXAqft+FwOmN+Gt3YObrVBvP4RiTYR5fRzKNBzSLy6gMTVNV6n\ny4rthuPnkrQfkzIo8PsvwcS4FRAQJVUuZ8caUIlyEPF2G6be3OA0plddlp8QqWF1\nxTQiiPyDX+ljkV/jpetItweexgwWA9+W/yXbXwTYpNwmEvXEAGMvoozcvy2aD7/r\nkEZRnVSxAgMBAAECggEAToeC8FSM6uCmnhgM3ueA9lbpl8TkFbvDrxfBMoj6dI8r\n5khMBiOmzEq2cKoAbeCPXHP5E7Iudr1aUr4IQ2M1YK35lQoUPz5n0IGZn1YI5w7n\nyAtMvJA8RCzY7ZVuY/suksiRfqtvhPKIpNChfecSC8jfxV7DYzKmFHsnjKqSwJUA\ncVSQSJYd+LH+8T8gnrkgI2XHAm6tzg7A2Z2peigZU1R55bwdLVKi0VNA6gf/WWie\nVyAqBHGppLkz+72fGJbesBc2wtDFr+rM190JeDVEf0ItDueRsheHQUtBckQ8tfCW\nduaMpv9/FuAvav3KoYXGL/Fh1HkvNQirLAi5zcvqlwKBgQDxukkAJqhnsYFG4sJg\nTDNgsshodDdyFHCkUGHX+fxYz1FKCyqIY7WxF/y+xVG2jRuuJ+gGNf3ZVMIdZ/dd\ndJNi+Q1eM5zOX3ZQ+39vF4MGvE5PZ9dXoEDUCaqX+yzFnm0GaeT11AAUGGgpeMk7\nsEFrIcj8oBRqciJfOoUlqoWPhwKBgQDFLveaW3xBN8uEHESl3bZfP3QFiClJJr2w\np7uKnpSoMLGT2Mr5YLDw1zsLTHvsA8f+7ZTDAKNfbg4gQ3RIsNraqGzLATO6GN9C\nhTFgp/TE2WVB0qyXzzVFUtXl3HBozWJqZUcEYRNk4sn6e9uWtsyQFB1U2p7mwUGR\nH1RgtGBYBwKBgHVTJlV1be2OYSHHs/JLafB4Nf9E0RiExTtrbGIIiquMTHc0vjse\nsjQ3YUwyt3t0N8gqxFonYINYuTLOoGhyyYqTOSLMyEH+YY3i07JW5hih0xyFWSbF\nuFFyM6O6nLt6Lo6bXS7X7AXU5tGiN4HKBaZ66nN7Ow2DQh2YaMGkZ1kHAoGBAJwQ\n63qplDQOVC9RLGhXjkPe9hZ2ya6TUini6EXz89cXC0XoneY5SHKm952ewKpx57Z3\nFnotJCGg+t9AZGYwTFgqXElkvys5CmQdBZLp/IpdQo6Rj3dsUk53HMMc8X+Rp6Zs\nWIQ3zWDZO2Hc7FVig5A5y2lgy8n6Bco2ENOlkGe7AoGAbxjmROm4PHzpjmpuKwg8\nbCy9aVLtSMZL0kf/u5oxs92Mhq3S6uOfO6rwZd9gN9fw/TGj64jov0FS09TBPp+9\nlOkdnqjCfa4qGgqBpn80GTM5BARa62WNseGh3bXCLBheCiyXjq8jJNEyxOKF/WWg\nOc6iaL/QrTDpKT8hNenj8Rk=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-urwem@sleeplessplayarcade.iam.gserviceaccount.com",
  "client_id": "118121085114531563075",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-urwem%40sleeplessplayarcade.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://sleeplessplayarcade.appspot.com'
});

const bucket = admin.storage().bucket();
export default bucket;