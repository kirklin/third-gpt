// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import type { Category } from "~/services";

export function SidebarLinks(props: {
  categories: Category[];
}) {
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const brandColor = useColorModeValue("blue", "white");

  const { categories } = props;
  const [activeResource, setActiveResource] = useState<Category>(categories[0]);

  useEffect(() => {
    const handle = () => {
      for (let i = 0; i < categories.length; i++) {
        const target = document.querySelector(`#${categories[i].name}`);
        if (target && target.getBoundingClientRect().top >= 0) {
          setActiveResource(categories[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handle);

    return () => {
      window.removeEventListener("scroll", handle);
    };
  }, []);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const clickHandle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const linkEle = linkRef.current;
    if (linkEle && event.target !== linkEle) {
      linkEle.click();
    }
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (itemName: string) => {
    return activeResource.name === itemName;
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (
    categories: Category[],
  ) => {
    return categories.map(
      (
        categorie,
        index: number,
      ) => {
        return (
          <span key={index} className="cursor-pointer" onClick={clickHandle}>
            <Box>
              <HStack
                spacing={activeRoute(categorie.name) ? "22px" : "26px"}
                py="5px"
                ps="10px"
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  {categorie.icon
                    ? (
                      <img
                        src={categorie.icon}
                        height={20}
                        width={20}
                        alt={categorie.name}
                        className="mr-4"
                        loading="lazy"
                      />
                      )
                    : (
                      <>
                      </>
                      )}
                  <Text
                    me="auto"
                    color={textColor}
                    fontWeight={activeRoute(categorie.name) ? "bold" : "normal"}
                  >
                    <a ref={linkRef} href={`#${categorie.name}`}>
                      {categorie.name}
                    </a>
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  bg={activeRoute(categorie.name) ? brandColor : "transparent"}
                  borderRadius="5px"
                />
              </HStack>
            </Box>
          </span>
        );
      },
    );
  };
  //  BRAND
  return <>{createLinks(categories)}</>;
}

export default SidebarLinks;
