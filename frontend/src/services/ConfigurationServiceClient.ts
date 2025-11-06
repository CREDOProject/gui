import {
  UserConfiguration,
  UserConfigurationSchema,
} from "@/types/configuration";
import { BaseService } from "./BaseService";
import { IConfigurationServiceClient } from "./ConfigurationServiceClient.interface";

export class ConfigurationServiceClient
  extends BaseService
  implements IConfigurationServiceClient
{
  constructor(private baseUrl: string = "/api/config") {
    super();
  }

  async get(): Promise<UserConfiguration> {
    return UserConfigurationSchema.parse(
      await this.handleRequest(this.baseUrl, {
        method: "GET",
      }),
    );
  }
  async set(configuration: UserConfiguration): Promise<UserConfiguration> {
    await this.handleRequest(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(configuration),
    });
    return configuration;
  }
}
