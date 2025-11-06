import { useState, useCallback, useEffect } from "react";
import { UserConfiguration } from "@/types/configuration";
import { IConfigurationServiceClient } from "@/services/ConfigurationServiceClient.interface";
import { logManager } from "@/lib/logger/LogManager";
import { toast } from "sonner";

export const useConfiguration = (
  configurationService: IConfigurationServiceClient,
) => {
  const [config, setConfig] = useState<UserConfiguration>();
  const [loading, setLoading] = useState(false);

  const getConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await configurationService.get();
      setConfig(data);
    } catch (err) {
      toast("Error retrieving the configuration.");
      logManager.error("Error retrieving the configuration.", err);
    } finally {
      setLoading(false);
    }
  }, [configurationService]);

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const saveConfiguration = useCallback(
    async (newConfig: UserConfiguration) => {
      setLoading(true);
      try {
        const updatedConfig = await configurationService.set(newConfig);
        setConfig(updatedConfig);
        toast("Configuration saved.");
        return updatedConfig;
      } catch (err) {
        toast("Error saving the configuration.");
        logManager.error("Error saving the configuration.", err);
      } finally {
        setLoading(false);
      }
    },
    [configurationService],
  );

  return {
    config,
    loading,
    saveConfiguration,
    refresh: getConfig,
  };
};
