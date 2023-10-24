import {
  Theme,
  Table,
  Chip,
  Icon,
  Toggle,
  TableCellContent,
  Dropdown,
  DropdownItem,
} from "@orchid";

import { ref } from 'vue'


export default {
  component: Table,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    options: {
      isSelectable: true,
      headers: [
        {
          key: "image",
          variant: "image",
          label: "Image",
          class: "w-full md:w-[5%]",
        },
        {
          key: "col1",
          label: "Table Header",
          class: "w-full md:w-[20%]",
        },
        {
          key: "col2",
          label: "Table Header",
          class: "w-full md:w-[10%]",
        },
        {
          key: "col3",
          label: "Table Header",
          isCopy: true,
          class: "w-1/2 md:w-[12%]",
        },
        {
          key: "col4",
          label: "Table Header",
          class: "w-1/2 md:w-[18%]",
        },
        {
          key: "col5",
          label: "Table Header",
          class: "w-3/6 md:w-[12%]",
        },
        {
          key: "col6",
          label: "Header",
          class: "w-2/6 md:w-[8%]",
        },
        {
          key: "actions",
          label: "",
          headerVariant: "text",
          variant: "icon",
          class: "w-1/6 md:w-[5%]",
        },
      ],
      fields: [
        {
          image:
            "https://sportano.ua/img/986c30c27a3d26a3ee16c136f92f4ff5/1/9/195239323706_20-jpg/boksers-ki-krosivki-nike-hyperko-2-olympic-colorway-bili-dj4475-121-581894.jpg",
          title: "Table Cell",
          descriptions: "Table Cell column two",
          col2: "Table Cell",
          col3: "Table Cell ",
          col4: "Table Cell column two",
          col5: "Label",
          col6: false,
        },
        {
          image: "",
          title: "Table Cell",
          descriptions: "Table Cell column two",
          col2: "Table Cell",
          col3: "Table Cell",
          col4: "Table Cell column two",
          col5: "Label",
          col6: false,
        },
        {
          image: "",
          title: "Table Cell",
          descriptions: "Table Cell column two",
          col2: "Table Cell",
          col3: "Table Cell",
          col4: "Table Cell column two",
          col5: "Label",
          col6: false,
        },
        {
          image: "",
          title: "Table Cell",
          descriptions: "Table Cell column two",
          col2: "Table Cell",
          col3: "Table Cell",
          col4: "Table Cell column two",
          col5: "Label",
          col6: false,
        },
        {
          image: "",
          title: "Table Cell",
          descriptions: "Table Cell column two",
          col2: "Table Cell",
          col3: "Table Cell",
          col4: "Table Cell column two",
          col5: "Label",
          col6: false,
        },
      ],
    },
  },
  render: (args) => ({
    components: {
      Table,
      Theme,
      Icon,
      Toggle,
      Chip,
      TableCellContent,
      Dropdown,
      DropdownItem,
    },
    setup() {
      const selectedRows  = ref([])
      return { args, selectedRows };
    },
    template: `
          <Theme>
            {{ selectedRows }}
            <Table v-model="selectedRows" :options="args.options">
              <template #col1="{ item }">
                <TableCellContent important :title="item.title" :description="item.descriptions"/>
              </template>
              <template #col4="{ data }">
                <span class="text-oc-text-400 text-sm">{{ data }}</span>
              </template>
              <template #col5="{ data }">
                <Chip variant="success" class="w-fit" :label="data"/>
              </template>
              <template #col6="{ data }">
                <div class="flex gap-3 items-center">
                  <span class="md:hidden">
                  status
                  </span>
                  <Toggle size="small" v-model="data"/>
                </div>
              </template>
              <template #actions>
                <Icon class="w-6 h-6 group-hover/row:block md:hidden cursor-pointer mx-auto" name="dots-vertical"/>
              </template>
            </Table>
          </Theme>
        `,
  }),
};
