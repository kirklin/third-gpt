"use client";

import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { logger } from "@kirklin/logger";
import ResourcePanel from "./resourcePanel";
import { collectionTableName, getDatabase, isIndexedDBSupported } from "~/util/indexDB";
import type { Category, Site } from "~/services";
import { categoriesData } from "~/services";
import { H2 } from "~/app/home/components/primitives";

export const UserCollectionContext = React.createContext<{
  setUserCollection: React.Dispatch<React.SetStateAction<Site[]>>;
}>({
  setUserCollection: () => { },
});

function Content() {
  const [userCollection, setUserCollection] = useState<Site[]>([]);
  const toast = useToast();

  const updateMyCollection = () => {
    if (isIndexedDBSupported()) {
      getDatabase().then((db) => {
        db.readAll(collectionTableName).then(((res) => {
          if (res) {
            setUserCollection(res as Site[]);
          }
        }));
      });
    }
  };

  useEffect(() => {
    updateMyCollection();
  }, []);

  const userCategory: Category = {
    name: "我的收藏",
    sites: userCollection,
    icon: "",
  };

  const importMyCollection = () => {
    const elem = document.createElement("input");
    elem.setAttribute("type", "file");
    elem.addEventListener("change", (event: any) => {
      if (event.target.files.length !== 1) {
        logger.info("No file selected");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const user = JSON.parse(reader.result?.toString() as string);
          getDatabase().then((db) => {
            if (Array.isArray(user)) {
              const writePromises: Promise<boolean>[] = [];
              user.forEach((item) => {
                writePromises.push(db.write(collectionTableName, item));
              });
              Promise.allSettled(writePromises).then(() => {
                toast({
                  title: "导入完成",
                  status: "success",
                  duration: 1000,
                });
                updateMyCollection();
              });
            } else {
              toast({
                title: "导入失败, 文件格式错误",
                status: "error",
                duration: 2000,
              });
            }
          });
        };

        reader.readAsText(event.target.files[0]);
      }
    });

    elem.click();
  };

  const exportMyCollectionToLocal = () => {
    const blob = new Blob([JSON.stringify([userCollection], null, 2)], { type: "application/json;charset=utf-8" }).slice(2, -1);
    const url = URL.createObjectURL(blob);
    const elem = document.createElement("a");
    elem.href = url;
    elem.download = "我的收藏.json";
    elem.click();
  };

  return (
    <Box className="page-wrapper rounded-2xl w-full h-full min-h-full overflow-y-scroll overflow-x-hidden">
      <UserCollectionContext.Provider value={{ setUserCollection }}>
        <VStack
          className="p-4"
          alignItems="stretch"
          rowGap="30px"
          display="inline-flex"
          pos="relative"
        >
          <HStack
            right="10px"
            top="10px"
          >
            <button
              w="22px"
              cursor="pointer"
              title="导入"
              onClick={importMyCollection}
            />
            <button
              src="./export.svg"
              w="22px"
              cursor="pointer"
              title="导出"
              onClick={exportMyCollectionToLocal}
            />
          </HStack>
          <ResourcePanel
            key={userCategory.name}
            resource={userCategory}
            hasCollectBtn={false}
            hasDeleteBtn
            userCollection={userCollection}
          />
          {
          categoriesData.map(item => (<ResourcePanel key={item.name} userCollection={userCollection} resource={item} hasDeleteBtn={false} hasCollectBtn />))
                }
          <div>
            <Box flexGrow={1} alignSelf="stretch" pt="50px">
              <VStack alignItems="flex-start" fontSize="16px" pb={5}>
                <H2 fontSize="16px" mb="15px">关于Third GPT</H2>
                <Text>
                  Third GPT是一个关于人工智能（AI）、GPT模型和ChatGPT的导航网站，旨在为用户提供最新的AI技术资讯和资源。
                </Text>
              </VStack>
              <VStack alignItems="flex-start" fontSize="16px">
                <H2 fontSize="16px" mb="15px">我的收藏:</H2>
                <Text>
                  在我的收藏面板中，您可以存储您喜欢的网站，但请注意，这些内容仅存储在您当前浏览器的本地，因此更换电脑或者浏览器时，数据将不会同步。您可以通过点击卡片右上角的复选框将喜欢的网站添加至我的收藏。
                </Text>
              </VStack>
            </Box>
          </div>
        </VStack>
      </UserCollectionContext.Provider>
    </Box>
  );
}

export default Content;
