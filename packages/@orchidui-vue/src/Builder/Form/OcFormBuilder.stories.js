import {
  Theme,
  FormBuilder,
  Button,
  Input,
  Dropdown,
  DropdownItem,
  Icon,
} from "@orchid";

import { SampleJsonForm } from "../../data/JsonForm";
export default {
  component: FormBuilder,
};

export const Default = {
  args: {
    values: {
      card_input: "",
      custom_form_input: "",
    },
    errors: {
      card_input: "",
    },
  },
  render: (args) => ({
    components: {
      Theme,
      FormBuilder,
      Button,
      Input,
      Dropdown,
      DropdownItem,
      Icon,
    },
    setup() {
      const onUpdateForm = (name, value = null) => {
        // validate value
        // key / form fields
        // if key null validate all form
        console.log(name, value);
        args.values[name] = value;
        // check if valid
        args.errors[name] = "invalid input";
      };

      return { args, onUpdateForm, SampleJsonForm };
    },
    template: `
          <Theme class="p-8">
            <div class="grid md:grid-cols-2 gap-5 mb-5">
            <p>
              Values : {{ args.values }}
              </p>
              <p>
              Errors : {{ args.errors }}
              </p>
            </div>
           <FormBuilder 
              class="grid md:grid-cols-2 gap-5"
              :errors="args.errors" 
              :values="args.values" 
              :json-form="SampleJsonForm" 
              @onUpdate="onUpdateForm"
            >
            <template #CustomFormInput="{form, value, error}" >
                  <div class="flex items-center md:col-span-2 border-2 p-3">
                      <label class="mr-3">This custom form input</label>
                      <Button 
                        @click="onUpdateForm(form.name, '1')">Set Value to (1)</Button>
                      <span>
                        {{ error }}
                      </span>
                  </div>
            </template>
            <template #CustomFormInput2="{form, value, error}">
                <Input 
                    label="Custom Form Input 2" 
                    hint="This is a hint text to help user"
                    :model-value="value"
                    :error-message="error"
                    @update:model-value="onUpdateForm(form.name, $event)"
                    >
                    <template #trailing>
                      <Dropdown>
                        <template #default="{close}">
                          <div class="flex p-2 flex-col">
                            <DropdownItem text="Menu" icon="pencil" @click="close"/>
                            <DropdownItem text="Menu" icon="pencil" @click="close"/>
                            <DropdownItem text="Menu" icon="pencil" @click="close"/>
                          </div>
                        </template>
                        <template #trigger>
                          <div
                              class=" text-sm font-medium flex items-center gap-x-2 text-oc-text-400"
                          >
                            <span class="flex items-center text-sm">USD</span>
                            <Icon class="w-[14px] h-[14px]" name="chevron-down"/>
                          </div>
                        </template>
                      </Dropdown>
                    </template>
                  </Input>
            </template>
           </FormBuilder>
          </Theme>
        `,
  }),
};
