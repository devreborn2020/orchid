const StoreDesign = {
  general: {
    top_banner_closable: true,
    top_banner_content: "",
    navigation_menus: [
      {
        id: "123",
        title: "Menu",
        type: "page",
        link: "https://orchidui.vercel.app",
        children: [
          {
            id: "123",
            title: "Menu",
            type: "page",
            link: "https://orchidui.vercel.app",
            children: [
              {
                id: "123",
                title: "Menu",
                type: "page",
                link: "https://orchidui.vercel.app",
              },
            ],
          },
        ],
      },
    ],
    banners: [
      {
        id: Date.now(),
        path: "https://hitpay-production.s3.ap-southeast-1.amazonaws.com/products/medium/9a67ae1267ec4d768cde76fbc8fcef29.jpg",
        link: "https://hitpay.shop/hitpayterminal",
      },
    ],
    banners_mobile: [],
    responsive_banner_size: true,
    banner_size: "3,1",
    banner_size_mobile: "1,1",
    footer_company_logo: "",
    footer_content: "",
    footer_link_1_title: "",
    footer_link_1_menus: [],
    footer_link_2_title: "",
    footer_link_2_menus: [],
    footer_social_title: "",
    footer_social_menus: [],
    link_in_bio_enabled: false,
    link_in_bio_icon_links: [],
    link_in_bio_button_links: [],
    // section global
    product_ratio: '1,1'
  },
  sections: [
    {
      group: "styles",
      key: "Styles",
      section: "Styles",
      preset: "default",
      // colors
      background_color: "#FFFFFF",
      text_color: "#03102F",
      folor_heading: "Inter",
      font_body: "Inter",
      // button
      primary_color: "#002771",
      primary_text_color: "#03102F",
      button_rounded: "4",
      // card
      card_rounded: "4",
      card_shadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.12)",
      card_shadow_color: "#03102F",
      card_background_color: "#FFFFFF",
      card_text_color: "#03102F",
      active: true,
    },
    {
      group: "header",
      key: "TopBanner",
      section: "TopBanner",
      background_color: "#FFFFFF",
      text_color: "#03102F",
      active: true,
    },
    {
      group: "header",
      key: "Header",
      section: "Header",
      aligment: "right",
      background_color: "#002771",
      text_color: "#03102F",
      active: true,
    },
    {
      group: "header",
      key: "Banner",
      section: "Banner",
      variant: "MediaOnly",
      width: "full",
      image_width: "half",
      aligment: "text_right",
      banner_title: "",
      description: "",
      button_text: "",
      button_link: "",
      active: true,
    },
    {
      group: "footer",
      key: "FooterContent",
      section: "FooterContent",
      payment_method_logos: [],
      active: true,
      background_color: "#FFFFFF",
      text_color: "#03102F",
    },
    {
      group: "sections",
      key: "product_list_1",
      section: "Products",
      title: "Feature Product",
      product_from: "feature",
      product_column: '4,3,2',
      active: true,
    },
    {
      group: "sections",
      key: "product_list_2",
      section: "Products",
      title: "All Products",
      product_from: "all",
      product_column: '4,3,2',
      active: true,
    },
  ],
};

export { StoreDesign };
