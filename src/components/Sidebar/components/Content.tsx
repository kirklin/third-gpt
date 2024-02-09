import { Box, Flex, Stack } from "@chakra-ui/react";
import Links from "./Links";
import type { Category } from "~/services";

function SidebarContent(props: { categories: Category[] }) {
  const { categories } = props;
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Stack direction="column" mt="8px" mb="auto">
        <Box ps="20px">
          <Links categories={categories} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
