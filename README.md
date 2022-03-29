# Factory Core

## Time

### Squad Factory

## Endpoints

### Base URL

- http://localhost:7100/core

---

### **Unidade de Compra**

### **Listar**

- **Listar Unidades de Compra**

```
  queryStringParameters: name
  GET {baseUrl}/purchase-unit
```

#### Response - Status 200 OK:

```
  [
    {
      id: 67812,
      name: 'm2',
      description: 'Metro quadrado',
      variations: ['m²', 'metro quadrado'],
    },
    {
      id: 12325,
      name: kg,
      description: 'Quilogramas',
      variations: ['kilo', 'kilogramas'],
    },
  ]
```

---

### **Buscar por id**

- **Busca unidade de compra por id**

```
  pathParameters: id
  GET {baseUrl}/purchase-unit/:id
```

#### Response - Status 200 OK:

```
  {
    id: 67812,
    name: 'm2',
    description: 'Metro quadrado',
    variations: ['m²', 'metro quadrado'],
  }
```

#### Response - Status 404 NOT_FOUND:

```
  {
    "message": "ERR_PURCHASE_UNIT_NOT_EXISTS"
  }
```

#### Response - Status 400 BAD_REQUEST:

```
  {
    "message": "ERR_INVALID_ID"
  }
```

---

### **Deletar**

- **Deleta, de forma lógica, a unidade de compra correspondente ao id**

```
  pathParameters: id

  DELETE {baseUrl}/purchase-unit/:id
```

#### Response - Status 200 OK

#### Response - Status 404 NOT_FOUND:

```
  {
    "message": "ERR_PURCHASE_UNIT_NOT_EXISTS"
  }
```

#### Response - Status 400 BAD_REQUEST:

```
  {
    "message": "ERR_INVALID_ID"
  }
```

---

### **Fase Produtiva**

### **Criar**

- **Cria uma nova fase produtiva**

```
POST {baseUrl}/production-phase

body:

  {
    name: 'Madeira',
    description: 'Madeira de carvalho',
  }
```

#### Response - Status 200 OK

#### Response - Status 409 CONFLICT

```
  {
    "message": "ERR_PRODUCTION_PHASE_DUPLICATE"
  }
```

---

### **Listar**

- **Listar as Fases Produtivas**

```

queryStringParameters: name
GET {baseUrl}/production-phase

```

#### Response - Status 200 OK:

```

  [
    {
      id: 1,
      name: 'Madeira',
      description: 'Madeira de carvalho',
      status: true,
    },
    {
      id: 5,
      name: 'Metal',
      description: 'Metal de aço',
      status: true,
    },
  ]

```

---

### **Buscar por id**

- **Busca fase produtiva por id**

```

pathParameters: id
GET {baseUrl}/production-phase/:id

```

#### Response - Status 200 OK:

```

    {
      id: 1,
      name: 'Madeira',
      description: '',
      status: true,
    },

```

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_PRODUCTION_PHASE_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Atualizar**

- **Atualiza a fase produtiva**

```
pathParameters: id
PUT {baseUrl}/production-phase/:id

body:

  {
    name: 'Madeira Pinheiro',
    description: 'Madeira de pinheiro',
  }

```

#### Response - Status 200 OK

#### Response - Status 409 CONFLICT

```
  {
    "message": "ERR_PRODUCTION_PHASE_DUPLICATE"
  }
```

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_PRODUCTION_PHASE_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Trocar status**

- **Altera o status da fase produtiva correspondente ao id**

```

pathParameters: id

PATCH {baseUrl}/production-phase/:id/status

body:

  {
    "status": true
  }

```

#### Response - Status 200 OK

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_PRODUCTION_PHASE_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Cadastro de Comprador**

### **Criar**

- **Cria um novo comprador**

```
POST {baseUrl}/buyer

body:

  {
    name: 'João',
    email: 'joao@email.com',
    phone: '1195554444',
  }
```

#### Response - Status 200 OK

#### Response - Status 409 CONFLICT

```
  {
    "message": "ERR_BUYER_DUPLICATE"
  }
```

---

### **Listar**

- **Listar os Compradores**

```

queryStringParameters: name
GET {baseUrl}/buyer

```

#### Response - Status 200 OK:

```

  [
    {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      phone: '1195554444',
      status: true,
    },
    {
      id: 2,
      name: 'Maria',
      email: 'maria@email.com',
      phone: '1146667777',
      status: true,
    },
  ]

```

---

### **Buscar por id**

- **Busca comprador por id**

```

pathParameters: id
GET {baseUrl}/buyer/:id

```

#### Response - Status 200 OK:

```

    {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      phone: '1195554444',
      status: true,
    },

```

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_BUYER_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Atualizar**

- **Atualiza o comprador**

```
pathParameters: id
PUT {baseUrl}/buyer/:id

body:

  {
      name: 'João',
      email: 'joao@email.com',
      phone: '1195554444',
  }

```

#### Response - Status 200 OK

#### Response - Status 409 CONFLICT

```
  {
    "message": "ERR_BUYER_DUPLICATE"
  }
```

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_BUYER_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Trocar status**

- **Altera o status do comprador correspondente ao id**

```

pathParameters: id

PATCH {baseUrl}/buyer/:id/status

body:

  {
    "status": true
  }

```

#### Response - Status 200 OK

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_BUYER_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```
---

### **Cadastro de Categoria**

### **Criar**

- **Cria um novo categoria**

```
POST {baseUrl}/category

body:

  {
    name: 'Tecido',
    description: 'Tecido de algodão',
  }
```

#### Response - Status 200 OK

#### Response - Status 409 CONFLICT

```
  {
    "message": "ERR_CATEGORY_DUPLICATE"
  }
```

---

### **Listar**

- **Listar as categorias**

```

queryStringParameters: name
GET {baseUrl}/category

```

#### Response - Status 200 OK:

```
 [
  {
    id: 1,
    name: 'Tecido',
    description: 'Tecido de algodão',
    status: true,
  },
  {
    id: 2,
    name: 'Chapa',
    description: 'Chapa de ferro',
    status: true,
  }
];

```

---

### **Buscar por id**

- **Busca categoria por id**

```

pathParameters: id
GET {baseUrl}/category/:id

```

#### Response - Status 200 OK:

```
  {
    id: 1,
    name: 'Tecido',
    description: 'Tecido de algodão',
    status: true,
  }

```

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_CATEGORY_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Atualizar**

- **Atualiza a categoria**

```
pathParameters: id
PUT {baseUrl}/category/:id

body:

  {
    name: 'Tecido',
    description: 'Tecido de algodão',
  }

```

#### Response - Status 200 OK

#### Response - Status 409 CONFLICT

```
  {
    "message": "ERR_CATEGORY_DUPLICATE"
  }
```

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_CATEGORY_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```

---

### **Trocar status**

- **Altera o status da categoria correspondente ao id**

```

pathParameters: id

PATCH {baseUrl}/category/:id/status

body:

  {
    "status": true
  }

```

#### Response - Status 200 OK

#### Response - Status 404 NOT_FOUND:

```

  {
    "message": "ERR_CATEGORY_NOT_EXISTS"
  }

```

#### Response - Status 400 BAD_REQUEST:

```

  {
    "message": "ERR_INVALID_ID"
  }

```
