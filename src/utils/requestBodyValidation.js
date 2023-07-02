export const isValidRequestBody = (username, age, hobbies) => {
  return (
    username && age && hobbies &&
    typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies) &&
    hobbies.every(hobby => typeof hobby === 'string')
  )
}
