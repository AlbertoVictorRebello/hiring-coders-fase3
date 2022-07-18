# Este código está sendo utilizando em conjunto com o AWS API Gateway + AWS Lambda + AWS DynamoDB

## Paths Disponivéis

### GET All
url -> https://4vl7rfaqt2.execute-api.us-east-1.amazonaws.com/v1/bonus

### GET BY CLIENT ID

url -> https://4vl7rfaqt2.execute-api.us-east-1.amazonaws.com/v1/bonus/{clientId}

### POST BY CLIENT ID 

url -> https://4vl7rfaqt2.execute-api.us-east-1.amazonaws.com/v1/bonus/{clientId}

body -> `{
  "points": number 
}` 

## 

Realizei as estas separações devido sempre ser necessário o envio do clientId tanto na atualização quanto na criação dos bônus com isso unifiquei em apenas uma rota para ser melhor trabalhado.
Facilitando na verificação da existência ou não do bônus do cliente dentro da API AWS
### Utilizei o arquivo json para realizar os testes
`
{
  url: "https://4vl7rfaqt2.execute-api.us-east-1.amazonaws.com/v1/bonus/b0d27034-060e-11ed-835d-0ac36946de57"
  body: {
    "points": 100 
  }
}
`