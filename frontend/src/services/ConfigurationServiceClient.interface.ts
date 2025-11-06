import { UserConfiguration } from "@/types/configuration";

export interface IConfigurationServiceClient {
  get(): Promise<UserConfiguration>;
  set(configuration: UserConfiguration): Promise<UserConfiguration>;
}
