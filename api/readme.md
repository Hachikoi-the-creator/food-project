# Routes

## /diets

- GET **diets/** : Get all diets from DB
- GET **diets/:id** : get a single diet from BD by UUID
- POST **diet/add?newDiet=<DietName>** : Add a diet by name to DB

## /recipes

- GET **recipes/?reciName=<recipeName>&resNum=<someNum>** : Get all recipes that match with th given name, could also specify how many you want at most (default 13), as for now we only check 113 random recipes from the spoonacular API
- GET **recipes/id/:id** : Get a single recipe by ID\UUID (if ID grabs a random recipe from API since that endpoint doesn't exist...)
- POST **recipes/add** : Add new recipe to DB (must have: name:String, desc:String, healthyness:int(0-100), steps:String[])
- GET **recipes/all** : Get all recipes added to DB
- PUT **recipes/update/:id** : Update recipe in DB (must have all fields)
- DELETE **recipes/del/:id** : remove recipe from DB

### Only valid endpoints

- GET <https://api.spoonacular.com/recipes/complexSearch>
  - Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag `&addRecipeInformation=true` a este endpoint
  - Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad `diets`
- GET <https://api.spoonacular.com/recipes/{id}/information> // This shit doesn't exist tho lmao

## Database (postgres)

- [ ] Recipe:
  - ID: \*
  - Nombre \*
  - Resumen del plato \*
  - Nivel de "comida saludable" (health score)
  - Paso a paso
- [ ] Diet:
  - ID
  - Nombre

**Must have a many to mnay relationship**

## Backend

- [ ] **GET /recipes?name="..."**:
  - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta mostrar un mensaje adecuado
- [ ] **GET /recipes/{idReceta}**:
  - Obtener el detalle de una receta en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de receta
  - Incluir los tipos de dieta asociados
- [ ] **POST /recipes**:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos relacionada con sus tipos de dietas.
- [ ] **GET /diets**:
  - Obtener todos los tipos de dieta posibles
  - En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)
