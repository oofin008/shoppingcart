import React, { useContext } from "react";
import { Container, interfaces } from "inversify";

interface ContainerContext {
  container: Container | null
}

const InversifyContext = React.createContext<ContainerContext>(
  { container: null },
);

interface ContainerProviderProps {
  container: Container;
}

export const ContainerProvider: React.FC<ContainerProviderProps> = (
  { container, children },
) => (
  <InversifyContext.Provider value={{ container }}>
    {children}
  </InversifyContext.Provider>
);

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>): T {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error('The container should not be null');
  }
  try {
    return container.get<T>(identifier);
  } catch (e) {
    return container.resolve<T>(identifier as interfaces.Newable<T>);
  }
}