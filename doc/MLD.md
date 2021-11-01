# MLD

-List(id: SERIAL, name: TEXT NOT NULL, position: INT)
-Card(id: SERIAL, title: TEXT NOT NULL, position: INT, color: TEXT, #list_id: INT)
-Label(id: SERIAL, name: TEXT NOT NULL, color: TEXT)
-card_has_label(#card_id, #label_id)
