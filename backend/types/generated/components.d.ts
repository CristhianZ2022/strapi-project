import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentDiscountLaw extends Struct.ComponentSchema {
  collectionName: 'components_component_discount_laws';
  info: {
    displayName: 'discountLaw';
  };
  attributes: {
    disability: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    oldAge: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface ComponentReferences extends Struct.ComponentSchema {
  collectionName: 'components_component_references';
  info: {
    displayName: 'references';
  };
  attributes: {
    fullnames: Schema.Attribute.String;
    identificacion: Schema.Attribute.String;
    phone: Schema.Attribute.BigInteger;
    relationship: Schema.Attribute.String;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'alien';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'component.link', false>;
    subHeading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.discount-law': ComponentDiscountLaw;
      'component.link': ComponentLink;
      'component.references': ComponentReferences;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}
