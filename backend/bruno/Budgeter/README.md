# Budgeter API - Kolekcja Bruno

Kompletna kolekcja zapytań API dla aplikacji Budgeter z wszystkimi endpointami.

## 📋 Spis treści

- [Struktura kolekcji](#struktura-kolekcji)
- [Jak używać](#jak-używać)
- [Endpointy](#endpointy)
- [Przykładowe dane](#przykładowe-dane)

## Struktura kolekcji

### 📁 Auth (Autoryzacja)
- **Register** - Rejestracja nowego użytkownika
- **Login** - Logowanie użytkownika

### 📁 Users (Użytkownicy)
- **Get User** - Pobierz dane zalogowanego użytkownika
- **Update User** - Zaktualizuj dane użytkownika

### 📁 Budgets (Budżety)
- **Get All Budgets** - Pobierz wszystkie budżety użytkownika
- **Get Budget by ID** - Pobierz konkretny budżet
- **Create Budget** - Utwórz nowy budżet (zwraca BudgetDto)
- **Update Budget** - Zaktualizuj budżet (zwraca BudgetDto)
- **Delete Budget** - Usuń budżet

### 📁 Budget Categories (Kategorie budżetowe)
- **Get All Categories** - Pobierz wszystkie kategorie
- **Get Category by ID** - Pobierz konkretną kategorię
- **Create Category** - Utwórz nową kategorię
- **Update Category** - Zaktualizuj kategorię
- **Delete Category** - Usuń kategorię

### 📁 Transactions (Transakcje)
- **Get All Transactions** - Pobierz wszystkie transakcje użytkownika
- **Get Transaction by ID** - Pobierz konkretną transakcję (⚠️ zwraca null)
- **Create Transaction** - Utwórz nową transakcję
- **Update Transaction** - Zaktualizuj transakcję
- **Delete Transaction** - Usuń transakcję

### 📁 Financial Goals (Cele finansowe)
- **Get All Financial Goals** - Pobierz wszystkie cele finansowe użytkownika
- **Get Financial Goal by ID** - Pobierz konkretny cel finansowy
- **Create Financial Goal** - Utwórz nowy cel finansowy
- **Update Financial Goal** - Zaktualizuj cel finansowy
- **Delete Financial Goal** - Usuń cel finansowy

## Jak używać

### 1. Konfiguracja środowiska

W pliku `environments/local.bru` znajdują się zmienne:
```
base_url: http://localhost:8080
access_token: 
```

### 2. Automatyczne zapisywanie tokena

Po pomyślnej rejestracji lub logowaniu, token JWT jest automatycznie zapisywany do zmiennej `access_token`.

### 3. Autoryzacja

Wszystkie chronione endpointy używają nagłówka:
```
Authorization: Bearer {{access_token}}
```

### 4. Kolejność użycia

1. **Register** lub **Login** - uzyskaj token
2. Token zostanie automatycznie zapisany
3. Możesz teraz używać wszystkich chronionych endpointów

## Endpointy

### Auth

#### POST `/api/auth/register`
```json
{
  "mail": "user@example.com",
  "password": "password123",
  "name": "Jan Kowalski",
  "dateOfBirth": "1990-01-01"
}
```
**Response:** AuthResponse (zawiera accessToken, email, expiresIn)

#### POST `/api/auth/login`
```json
{
  "mail": "user@example.com",
  "password": "password123"
}
```
**Response:** AuthResponse

### Users

#### GET `/api/users/`
**Headers:** Authorization: Bearer {token}  
**Response:** UserDto

#### PUT `/api/users/`
**Headers:** Authorization: Bearer {token}
```json
{
  "name": "Jan Nowak",
  "mail": "user@example.com",
  "nickname": "jnowak",
  "dateofbirth": "1990-01-01"
}
```

### Budgets

#### GET `/api/budgets/`
**Headers:** Authorization: Bearer {token}  
**Response:** List<BudgetDto>

#### GET `/api/budgets/?id=1`
**Headers:** Authorization: Bearer {token}  
**Response:** BudgetDto

#### POST `/api/budgets/`
**Headers:** Authorization: Bearer {token}
```json
{
  "name": "Miesięczny budżet",
  "periodStart": "2024-01-01",
  "periodEnd": "2024-01-31",
  "totalLimit": 5000.00
}
```
**Response:** BudgetDto

#### PUT `/api/budgets/`
**Headers:** Authorization: Bearer {token}
```json
{
  "id": 1,
  "name": "Zaktualizowany budżet",
  "periodStart": "2024-01-01",
  "periodEnd": "2024-01-31",
  "totalLimit": 6000.00
}
```
**Response:** BudgetDto

#### DELETE `/api/budgets/?id=1`
**Headers:** Authorization: Bearer {token}

### Budget Categories

#### GET `/api/budgets/category/`
**Headers:** Authorization: Bearer {token}  
**Response:** List<BudgetCategoryDto>

#### GET `/api/budgets/category/?id=1`
**Headers:** Authorization: Bearer {token}  
**Response:** BudgetCategoryDto

#### POST `/api/budgets/category/`
**Headers:** Authorization: Bearer {token}
```json
{
  "name": "Jedzenie",
  "plannedAmount": 1000.00,
  "spentAmount": 0.00,
  "limitAmount": 1200.00,
  "color": "#FF5733"
}
```

#### PUT `/api/budgets/category/`
**Headers:** Authorization: Bearer {token}
```json
{
  "id": 1,
  "name": "Żywność",
  "plannedAmount": 1200.00,
  "spentAmount": 300.00,
  "limitAmount": 1500.00,
  "color": "#FF5733"
}
```

#### DELETE `/api/budgets/category/?id=1`
**Headers:** Authorization: Bearer {token}

### Transactions

#### GET `/api/transaction/`
**Headers:** Authorization: Bearer {token}  
**Response:** List<Transaction>

#### GET `/api/transaction/?id=1`
**Headers:** Authorization: Bearer {token}  
**Response:** Transaction (⚠️ obecnie zwraca null)

#### POST `/api/transaction/`
**Headers:** Authorization: Bearer {token}
```json
{
  "name": "Zakupy spożywcze",
  "amount": 250.50,
  "description": "Zakupy w Biedronce",
  "transactionDate": "2024-01-15",
  "type": "EXPENSE",
  "budgetCategoryId": 1
}
```

#### PUT `/api/transaction/`
**Headers:** Authorization: Bearer {token}
```json
{
  "name": "Zaktualizowane zakupy",
  "amount": 300.00,
  "description": "Zaktualizowany opis",
  "transactionDate": "2024-01-16",
  "type": "EXPENSE",
  "budgetCategoryId": 1
}
```

#### DELETE `/api/transaction/?id=1`
**Headers:** Authorization: Bearer {token}

### Financial Goals

#### GET `/api/finantial_goals/?userId=1`
**Headers:** Authorization: Bearer {token}  
**Response:** List<FinancialGoalDto>

#### GET `/api/finantial_goals/?id=1`
**Headers:** Authorization: Bearer {token}  
**Response:** FinancialGoalDto

#### POST `/api/finantial_goals/`
**Headers:** Authorization: Bearer {token}
```json
{
  "userId": 1,
  "name": "Oszczędności na wakacje",
  "targetAmount": 10000.00,
  "currentAmount": 2000.00,
  "deadline": "2024-06-30",
  "priority": 1
}
```

#### PUT `/api/finantial_goals/`
**Headers:** Authorization: Bearer {token}
```json
{
  "id": 1,
  "userId": 1,
  "name": "Oszczędności na wakacje",
  "targetAmount": 12000.00,
  "currentAmount": 3500.00,
  "deadline": "2024-07-31",
  "priority": 1
}
```

#### DELETE `/api/finantial_goals/?id=1`
**Headers:** Authorization: Bearer {token}

## Przykładowe dane

### User
```json
{
  "id": 1,
  "name": "Jan Kowalski",
  "mail": "user@example.com",
  "nickname": "jkowalski",
  "dateofbirth": "1990-01-01",
  "role": "USER"
}
```

### Budget
```json
{
  "id": 1,
  "name": "Miesięczny budżet",
  "periodStart": "2024-01-01",
  "periodEnd": "2024-01-31",
  "totalLimit": 5000.00
}
```

### Budget Category
```json
{
  "id": 1,
  "name": "Jedzenie",
  "plannedAmount": 1000.00,
  "spentAmount": 350.00,
  "limitAmount": 1200.00,
  "color": "#FF5733"
}
```

### Transaction
```json
{
  "name": "Zakupy spożywcze",
  "amount": 250.50,
  "description": "Zakupy w Biedronce",
  "transactionDate": "2024-01-15",
  "type": "EXPENSE",
  "budgetCategoryId": 1
}
```

### Financial Goal
```json
{
  "id": 1,
  "userId": 1,
  "name": "Oszczędności na wakacje",
  "targetAmount": 10000.00,
  "currentAmount": 2000.00,
  "deadline": "2024-06-30",
  "priority": 1
}
```

## Typy danych

### Transaction Type
- `EXPENSE` - wydatek
- `INCOME` - przychód

### Role
- `USER` - standardowy użytkownik
- `ADMIN` - administrator (jeśli występuje)

## Uwagi

- ⚠️ **GET Transaction by ID** zwraca null - endpoint nie jest w pełni zaimplementowany
- Endpoint `/api/finantial_goals` ma literówkę (brak "c" w "financial")
- Wszystkie daty w formacie `YYYY-MM-DD`
- Kwoty w formacie `BigDecimal`
- Kolory kategorii w formacie hex (np. `#FF5733`)

## Wymagania

- Bruno API Client
- Aplikacja Budgeter działająca lokalnie (domyślnie port 8080)
- Java Spring Boot z Spring Security
- JWT authentication

## Struktura plików

```
budgeter-collection/
├── bruno.json
├── environments/
│   └── local.bru
├── Auth/
│   ├── Register.bru
│   └── Login.bru
├── Users/
│   ├── Get User.bru
│   └── Update User.bru
├── Budgets/
│   ├── Get All Budgets.bru
│   ├── Get Budget by ID.bru
│   ├── Create Budget.bru
│   ├── Update Budget.bru
│   └── Delete Budget.bru
├── Budget Categories/
│   ├── Get All Categories.bru
│   ├── Get Category by ID.bru
│   ├── Create Category.bru
│   ├── Update Category.bru
│   └── Delete Category.bru
├── Transactions/
│   ├── Get All Transactions.bru
│   ├── Get Transaction by ID.bru
│   ├── Create Transaction.bru
│   ├── Update Transaction.bru
│   └── Delete Transaction.bru
└── Financial Goals/
    ├── Get All Financial Goals.bru
    ├── Get Financial Goal by ID.bru
    ├── Create Financial Goal.bru
    ├── Update Financial Goal.bru
    └── Delete Financial Goal.bru
```

## Troubleshooting

### Błąd 403 Forbidden
- Upewnij się, że token JWT jest prawidłowo zapisany w zmiennej `access_token`
- Sprawdź czy token nie wygasł (wykonaj ponownie Login)
- Zweryfikuj format nagłówka Authorization

### Token nie zapisuje się automatycznie
- Sprawdź czy response z loginu/rejestracji zawiera pole `accessToken`
- Upewnij się, że skrypt post-response jest wykonywany

### Problemy z połączeniem
- Sprawdź czy aplikacja działa na porcie 8080
- Zweryfikuj czy `base_url` w środowisku jest poprawny
