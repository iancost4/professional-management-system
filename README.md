# Projeto de Gerenciamento de Profissionais

## Funcionalidades
 - Cadastrar usuários
 - Cadastrar, editar, visualizar e deletar disponibilidades dos profissionais
 - Cadastrar sessão de um cliente (um cliente reservar o horário de um profissional)

## Tecnologias
 - TypeScript 
 - NodeJs
 - Jest
 - Docker
 - Mysql

## Como instalar

Instalar as dependências
```bash
$ yarn install
```

## Criar o arquivo .env
```
cp .env.example .env
```

## Docker
Executar o docker usando o `docker-compose`
```bash
$ docker-compose up --build -d
```

## URL
```
http://localhost:3333
```
Esperado:
`Health check`

## Testes

```bash
$ yarn test
```

```
 PASS  src/modules/availabilities/test/availability.controller.spec.ts
 PASS  src/modules/availabilities/test/availability.service.spec.ts
 PASS  src/modules/availabilities/test/availability.dto.spec.ts
 PASS  src/modules/availabilities/test/availabilityCreate.dto.spec.ts
 
 PASS  src/modules/users/test/user.controller.spec.ts
 PASS  src/modules/users/test/user.dto.spec.ts
 PASS  src/modules/users/test/userCreate.dto.spec.ts
 
 PASS  src/modules/bookings/test/booking.controller.spec.ts
 PASS  src/modules/bookings/test/booking.service.spec.ts
 PASS  src/modules/bookings/test/booking.dto.spec.ts
 PASS  src/modules/bookings/test/bookingCreate.dto.spec.ts

Test Suites: 11 passed, 11 total
Tests:       20 passed, 20 total
Snapshots:   0 total
```
## Rotas

### Usuários

```
[POST] /users
```
Body
```
{
    "name": "Ian Costa",
}
```
Response: `201`
```
{
    "message": "Registro(s) criado(s) com sucesso!",
    "data": {
        "id": 6,
        "name": "Ian Costa",
        "updatedAt": "2021-05-06T05:21:41.545Z",
        "createdAt": "2021-05-06T05:21:41.545Z"
    }
}
```

------------
------------

### Disponibilidades
------------
##### [GET] /availabilities/:id

Response: `200`
```
{
    "message": "Registro encontrado com sucesso!",
    "data": {
        "id": 7,
        "day": "SATURDAY",
        "availableTime": "11:00",
        "professionalId": 1,
        "createdAt": "2021-05-07T00:33:45.000Z",
        "updatedAt": "2021-05-07T00:33:45.000Z"
    }
}
```

------------

##### [GET] /availabilities/professionals/:id
Response: `200`
```
[
    {
        "day": "MONDAY",
        "availableTimes": []
    },
    {
        "day": "TUESDAY",
        "availableTimes": []
    },
    {
        "day": "WEDNESDAY",
        "availableTimes": []
    },
    {
        "day": "THURSDAY",
        "availableTimes": []
    },
    {
        "day": "FRIDAY",
        "availableTimes": [
            {
                "availableTime": "14:30",
                "id": 7
            }
        ]
    },
    {
        "day": "SATURDAY",
        "availableTimes": [
            {
                "availableTime": "08:00",
                "id": 1
            },
            {
                "availableTime": "08:30",
                "id": 2
            },
            {
                "availableTime": "09:00",
                "id": 3
            },
            {
                "availableTime": "09:30",
                "id": 4
            },
            {
                "availableTime": "10:30",
                "id": 6
            },
            {
                "availableTime": "11:30",
                "id": 8
            },
            {
                "availableTime": "12:00",
                "id": 9
            }
        ]
    },
    {
        "day": "SUNDAY",
        "availableTimes": []
    }
]
```

------------

##### [POST] /availabilities
Body
```
{
    "day":"SATURDAY",
    "professionalId": 1,
    "availableTimeStart": "08:00",
    "availableTimeEnd": "12:00"
}
```
Response: `201`
```
{
    "message": "Registro(s) criado(s) com sucesso!",
    "data": {}
}
```

------------

##### [PUT] /availabilities/:id
Body
```
{
    "day":"FRIDAY",
    "professionalId": 1,
    "availableTime": "14:30"
}
```
Response: `200`
```
{
    "message": "Registro atualizado com sucesso!",
    "data": {
        "id": 26,
        "day": "MONDAY",
        "availableTime": "14:30",
        "professionalId": 3,
        "createdAt": "2021-05-07T03:20:36.000Z",
        "updatedAt": "2021-05-07T03:21:04.000Z"
    }
}
```

------------

##### [DELETE] /availabilities/:id
Response: `200`
```
{
    "message": "Registro deletado com sucesso!",
    "data": {}
}
```

------------
------------

### Reservas
------------

##### [POST] /bookings
Body
```
{
    "appointmentTime": "10:30",
    "date": "18/12/2021",
    "clientId": 4,
    "professionalId": 1
}
```
Response: `201`
```
{
    "message": "Registro(s) criado(s) com sucesso!",
    "data": {
        "id": 9,
        "date": "2021-12-25T00:00:00.000Z",
        "appointmentTime": "11:30",
        "professionalId": 1,
        "clientId": 4,
        "updatedAt": "2021-05-06T05:42:02.442Z",
        "createdAt": "2021-05-06T05:42:02.442Z"
    }
}
```

------------

