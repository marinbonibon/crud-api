export const isValidRequestBody = (
  username: string,
  age: number,
  hobbies: Array<string>,
) => {
  return username && age && hobbies && Array.isArray(hobbies);
};
