import type { Schema, Struct } from '@strapi/strapi';

export interface ActivityActivityObjectiveItem extends Struct.ComponentSchema {
  collectionName: 'components_activity_activity_objective_items';
  info: {
    displayName: 'Activity Objective Item';
    icon: 'dot-circle';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ActivityActivityProgramItem extends Struct.ComponentSchema {
  collectionName: 'components_activity_activity_program_items';
  info: {
    displayName: 'Activity Program Item';
    icon: 'clock';
  };
  attributes: {
    time: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_infos';
  info: {
    displayName: 'Contact Info';
    icon: 'map';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    hours: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
  };
}

export interface ContactContactOption extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_options';
  info: {
    displayName: 'Contact Option';
    icon: 'phone';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconKey: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContributeAchievementItem extends Struct.ComponentSchema {
  collectionName: 'components_contribute_achievement_items';
  info: {
    displayName: 'Achievement Item';
    icon: 'check-circle';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContributeContributionWay extends Struct.ComponentSchema {
  collectionName: 'components_contribute_contribution_ways';
  info: {
    displayName: 'Contribution Way';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconKey: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String;
  };
}

export interface ContributeDonationTier extends Struct.ComponentSchema {
  collectionName: 'components_contribute_donation_tiers';
  info: {
    displayName: 'Donation Tier';
    icon: 'donate';
  };
  attributes: {
    amountLabel: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    isPopular: Schema.Attribute.Boolean;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContributeFundAllocation extends Struct.ComponentSchema {
  collectionName: 'components_contribute_fund_allocations';
  info: {
    description: "\u00C9l\u00E9ment du graphique circulaire montrant l'allocation des fonds";
    displayName: 'Fund Allocation';
    icon: 'pie-chart';
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#10b981'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    percentage: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
  };
}

export interface ContributePaymentMethod extends Struct.ComponentSchema {
  collectionName: 'components_contribute_payment_methods';
  info: {
    displayName: 'Payment Method';
    icon: 'credit-card';
  };
  attributes: {
    image: Schema.Attribute.Media;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContributeTransparencyItem extends Struct.ComponentSchema {
  collectionName: 'components_contribute_transparency_items';
  info: {
    displayName: 'Transparency Item';
    icon: 'shield-check';
  };
  attributes: {
    iconKey: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DomainDomainActionItem extends Struct.ComponentSchema {
  collectionName: 'components_domain_domain_action_items';
  info: {
    displayName: 'Domain Action Item';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface JoinJoinBenefit extends Struct.ComponentSchema {
  collectionName: 'components_join_join_benefits';
  info: {
    displayName: 'Join Benefit';
    icon: 'smile';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconKey: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface JoinJoinMicroTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_join_join_micro_testimonials';
  info: {
    displayName: 'Join Micro Testimonial';
    icon: 'quote';
  };
  attributes: {
    image: Schema.Attribute.Media;
    personName: Schema.Attribute.String & Schema.Attribute.Required;
    personRole: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface JoinJoinOpportunity extends Struct.ComponentSchema {
  collectionName: 'components_join_opportunities';
  info: {
    displayName: 'Join Opportunity';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media;
    points: Schema.Attribute.Text;
    tags: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String;
  };
}

export interface JoinJoinProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_join_join_process_steps';
  info: {
    displayName: 'Join Process Step';
    icon: 'list-ol';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconKey: Schema.Attribute.String;
    stepOrder: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_navigation_links';
  info: {
    displayName: 'Navigation Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'Stat Item';
    icon: 'number';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'Tag';
    icon: 'tag';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    displayName: 'Value';
    icon: 'star';
  };
  attributes: {
    iconKey: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'activity.activity-objective-item': ActivityActivityObjectiveItem;
      'activity.activity-program-item': ActivityActivityProgramItem;
      'contact.contact-info': ContactContactInfo;
      'contact.contact-option': ContactContactOption;
      'contribute.achievement-item': ContributeAchievementItem;
      'contribute.contribution-way': ContributeContributionWay;
      'contribute.donation-tier': ContributeDonationTier;
      'contribute.fund-allocation': ContributeFundAllocation;
      'contribute.payment-method': ContributePaymentMethod;
      'contribute.transparency-item': ContributeTransparencyItem;
      'domain.domain-action-item': DomainDomainActionItem;
      'join.join-benefit': JoinJoinBenefit;
      'join.join-micro-testimonial': JoinJoinMicroTestimonial;
      'join.join-opportunity': JoinJoinOpportunity;
      'join.join-process-step': JoinJoinProcessStep;
      'navigation.navigation-link': NavigationNavigationLink;
      'shared.faq-item': SharedFaqItem;
      'shared.stat-item': SharedStatItem;
      'shared.tag': SharedTag;
      'shared.value': SharedValue;
    }
  }
}
