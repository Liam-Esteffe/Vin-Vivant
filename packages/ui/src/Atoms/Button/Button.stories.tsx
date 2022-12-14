import { Button } from "./Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Atoms/Button",
  component: Button,
  argsType: {},
} as ComponentMeta<typeof Button>;

const template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = (args: any) => <Button {...args} />;

Default.args = {
  children: "Button",
};
