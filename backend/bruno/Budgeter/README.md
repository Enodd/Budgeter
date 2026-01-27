# Budgeter API - Kolekcja Bruno

Kompletna kolekcja zapytań API dla aplikacji Budgeter.

## Struktura kolekcji

### 📁 Auth (Autoryzacja)
- **Register** - Rejestracja nowego użytkownika
- **Login** - Logowanie użytkownika

### 📁 Budgets (Budżety)
- **Get All Budgets** - Pobierz wszystkie budżety użytkownika
- **Get Budget by ID** - Pobierz konkretny budżet
- **Create Budget** - Utwórz nowy budżet
- **Update Budget** - Zaktualizuj istniejący budżet
- **Delete Budget** - Usuń budżet

### 📁 Transactions (Transakcje)
- **Get All Transactions** - Pobierz wszystkie transakcje użytkownika
- **Get Transaction by ID** - Pobierz konkretną transakcję
- **Create Transaction** - Utwórz nową transakcję
- **Update Transaction** - Zaktualizuj transakcję (PUT)
- **Patch Transaction** - Częściowa aktualizacja transakcji (PATCH)
- **Delete Transaction** - Usuń transakcję

### 📁 Users (Użytkownicy)
- **Say Hello** - Prosty endpoint testowy

## Jak używać

### 1. Konfiguracja środowiska

W pliku `environments/local.bru` znajdują się zmienne:
```
base_url: http://localhost:8080
access_token: 
```

Możesz zmienić `base_url` jeśli Twoja aplikacja działa na innym porcie lub adresie.

### 2. Automatyczne zapisywanie tokena

Po pomyślnej rejestracji lub logowaniu, token JWT jest automatycznie zapisywany do zmiennej `access_token` dzięki skryptowi post-response:

```javascript
if (res.status === 200) {
  bru.setEnvVar("access_token", res.body.accessToken);
}
```

### 3. Kolejność użycia

1. **Register** lub **Login** - aby uzyskać token
2. Token zostanie automatycznie zapisany
3. Możesz teraz używać wszystkich chronionych endpointów

### 4. Uwagi dotyczące endpointów

- **Get Transaction by ID** - zwraca `null` (nie zaimplementowany)
- **Patch Transaction** - zwraca tylko status 200 bez logiki
- **Delete Transaction** - brak implementacji usuwania w kontrolerze

## Przykładowe dane

### Rejestracja
```json
{
  "mail": "user@example.com",
  "password": "password123",
  "name": "Jan Kowalski",
  "dateOfBirth": "1990-01-01"
}
```

### Tworzenie budżetu
```json
{
  "name": "Miesięczny budżet",
  "periodStart": "2024-01-01",
  "periodEnd": "2024-01-31",
  "totalLimit": 5000.00
}
```

### Tworzenie transakcji
```json
{
  "name": "Zakupy spożywcze",
  "amount": 250.50,
  "description": "Zakupy w supermarkecie",
  "transactionDate": "2024-01-15",
  "type": "EXPENSE",
  "budgetCategoryId": 1
}
```

## Typy transakcji

Prawdopodobne wartości dla pola `type`:
- `EXPENSE` - wydatek
- `INCOME` - przychód

## Wymagania

- Bruno API Client
- Aplikacja Budgeter działająca lokalnie (domyślnie na porcie 8080)
- Java Spring Boot z konfiguracją Spring Security

## Struktura plików

```
budgeter-collection/
├── bruno.json
├── environments/
│   └── local.bru
├── Auth/
│   ├── Register.bru
│   └── Login.bru
├── Budgets/
│   ├── Get All Budgets.bru
│   ├── Get Budget by ID.bru
│   ├── Create Budget.bru
│   ├── Update Budget.bru
│   └── Delete Budget.bru
├── Transactions/
│   ├── Get All Transactions.bru
│   ├── Get Transaction by ID.bru
│   ├── Create Transaction.bru
│   ├── Update Transaction.bru
│   ├── Patch Transaction.bru
│   └── Delete Transaction.bru
└── Users/
    └── Say Hello.bru
```
