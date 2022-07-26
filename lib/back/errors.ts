export const E = {
  NoUser: (email?: string) =>
    new Error(`no user ${email ? `with email: ${email}` : `found`}`),
  NoToken: () => new Error(`no token found`),
}
