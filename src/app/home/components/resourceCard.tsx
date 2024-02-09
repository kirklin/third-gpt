"use client";

import React, { useContext, useRef } from "react";
import { Box, Checkbox, Text } from "@chakra-ui/react";
import { logger } from "@kirklin/logger";
import { H3, RounderBox } from "./primitives";
import type { Site } from "~/services";
import { UserCollectionContext } from "~/app/home/components/content";
import { collectionTableName, getDatabase } from "~/util/indexDB";

interface ResourceCardProps {
  site: Site;
  hasCollectBtn: boolean;
  hasDeleteBtn: boolean;
  checked?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  site,
  hasCollectBtn,
  hasDeleteBtn,
  checked,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { setUserCollection } = useContext(UserCollectionContext);

  const handleCollectionChange = (res: boolean) => {
    if (res) {
      logger.info(checked ? "删除成功" : "添加成功");
      setUserCollection((collection) => {
        const index = collection.findIndex(item => item.name === site.name);
        if (index !== -1) {
          const newCollection = [...collection];
          newCollection.splice(index, 1);
          return newCollection;
        }
        return [...collection, site];
      });
    } else {
      logger.error(checked ? "删除失败" : "添加失败");
    }
  };
  const handleCheckboxChange = () => {
    getDatabase().then((db) => {
      if (!checked) {
        db.write(collectionTableName, site).then(handleCollectionChange);
      } else {
        db.remove(collectionTableName, site.name).then(handleCollectionChange);
      }
    });
  };
  const clickHandle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const linkElement = linkRef.current;
    if (linkElement && event.target !== linkElement) {
      linkElement.click();
    };
  };

  const deleteFromMyCollection = () => {
    getDatabase().then((db) => {
      db.remove(collectionTableName, site.name).then(handleCollectionChange);
    });
  };

  return (
    <RounderBox
      display="flex"
      p="1rem"
      columnGap="1rem"
      _hover={{
        boxShadow: "rgb(0 36 100 / 20%) 0px 26px 20px -24px",
      }}
      transition="all 0.8s"
      cursor="pointer"
      onClick={clickHandle}
      pos="relative"
    >
      {
                site.image
                  ? (
                    <Box flexShrink={0} w="60px">
                      <img
                        src={site.image}
                        alt={site.name}
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </Box>
                    )
                  : <></>
            }
      <Box>
        <H3 fontSize="1rem">
          <a
            ref={linkRef}
            href={site.url}
            target="_blank"
            rel="noreferrer"
          >
            {site.name}
          </a>
        </H3>
        <Text mt="14px" fontSize="14px" color="gray.400">{site.description}</Text>
      </Box>
      {
                hasCollectBtn
                  ? (
                    <Box
                      pos="absolute"
                      right="0.7rem"
                      top="0.7rem"
                      onClick={event => event.stopPropagation()}
                    >
                      <Checkbox
                        cursor="default"
                        isChecked={checked}
                        onChange={handleCheckboxChange}
                      />
                    </Box>
                    )
                  : <></>
            }
      {
                hasDeleteBtn
                  ? (
                    <button
                      className="i-tabler:trash"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteFromMyCollection();
                      }}
                      title="删除"
                    />
                    )
                  : <></>
            }
    </RounderBox>
  );
};

export default ResourceCard;
