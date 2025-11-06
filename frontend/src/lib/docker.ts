import Docker from "dockerode";
import { Readable } from "stream";
import { DOCKER_SOCKET } from "./variables";
import { logManager } from "./logger/LogManager";

const docker = new Docker({ socketPath: DOCKER_SOCKET });

export const runContainer = async (
  userUUID: string,
  directoryPath: string,
  containerName: string,
): Promise<void> => {
  try {
    const container = await docker.createContainer({
      name: userUUID,
      Image: containerName,
      Tty: true,
      HostConfig: {
        Binds: [`${directoryPath}:/workdir`],
        AutoRemove: true,
      },
      WorkingDir: "/workdir",
    });

    await container.start();
  } catch (error) {
    throw new Error(`Failed to run container: ${error}`);
  }
};

export const getContainerStatus = async (userUUID: string): Promise<string> => {
  try {
    const container = docker.getContainer(userUUID);
    const info = await container.inspect();
    return info.State.Status;
  } catch (error) {
    throw new Error(`Failed to get container status: ${error}`);
  }
};

export const streamContainerOutput = async function* (
  userUUID: string,
): AsyncIterableIterator<string> {
  try {
    const container = docker.getContainer(userUUID);

    const stream = await new Promise<NodeJS.ReadWriteStream>(
      (resolve, reject) => {
        container.attach(
          { logs: true, stream: true, stdout: true, stderr: true },
          (err, stream) => {
            if (err || !stream) {
              reject(new Error(`Failed to attach: ${err?.message}`));
            } else {
              resolve(stream);
            }
          },
        );
      },
    );

    const readableStream = new Readable().wrap(stream);
    for await (const chunk of readableStream) {
      yield chunk.toString();
    }
  } catch (error) {
    logManager.error("Error in streamContainerOutput:", error);
    throw error;
  }
};
