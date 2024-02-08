import { Box, HStack } from "@chakra-ui/react";
import Sider from "~/app/home/features/Sider";
import Content from "~/app/home/features/Content";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box>
        <HStack
          alignItems="start"
          columnGap="15px"
          pt="20px"
        >
          <Sider />
          <Content />
        </HStack>
      </Box>
    </main>
  );
}
