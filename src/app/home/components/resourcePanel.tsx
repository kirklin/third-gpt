import type { PropsWithChildren } from "react";
import React from "react";
import { Box, Grid, Image } from "@chakra-ui/react";
import { H2, RounderBox } from "./primitives";
import ResourceCard from "./resourceCard";
import type { Category, Site } from "~/services";

interface ResourcePanelProps {
  resource: Category;
  hasCollectBtn: boolean;
  hasDeleteBtn: boolean;
  userCollection: Site[];
  empty?: React.ReactNode;
}

const ResourcePanel: React.FC<PropsWithChildren<ResourcePanelProps>> = ({
  resource,
  hasCollectBtn,
  hasDeleteBtn,
  empty,
  userCollection,
}) => {
  const emptyNode = empty ?? (
    <RounderBox
      display="flex"
      justifyContent="center"
    >
      <Image
        src="./empty.png"
        h="6rem"
      />
    </RounderBox>
  );

  return (
    <Box>
      <H2
        fontSize="1rem"
        mb="1rem"
        id={resource.name}
      >
        {resource.name}
      </H2>
      <Grid
        rowGap="1rem"
        columnGap="1rem"
        gridTemplateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(5, 1fr)"]}
      >
        {
                    resource.sites.map(site => (
                      <ResourceCard
                        key={site.name}
                        site={site}
                        hasDeleteBtn={hasDeleteBtn}
                        hasCollectBtn={hasCollectBtn}
                        checked={userCollection.findIndex(item => item.name === site.name) !== -1}
                      />
                    ))
                }
        {resource.sites.length === 0 ? emptyNode : <></>}
      </Grid>
    </Box>
  );
};

export default ResourcePanel;
