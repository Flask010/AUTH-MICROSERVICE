export enum UserRoutes {
  BasePrefix = "user",
  Manage = "manage",
  List = "list",
  PaginatedList = "list-paginated",
  GetById = ":userId",
  GetDetailsById = "details/:userId",
  BlockById = "block/:userId",
}
