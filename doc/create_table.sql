


-- début de transaction --debut et fin de transaction begin et commit. C'est bien de commencer de cette façon por englober notre code donc ce code il va etre executer si tout fuvntionne, sinnon la transaccion il va tout remetre a cero
BEGIN;

-- On supprime déja les tables, si elles existent
DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

-- On crée nos tables
CREATE TABLE "list"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#FFF',
      -- si l'on veut pouvoir supprimer une liste qui contient des cartes
      -- on est obligé de rajouter "ON DELETE CASCADE" qui aura pour conséquence
      -- de supprimer toutes les cartes qui font référence à la liste
    "list_id" INTEGER NOT NULL REFERENCES list("id") ON DELETE CASCADE,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE "label"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#FFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_label"(
    "card_id" INTEGER NOT NULL REFERENCES card("id") ON DELETE CASCADE,
    "label_id" INTEGER NOT NULL REFERENCES label("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      -- ici pas d'updated_at car une relation ne se met pas à jour,
      -- soit on l'ajoute soit on la supprime
      -- Il ma faut une clé primaire composite car la clé primaire est composée de deux colonnes ou plus, elle est appelée clé primaire composite. Il est défini comme suit: Ça me sert a dire que ce copllpe est unique
    PRIMARY KEY("label_id", "card_id")
);

-- une fois les tables crées, on va les remplir (seeding)
INSERT INTO "list"  ("name")
VALUES ('A faire');

INSERT INTO "card" ("title", "color", "list_id")
VALUES  ('Sortir le chien', '#fff696', 1),
        ('Jeter la poubelle', '#c1e7ff', 1);
        

INSERT INTO "label" ("name", "color")
VALUES ('Urgent', '#F00');

-- on n'oublie pas la table de liaison
INSERT INTO "card_has_label" ("card_id", "label_id")
VALUES (1, 1);

-- fin de transaction
COMMIT;