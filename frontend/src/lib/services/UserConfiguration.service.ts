import {
  UserConfiguration,
  UserConfigurationSchema,
} from "@/types/configuration";
import { ServerWorkspace } from "./ServerWorkspace.service";
import { getDefaults } from "../utils";

interface IUserConfiguration {
  get(): Promise<UserConfiguration>;
  set(config: unknown): Promise<UserConfiguration>;
}

const CONFIG_FILE_NAME = "aicoder.config.json";

export class FileUserConfiguration implements IUserConfiguration {
  constructor(
    workspace: string,
    private writeConfiguration: (
      configuration: UserConfiguration,
    ) => Promise<UserConfiguration> = async (configuration) => {
      const buffer = new Blob([JSON.stringify(configuration)]);
      const file = new Blob([buffer]);
      await ServerWorkspace.uploadFile({
        workspace,
        filename: CONFIG_FILE_NAME,
        file,
      });
      return configuration;
    },
    private readConfiguration: () => Promise<UserConfiguration> = async () => {
      try {
        const fileBuffer = await ServerWorkspace.readFile({
          workspace,
          filename: CONFIG_FILE_NAME,
        });
        const jsonData = JSON.parse(fileBuffer.toString());
        return jsonData;
      } catch (error) {
        if ((error as { code: string }).code === "ENOENT") {
          return await this.writeConfiguration(
            getDefaults(UserConfigurationSchema),
          );
        } else {
          throw error;
        }
      }
    },
  ) {}

  async get(): Promise<UserConfiguration> {
    try {
      return await UserConfigurationSchema.parseAsync(
        await this.readConfiguration(),
      );
    } catch (error) {
      throw error;
    }
  }

  async set(config: unknown): Promise<UserConfiguration> {
    try {
      return await this.writeConfiguration(
        await UserConfigurationSchema.parseAsync(config),
      );
    } catch (error) {
      throw error;
    }
  }
}
