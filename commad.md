## OPENSSL Command

### generate openssl private key:

```
openssl genpkey -algorithm RSA -aes256 -pass pass:clean-pass -out config/keys/private.pem;
```

> pass : is unique code than you set

### generate rsa public key :

```
openssl rsa -in config/keys/private.pem -passin pass:clean-pass -pubout -outform PEM -out config/keys/public.pem
```
