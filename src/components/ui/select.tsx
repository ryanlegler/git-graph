'use client';

import { Select as ArkSelect } from '@ark-ui/react/select';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';
import { select } from 'styled-system/recipes';
import { createStyleContext } from '@lib/create-style-context';

const { withProvider, withContext } = createStyleContext(select);

const Select = withProvider(styled(ArkSelect.Root), 'root');
const SelectClearTrigger = withContext(styled(ArkSelect.ClearTrigger), 'clearTrigger');
const SelectContent = withContext(styled(ArkSelect.Content), 'content');
const SelectControl = withContext(styled(ArkSelect.Control), 'control');
const SelectIndicator = withContext(styled(ArkSelect.Indicator), 'indicator');
const SelectItem = withContext(styled(ArkSelect.Item), 'item');
const SelectItemGroup = withContext(styled(ArkSelect.ItemGroup), 'itemGroup');
const SelectItemGroupLabel = withContext(styled(ArkSelect.ItemGroupLabel), 'itemGroupLabel');
const SelectItemIndicator = withContext(styled(ArkSelect.ItemIndicator), 'itemIndicator');
const SelectItemText = withContext(styled(ArkSelect.ItemText), 'itemText');
const SelectLabel = withContext(styled(ArkSelect.Label), 'label');
const SelectPositioner = withContext(styled(ArkSelect.Positioner), 'positioner');
const SelectTrigger = withContext(styled(ArkSelect.Trigger), 'trigger');
const SelectValueText = withContext(styled(ArkSelect.ValueText), 'valueText');

const Root = Select;
const ClearTrigger = SelectClearTrigger;
const Content = SelectContent;
const Control = SelectControl;
const Indicator = SelectIndicator;
const Item = SelectItem;
const ItemGroup = SelectItemGroup;
const ItemGroupLabel = SelectItemGroupLabel;
const ItemIndicator = SelectItemIndicator;
const ItemText = SelectItemText;
const Label = SelectLabel;
const Positioner = SelectPositioner;
const Trigger = SelectTrigger;
const ValueText = SelectValueText;

export {
    ClearTrigger,
    Content,
    Control,
    Indicator,
    Item,
    ItemGroup,
    ItemGroupLabel,
    ItemIndicator,
    ItemText,
    Label,
    Positioner,
    Root,
    Select,
    SelectClearTrigger,
    SelectContent,
    SelectControl,
    SelectIndicator,
    SelectItem,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
    Trigger,
    ValueText,
};

export interface SelectProps extends ComponentProps<typeof Select> {}
export interface SelectClearTriggerProps extends ComponentProps<typeof SelectClearTrigger> {}
export interface SelectContentProps extends ComponentProps<typeof SelectContent> {}
export interface SelectControlProps extends ComponentProps<typeof SelectControl> {}
export interface SelectIndicatorProps extends ComponentProps<typeof SelectIndicator> {}
export interface SelectItemProps extends ComponentProps<typeof SelectItem> {}
export interface SelectItemGroupProps extends ComponentProps<typeof SelectItemGroup> {}
export interface SelectItemGroupLabelProps extends ComponentProps<typeof SelectItemGroupLabel> {}
export interface SelectItemIndicatorProps extends ComponentProps<typeof SelectItemIndicator> {}
export interface SelectItemTextProps extends ComponentProps<typeof SelectItemText> {}
export interface SelectLabelProps extends ComponentProps<typeof SelectLabel> {}
export interface SelectPositionerProps extends ComponentProps<typeof SelectPositioner> {}
export interface SelectTriggerProps extends ComponentProps<typeof SelectTrigger> {}
export interface SelectValueTextProps extends ComponentProps<typeof SelectValueText> {}

// styles
// src/theme/recipes/select.ts
// import { selectAnatomy } from "@ark-ui/anatomy";
// import { defineSlotRecipe as defineSlotRecipe24 } from "@pandacss/dev";
// var select = defineSlotRecipe24({
//   className: "select",
//   slots: selectAnatomy.keys(),
//   base: {
//     root: {
//       colorPalette: "accent",
//       display: "flex",
//       flexDirection: "column",
//       gap: "1.5",
//       width: "full"
//     },
//     content: {
//       background: "bg.default",
//       borderRadius: "l2",
//       boxShadow: "lg",
//       display: "flex",
//       flexDirection: "column",
//       zIndex: "dropdown",
//       _hidden: {
//         display: "none"
//       },
//       _open: {
//         animation: "fadeIn 0.25s ease-out"
//       },
//       _closed: {
//         animation: "fadeOut 0.2s ease-out"
//       },
//       _focusVisible: {
//         outlineOffset: "2px",
//         outline: "2px solid",
//         outlineColor: "border.outline"
//       }
//     },
//     item: {
//       alignItems: "center",
//       borderRadius: "l1",
//       cursor: "pointer",
//       display: "flex",
//       justifyContent: "space-between",
//       transitionDuration: "fast",
//       transitionProperty: "background, color",
//       transitionTimingFunction: "default",
//       _hover: {
//         background: "gray.a3",
//         color: "fg.default"
//       },
//       _highlighted: {
//         background: "gray.a3",
//         color: "fg.default"
//       },
//       _selected: {
//         color: "fg.default"
//       },
//       _disabled: {
//         color: "fg.disabled",
//         cursor: "not-allowed",
//         _hover: {
//           background: "transparent"
//         }
//       }
//     },
//     itemGroupLabel: {
//       fontWeight: "semibold",
//       textStyle: "sm"
//     },
//     itemIndicator: {
//       color: "colorPalette.default"
//     },
//     label: {
//       color: "fg.default",
//       fontWeight: "medium"
//     },
//     trigger: {
//       appearance: "none",
//       alignItems: "center",
//       borderColor: "border.default",
//       borderRadius: "l2",
//       cursor: "pointer",
//       color: "fg.default",
//       display: "inline-flex",
//       justifyContent: "space-between",
//       outline: 0,
//       position: "relative",
//       transitionDuration: "normal",
//       transitionProperty: "background, box-shadow, border-color",
//       transitionTimingFunction: "default",
//       width: "full",
//       _placeholderShown: {
//         color: "fg.subtle"
//       },
//       "& :where(svg)": {
//         color: "fg.subtle"
//       }
//     }
//   },
//   defaultVariants: {
//     size: "md",
//     variant: "outline"
//   },
//   variants: {
//     variant: {
//       outline: {
//         trigger: {
//           borderWidth: "1px",
//           _focus: {
//             borderColor: "colorPalette.default",
//             boxShadow: "0 0 0 1px var(--colors-color-palette-default)"
//           }
//         }
//       },
//       ghost: {
//         trigger: {
//           _hover: {
//             background: "gray.a3"
//           },
//           _focus: {
//             background: "gray.a3"
//           }
//         }
//       }
//     },
//     size: {
//       sm: {
//         content: { p: "0.5", gap: "1" },
//         item: { textStyle: "sm", px: "2", height: "9" },
//         itemIndicator: {
//           "& :where(svg)": {
//             width: "4",
//             height: "4"
//           }
//         },
//         itemGroupLabel: {
//           px: "2",
//           py: "1.5"
//         },
//         label: { textStyle: "sm" },
//         trigger: {
//           px: "2.5",
//           h: "9",
//           minW: "9",
//           fontSize: "sm",
//           gap: "2",
//           "& :where(svg)": {
//             width: "4",
//             height: "4"
//           }
//         }
//       },
//       md: {
//         content: { p: "1", gap: "1" },
//         item: { textStyle: "md", px: "2", height: "10" },
//         itemIndicator: {
//           "& :where(svg)": {
//             width: "4",
//             height: "4"
//           }
//         },
//         itemGroupLabel: {
//           px: "2",
//           py: "1.5"
//         },
//         label: { textStyle: "sm" },
//         trigger: {
//           px: "3",
//           h: "10",
//           minW: "10",
//           fontSize: "md",
//           gap: "2",
//           "& :where(svg)": {
//             width: "4",
//             height: "4"
//           }
//         }
//       },
//       lg: {
//         content: { p: "1.5", gap: "1" },
//         item: { textStyle: "md", px: "2", height: "11" },
//         itemIndicator: {
//           "& :where(svg)": {
//             width: "5",
//             height: "5"
//           }
//         },
//         itemGroupLabel: {
//           px: "2",
//           py: "1.5"
//         },
//         label: { textStyle: "sm" },
//         trigger: {
//           px: "3.5",
//           h: "11",
//           minW: "11",
//           fontSize: "md",
//           gap: "2",
//           "& :where(svg)": {
//             width: "5",
//             height: "5"
//           }
//         }
//       }
//     }
//   }
// });
