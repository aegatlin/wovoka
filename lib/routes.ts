export const routes = {
  api: {
    auth: {
      signUp: () => 'api/auth/sign-up',
      signIn: () => 'api/auth/sign-in',
      signOut: () => 'api/auth/sign-out',
      session: () => 'api/auth/session',
    },
    groups: {
      index: () => '/api/groups',
      groupId: (groupId: string) => `/api/groups/${groupId}`,
      groupIdLists: (groupId: string) => `/api/groups/${groupId}/lists`,
      groupIdListsListId: (groupId: string, listId: string) =>
        `/api/groups/${groupId}/lists/${listId}`,
      groupIdListsListIdItems: (groupId: string, listId: string) =>
        `/api/groups/${groupId}/lists/${listId}/items`,
      groupIdListsListIdItemsItemId: (
        groupId: string,
        listId: string,
        itemId: string
      ) => `/api/groups/${groupId}/lists/${listId}/items/${itemId}`,
    },
  },
  pages: {},
}
