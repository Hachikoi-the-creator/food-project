export default {
  ingredientsList: validateingredientsList,
  name: validateName,
  desc: validateDescription,
  healthyness: validateHealthyness,
  steps: validateSteps,
  imageUrl: validateImageUrl,
  allInputsValidation,
};
/**
 *"ingredientsList": [{name:String, amount:Number, unit:String}]
  "steps": [Number],
  "dietTypes": [String] 
  "desc": String,
  "healthyness": Number,
  "imageUrl": String,
 */
//*/*/*/*/*/*//*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
function allInputsValidation(kekW) {}
/**
 * @param {Object[]} ingArr Array of ingredients {name:String, amount:Number, unit:String}; .... Just verify they have a truthy value
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
function validateingredientsList(ingArr) {
  const isValid = ingArr.every(Boolean);
  const nameArr = ingArr.map((e) => e.name);
  const amountsArr = ingArr.map((e) => e.amount);
  const unitsArr = ingArr.map((e) => e.unit);

  return !isValid
    ? `expected ${ingArr} to have a valid value for;but got 'name':${nameArr}, 'string':${amountsArr}, 'unit':${unitsArr}`
    : true;
}
// ***********************************************

/**
 * @param {String[]} steps
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
function validateSteps(steps) {
  const isValid = steps.every((e) => e.length > 5);
  const allLengths = steps.map((e) => e.length);

  return !isValid
    ? `Expected every step to have a length of al least 5 but got ${allLengths} as lengths`
    : true;
}
// ***********************************************

/**
 * @param {String[]} dietTypes
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
// ? Cannot fail since we get these options from the API
// function validateDietTypes(dietTypes) {
//   const isValid = dietTypes.every((e) => !!e.length);
//   const allLengths = dietTypes.map((e) => e.length);

//   return !isValid
//     ? `Expected all diet types to have a valid str.length but we got ${allLengths}...`
//     : true;
// }
// ***********************************************

/**
 * @param {String} name name of the recipe we want to create len(3-100)
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
function validateName(name) {
  const isValid = name.length >= 3 && name.length <= 100;
  return !isValid ? `Expected name.len (3-100) but got ${name.length}` : true;
}
// ***********************************************

/**
 * @param {String} desc len(10-150)
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
function validateDescription(desc) {
  const isValid = desc.length >= 10 && desc.length <= 150;
  return !isValid
    ? `Expected desc.length (10-150) but got ${desc.length}`
    : true;
}
// ***********************************************

/**
 * @param {Number} healthLvl val(10-100)
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
function validateHealthyness(healthLvl) {
  const isValid = healthLvl >= 10 && healthLvl <= 100;
  return !isValid ? `Expected healthLvl (10-100) but got ${healthLvl}` : true;
}
// ***********************************************

/**
 * @param {String} url
 * @returns {Boolean|String} wheter or not is a valid value OR a string with the error description
 */
function validateImageUrl(url) {
  const isValid = url.length > 10;
  return !isValid ? `Expected url.length > 10 but got ${url.length}` : true;
}
