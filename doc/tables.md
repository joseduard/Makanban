# List

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | SERIAL | non | aucun|
| name | TEXT | non | "" |
| position | INTEGER | non | 0 |
| created_at | DATE | oui | NOW() |
| updated_at | DATE | oui | null |

# Card

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
|---|---|---|---|
| id | SERIAL | non | aucun|
| title | TEXT | non | "" |
| color | TEXT | non | "#FFF" |
| list_id | INTEGER | non | 0 |
| position | INTEGER | non | 0 |
| created_at | DATE | oui | NOW() |
| updated_at | DATE | oui | null |

# Label

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | SERIAL | non | aucun|
| name | TEXT | non | "" |
| color | TEXT | non | "#FFF" |
| created_at | DATE | oui | NOW() |
| updated_at | DATE | oui | null |

# Card_has_label

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| card_id | INTEGER | non | aucun |
| label_id | INTEGER | non | aucun |