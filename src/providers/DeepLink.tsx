import React, {
  useState,
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { InteractionManager } from 'react-native';

import { navigationRef } from '../navigation/linking';

export interface IDeepLink {
  id: string;
  type: DeepLinkEnum;
  action: () => void | Promise<void>;
}

export type DeepLinkContextType = {
  deepLinksState: IDeepLink[];
  addDeepLink: (link: IDeepLink) => void;
  removeDeepLink: (id: string) => void;
};

export const DeepLinkContext = createContext<DeepLinkContextType>({
  deepLinksState: [],
  addDeepLink: () => {},
  removeDeepLink: () => {},
});

export const DeepLinkProvider: FunctionComponent<unknown> = ({ children }) => {
  const [deepLinksState, setDeepLinksState] = useState<IDeepLink[]>([]);

  const addDeepLink = useCallback((link: IDeepLink) => {
    setDeepLinksState((prevDeepLinks) => [...prevDeepLinks, link]);
  }, []);

  const removeDeepLink = useCallback((id: string) => {
    setDeepLinksState((prevDeepLinks) =>
      prevDeepLinks.filter((link) => link.id !== id)
    );
  }, []);

  return (
    <DeepLinkContext.Provider
      value={{ deepLinksState, addDeepLink, removeDeepLink }}
    >
      {children}
    </DeepLinkContext.Provider>
  );
};

// eslint-disable-next-line no-shadow
export enum DeepLinkEnum {
  NAVIGATION = 'NAVIGATION',
}

export const useDeepLinks = (deepLinks?: DeepLinkEnum[]) => {
  const [hookRoute, setHookRoute] = useState<string>();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const { deepLinksState, addDeepLink, removeDeepLink } =
    useContext(DeepLinkContext);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      const route = navigationRef.current?.getCurrentRoute();
      if (!hookRoute) {
        setHookRoute(route?.name);
      }
    });

    const handleNavigationStateChange = () => {
      setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name);
    };

    navigationRef.current?.addListener('state', handleNavigationStateChange);

    return () => {
      task.cancel();
      navigationRef.current?.removeListener(
        'state',
        handleNavigationStateChange
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      if (!deepLinks || hookRoute !== currentRoute) {
        return;
      }

      const cLink = deepLinksState.find(({ type }) => deepLinks.includes(type));
      if (!cLink) {
        return;
      }

      await cLink.action();
      removeDeepLink(cLink.id);
    })();
  }, [deepLinksState, hookRoute, currentRoute]); // eslint-disable-line react-hooks/exhaustive-deps

  return { addDeepLink };
};
