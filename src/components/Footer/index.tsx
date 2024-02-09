import { Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Text color="#999999" fontSize="1rem" className="mb-4 text-center">
      <span>© by </span>
      <a href="https://kirklin.cn" target="_blank" rel="noreferrer">Kirk Lin</a>
      <span> & Developed by </span>
      <a href="https://kirklin.cn" target="_blank" rel="noreferrer">Kirk Lin</a>
    </Text>
  );
}
