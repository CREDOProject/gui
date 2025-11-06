"use client";

import React, { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  PossibleModels,
  UserConfiguration,
  UserConfigurationSchema,
} from "@/types/configuration";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { useConfiguration } from "@/hooks/useConfiguration";
import { ConfigurationServiceClient } from "@/services/ConfigurationServiceClient";

export const Configuration = () => {
  const configService = useMemo(() => new ConfigurationServiceClient(), []);
  const { config, saveConfiguration } = useConfiguration(configService);

  const form = useForm<UserConfiguration>({
    resolver: zodResolver(UserConfigurationSchema),
    defaultValues: config,
  });
  useEffect(() => {
    if (config) {
      form.reset(config);
    }
  }, [config, form]);

  const onSubmit = async (values: UserConfiguration) => {
    await saveConfiguration(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model to use with AI Coder 4 Life Sciences" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PossibleModels.options.map((element, key) => (
                    <SelectItem value={element} key={key}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the model that will be used by all the generation of AI
                Coder 4 Life Sciences
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
