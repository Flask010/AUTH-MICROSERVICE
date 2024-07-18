import { DataSource, DataSourceOptions } from "typeorm";
import { appConfigInstance } from "../app-config/app-config";

export const dataSourceOptions: DataSourceOptions = {
  type: "mongodb",
  url: appConfigInstance.API_DB_CONNECTION_STRING,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [],
};
export const appDataSource = new DataSource(dataSourceOptions);
