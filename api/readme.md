# TODO:

- Test how update on non existent Recipe works if it does lol
  api url: https://food-project-production.up.railway.app/
- Add a createdBy attr in Recipes as incentive to users to create recipes :D

# Routes

## /diets

- GET **diets/all** : Get all diets from DB
- GET **diets/id/:id** : get a single diet from BD by UUID
- GET **related/?dietName** : Gets all recipes related to that diet (DB & API)
- POST **diets/add?newDiet=<DietName>** : Add a diet by name to DB
- DELETE **diets/del?dietId=<DietId>** : Delete Diet From DB

## /recipes

- GET **recipes/?name=<recipeName>&amount=<someNum>** : Get all recipes that match with th given name, could also specify how many you want at most (default 13), as for now we only check 113 random recipes from the spoonacular API
- GET **recipes/id/:id** : Get a single recipe by ID\UUID (if ID grabs a random recipe from API since that endpoint doesn't exist...)
- POST **recipes/add** : Add new recipe to DB (must have: name:String, desc:String, healthyness:int(0-100), steps:String[])
- GET **recipes/all** : Get all recipes added to DB
- PUT **recipes/update/:id** : Update recipe in DB (must have all fields)
- DELETE **recipes/del/:id** : remove recipe from DB

## Expected Recipe format

```json
{
  "ingredientsList": [
    {
      "name": "some ingredient",
      "amount": 69,
      "unit": "grams"
    }
  ],
  "name": "lame af nam e",
  "desc": "kekwkokokokokkoko",
  "healthyness": 14,
  "steps": ["111111s1111111", "222222222222", "3333333dd33"],
  "imageUrl": "htpp:heyaaaa.com",
  "dietTypes": ["vegetarian"]
}
```

## Insanity FUEL

- [postgress tuto WHITE AF THO](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-update/)
- not undercase attr names must be with ""
- non-alphanum or alpha values must be with ''...

```shell
food=# UPDATE "Recipes"
SET "imageUrl"='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
WHERE id='c1c8f55c-31a3-4f52-8312-0ca04ed39d93';
UPDATE 1
```

### Only valid endpoints

- GET <https://api.spoonacular.com/recipes/complexSearch>
  - Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag `&addRecipeInformation=true` a este endpoint
  - Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad `diets`
- GET <https://api.spoonacular.com/recipes/{id}/information>
