/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AppProps } from "next/app";
import { ChakraProvider, defaultSystem, useDisclosure } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useState } from "react";

interface ErrorState {
  type: string;
  message: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const [error, setError] = useState<ErrorState | null>(null);
  // const { open, onOpen, onClose } = useDisclosure();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (error.status === 401) {
            setError({
              type: "MISSING_TOKEN",
              message: error.data.message,
            });
          }
          if (error.data?.type === "MISSING_TOKEN") {
            setError({ type: error.data.type, message: error.data.message });
          }

          if (error?.message) {
            setError({ type: "ERROR", message: error.message });
          }
          // onOpen();
        },
      },
    },
  });

  return (
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
