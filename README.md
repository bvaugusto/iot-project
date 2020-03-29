## Project IOT

## Postgraduate Studies - Distributed Software Architecture

## API Presence Record

## Participants

> Bruno Vasconcellos Augusto
>
> Samuel Lorentz

### Getting Started

#### Depending global
Install [node.js](https://nodejs.org/en/download/)

Install Serverless
```bash
npm install serverless -g
npm install aws-cli -g
apt install awscli
```

Install [flutter](https://flutter.dev/docs/get-started/install)


### Backend

[Open folder backend](./backend)

Rum the command to create the .env file

```bash
cp .env.example .env
```

Populete enviroment 
```shell
PORT=9001

DOMAIN=
CERT=*.

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_APPLICATION_NAME=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

ENDPOINT_TYPE=
HOSTED_ZONE_ID=

EMAIL_AUTH=
PASSWORD_AUTH=
```

Start project
```bash
npm start
```

### App
[Open folder presence-record](./presence-record)

Run the command;
```bash
# With pub manager
pub get

# or with Flutter
flutter pub get
```
## Presentation
[![PresenceRecord](https://img.youtube.com/vi/KQ1s1QeWKZQ/0.jpg)](https://youtu.be/KQ1s1QeWKZQ)