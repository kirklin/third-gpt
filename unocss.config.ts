import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
import { defineConfig } from "@unocss/webpack";
import presetChinese from "unocss-preset-chinese";
import presetEase from "unocss-preset-ease";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media",
    }),
    presetAttributify(),
    presetChinese(),
    presetEase(),
    presetIcons({
      scale: 1.5,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
