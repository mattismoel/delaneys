export const getUsers = query(async () => {
  const { locals } = getRequestEvent();
  const users = await locals.userProvider.getUsers();
  return users;
});

export const getCurrentUser = query(async () => {
  const { locals } = getRequestEvent();
  const user = await locals.authProvider.currentUser();
  return user;
});
