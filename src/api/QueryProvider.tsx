import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient(
  {
    defaultOptions : {
      queries:{
        retry:false
      }
    }
  }
);

interface QueryClientProviderProps {
  children: ReactNode;
}

const QueryProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
