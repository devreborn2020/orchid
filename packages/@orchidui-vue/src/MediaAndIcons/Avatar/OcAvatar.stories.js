import Avatar from "./OcAvatar.vue";
import Theme from "../../Theme/OcTheme.vue";
import { ref } from "vue";

export default {
  component: Avatar,
  tags: ["autodocs"],
};

export const Default = {
  argTypes: {
    type: {
      control: "select",
      options: ["default", "business", "image"],
    },
    size: {
      control: "select",
      options: [24, 32, 40, 48, 64],
    },
  },
  args: {
    size: 32,
    type: "default",
  },
  render: (args) => ({
    components: { Avatar, Theme },
    setup() {
      return {
        args,
      };
    },
    template: `
          <Theme>
            <div class="w-full h-[400px] flex items-center justify-center">
              <Avatar :size="args.size" :type="args.type">H</Avatar>
            </div>
          </Theme>
        `,
  }),
};
export const Sizes = {
  render: () => ({
    components: { Avatar, Theme },
    setup() {
      const sizes = ref([64, 48, 40, 32, 24]);
      return {
        sizes,
      };
    },
    template: `
          <Theme>
            <div class="w-full flex gap-x-6">
              <div class="flex flex-col gap-y-4">
                <Avatar v-for="size in sizes" :key="size" :size="size">H</Avatar>
              </div>
              <div class="flex flex-col gap-y-4">
                <Avatar v-for="size in sizes" :key="size" :size="size" type="business">H</Avatar>
              </div>
              <div class="flex flex-col gap-y-4">
                <Avatar v-for="size in sizes" :key="size" :size="size" type="image">H</Avatar>
              </div>
            </div>
          </Theme>
        `,
  }),
};
