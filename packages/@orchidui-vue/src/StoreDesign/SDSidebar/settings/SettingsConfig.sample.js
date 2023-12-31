const ASSETS_URL = "/templates/default/images/";
import {
  TOP_BANNER_FORM,
  HEADER_FORM,
  BANNER_FORM,
} from "./sections/Headers.sample";
import { PRODUCT_FORM, TEXT_AND_IMAGE_FORM } from "./sections/Sections.sample";
import { FOOTER_CONTENT_FORM } from "./sections/Footers.sample";
import { STYLES_FORM } from "./sections/Styles.sample";
import { BUTTON_LINK_FORM, ICON_LINK_FORM } from "./sections/LinkInBio.sample";
const settings = [
  {
    group: "styles",
    key: "Styles",
    section: "Styles",
    title: "Styles",
    isDisable: true,
    form: STYLES_FORM,
  },
  {
    group: "header",
    key: "TopBanner",
    section: "TopBanner",
    title: "Top Banner",
    icon: "top-banner",
    isDisable: true,
    form: TOP_BANNER_FORM,
  },
  {
    group: "header",
    key: "Header",
    section: "Header",
    title: "Header",
    icon: "header",
    isDisable: true,
    form: HEADER_FORM,
  },
  {
    group: "header",
    key: "Banner",
    section: "Banner",
    title: "Banner",
    icon: "banner",
    isDisable: true,
    form: BANNER_FORM,
  },
  {
    group: "sections",
    key: "Products",
    section: "Products",
    title: "Products",
    icon: "tag",
    preview: ASSETS_URL+"products-sections.png",
    form: PRODUCT_FORM,
    canDelete: true,
    default: {
      product_form: "all_product",
      variant: "grid",
    },
  },
  {
    group: "sections",
    key: "TextAndImage",
    section: "TextAndImage",
    title: "Text and Image",
    icon: "tag",
    preview: ASSETS_URL+"products-sections.png",
    form: TEXT_AND_IMAGE_FORM,
    canDelete: true,
    default: {
      variant: "full",
      aligment_half: "left",
      aligment_full: "left",
      images: [],
      title: "Our Story",
      description: "",
      button_text: "Read more",
      button_link: "https://hitpayapp.com"
    },
  },
  {
    group: "footer",
    key: "FooterContent",
    section: "FooterContent",
    title: "Footer Content",
    icon: "footer",
    isDisable: true,
    form: FOOTER_CONTENT_FORM,
  },
  {
    group: "footer",
    key: "PoweredBy",
    section: "PoweredBy",
    title: "Powered By",
    icon: "powered",
    isDisable: true,
  },
  {
    group: "link_in_bio",
    key: "IconLinks",
    section: "IconLinks",
    title: "Icon Links",
    form: ICON_LINK_FORM,
    isDisable: true,
  },
  {
    group: "link_in_bio",
    key: "ButtonLinks",
    section: "ButtonLinks",
    title: "Button Links",
    form: BUTTON_LINK_FORM,
    isDisable: true,
  },
];

export { settings };
