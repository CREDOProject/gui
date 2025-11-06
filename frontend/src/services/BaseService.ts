import { AiCoderApiError } from "@/types/error";

export abstract class BaseService {
  async handleRequest(url: string, init?: RequestInit): Promise<unknown> {
    const response = await fetch(url, init);
    if (!response.ok) {
      const errorData: AiCoderApiError = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
  }
}
