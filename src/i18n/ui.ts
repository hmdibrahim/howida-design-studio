export const languages = {
  en: 'English',
  ar: 'العربية',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

interface Dictionary {
  meta: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
    bookConsultation: string;
    switchLang: string;
    menuOpen: string;
    menuClose: string;
  };
  common: {
    skipToContent: string;
    readMore: string;
    learnMore: string;
    viewAllServices: string;
    ourServices: string;
    call: string;
    email: string;
    location: string;
    servingAllUae: string;
    backToServices: string;
    allServices: string;
  };
  footer: {
    tagline: string;
    companyHeading: string;
    servicesHeading: string;
    contactHeading: string;
    rights: string;
    addressLine: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    aboutKicker: string;
    aboutTitle: string;
    aboutBody: string;
    aboutCta: string;
    servicesKicker: string;
    servicesTitle: string;
    servicesSubtitle: string;
    portfolio: {
      kicker: string;
      title: string;
      subtitle: string;
      items: { category: string }[];
      cta: string;
    };
    whyKicker: string;
    whyTitle: string;
    whyItems: { title: string; body: string }[];
    processKicker: string;
    processTitle: string;
    processSteps: { title: string; body: string }[];
    coverageTitle: string;
    coverageBody: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  about: {
    kicker: string;
    title: string;
    introLead: string;
    introBody: string;
    valuesKicker: string;
    valuesTitle: string;
    values: { title: string; body: string }[];
    approachKicker: string;
    approachTitle: string;
    coverageTitle: string;
    coverageBody: string;
    ctaTitle: string;
    ctaButton: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    featuresTitle: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    otherServices: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    privacyNote: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    errorRequired: string;
    errorEmail: string;
    errorPhone: string;
    errorMessage: string;
    infoTitle: string;
    phoneLabelInfo: string;
    emailLabelInfo: string;
    locationLabelInfo: string;
    hoursLabel: string;
    hoursValue: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
}

export const ui: Record<Lang, Dictionary> = {
  en: {
    meta: {
      siteName: 'Howida design studio',
      defaultTitle: 'Howida design studio — Interior Design Studio in Abu Dhabi, UAE',
      defaultDescription:
        'Howida design studio provides interior design, 3D visualization, space planning and turnkey fit-out services for residential and commercial projects across the UAE.',
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      bookConsultation: 'Book a Consultation',
      switchLang: 'العربية',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    common: {
      skipToContent: 'Skip to content',
      readMore: 'Read more',
      learnMore: 'Learn more',
      viewAllServices: 'View all services',
      ourServices: 'Our Services',
      call: 'Call',
      email: 'Email',
      location: 'Location',
      servingAllUae: 'Our services are available across the United Arab Emirates.',
      backToServices: 'Back to services',
      allServices: 'All services',
    },
    footer: {
      tagline: 'Designing spaces that inspire.',
      companyHeading: 'Studio',
      servicesHeading: 'Services',
      contactHeading: 'Contact',
      rights: 'All rights reserved.',
      addressLine: 'Abu Dhabi, United Arab Emirates',
    },
    home: {
      heroKicker: 'Interior Design Studio · Abu Dhabi, UAE',
      heroTitle: 'Designing spaces that inspire.',
      heroSubtitle:
        'Howida design studio provides complete interior design and execution services for residential and commercial projects, from first concept to final handover.',
      heroCtaPrimary: 'Book a Consultation',
      heroCtaSecondary: 'View Our Services',
      aboutKicker: 'About the studio',
      aboutTitle: 'Every space deserves a design that reflects the people who use it.',
      aboutBody:
        'We provide complete interior design and execution services for residential and commercial projects, delivering thoughtful designs, quality craftsmanship and exceptional attention to detail.',
      aboutCta: 'More about us',
      servicesKicker: 'What we do',
      servicesTitle: 'Our Services',
      servicesSubtitle:
        'From the first sketch to final handover, we offer eight specialised services that can be booked individually or combined into a single managed project.',
      portfolio: {
        kicker: 'Selected Work',
        title: 'A Portfolio of Considered Interiors',
        subtitle: 'A look at the range of spaces we design and deliver across the UAE.',
        items: [
          { category: 'Living Spaces' },
          { category: 'Kitchens & Dining' },
          { category: 'Bedrooms & Suites' },
          { category: 'Commercial Interiors' },
          { category: 'Villas & Exteriors' },
          { category: 'Office Fit-Outs' },
        ],
        cta: 'View Our Services',
      },
      whyKicker: 'Why Howida design studio',
      whyTitle: 'A considered approach, from concept to handover',
      whyItems: [
        {
          title: 'One point of responsibility',
          body: 'Design and execution are managed together, so decisions made on paper carry through to the finished space.',
        },
        {
          title: 'Detail-led design',
          body: 'Layouts, materials and lighting are planned as one system, not a series of separate choices.',
        },
        {
          title: 'Clear communication',
          body: 'You always know what stage your project is at, with documented site visits and progress updates.',
        },
        {
          title: 'UAE-wide coverage',
          body: 'Based in Abu Dhabi and available for residential and commercial projects across the Emirates.',
        },
      ],
      processKicker: 'How we work',
      processTitle: 'A clear process, start to finish',
      processSteps: [
        { title: 'Consult', body: 'We discuss your goals, budget and timeline, and assess the space.' },
        { title: 'Design', body: 'Concept, layout, materials and 3D visualization are developed and approved.' },
        { title: 'Execute', body: 'Fit-out and construction works are coordinated and supervised on site.' },
        { title: 'Handover', body: 'A final snagging walkthrough before the space is handed over to you.' },
      ],
      coverageTitle: 'Serving projects across the UAE',
      coverageBody:
        'Based in Abu Dhabi, our team works on residential and commercial interior projects throughout the United Arab Emirates.',
      ctaTitle: 'Ready to start your project?',
      ctaSubtitle: 'Tell us about your space and we will get back to you to arrange a consultation.',
      ctaButton: 'Get in Touch',
    },
    about: {
      kicker: 'About Us',
      title: 'About Howida design studio',
      introLead:
        'At Howida design studio, we believe every space deserves a design that reflects its owner’s personality and lifestyle.',
      introBody:
        'We provide complete interior design and execution services for residential and commercial projects, with careful attention to detail to ensure high quality and results that exceed expectations. From the first conversation about how you live or work, through to the final styling details, our team stays involved at every stage so the finished space is a genuine reflection of the people who use it.',
      valuesKicker: 'What guides our work',
      valuesTitle: 'Our values',
      values: [
        {
          title: 'Personalised design',
          body: 'No two clients live or work the same way, so no two projects follow the same template.',
        },
        {
          title: 'Quality craftsmanship',
          body: 'We work with trusted contractors and suppliers and check finished work against the approved specification.',
        },
        {
          title: 'Attention to detail',
          body: 'From layout to the smallest finish, details are planned deliberately rather than left to chance.',
        },
        {
          title: 'Single point of responsibility',
          body: 'One team stays accountable for the project from concept through to handover.',
        },
      ],
      approachKicker: 'How we work',
      approachTitle: 'Our approach',
      coverageTitle: 'Based in Abu Dhabi, working across the UAE',
      coverageBody:
        'Our studio is based in Abu Dhabi, and our services are available across the United Arab Emirates for both residential and commercial projects.',
      ctaTitle: 'Let’s talk about your space',
      ctaButton: 'Contact the Studio',
    },
    services: {
      kicker: 'Our Services',
      title: 'Services',
      subtitle:
        'Eight specialised services covering design, visualization and execution, available individually or as a complete turnkey project.',
      featuresTitle: 'What this includes',
      ctaTitle: 'Interested in this service?',
      ctaBody: 'Tell us about your project and we will get back to you to discuss the next steps.',
      ctaButton: 'Book a Consultation',
      otherServices: 'Other services',
    },
    contact: {
      kicker: 'Get in Touch',
      title: 'Contact Us',
      subtitle:
        'For inquiries and consultations, feel free to contact us anytime. Tell us about your project and we will get back to you shortly.',
      formTitle: 'Send us a message',
      nameLabel: 'Full name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      phoneLabel: 'Phone number (optional)',
      phonePlaceholder: '05X XXX XXXX',
      serviceLabel: 'Service of interest',
      servicePlaceholder: 'Select a service',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us a little about your space and what you are looking for...',
      submit: 'Send Message',
      submitting: 'Sending...',
      privacyNote: 'We will only use these details to respond to your enquiry.',
      successTitle: 'Message sent',
      successBody: 'Thank you — we have received your message and will get back to you soon.',
      errorTitle: 'Something went wrong',
      errorBody: 'Your message could not be sent. Please try again, or contact us directly by phone or email.',
      errorRequired: 'This field is required.',
      errorEmail: 'Please enter a valid email address.',
      errorPhone: 'Please enter a valid phone number.',
      errorMessage: 'Please enter a message of at least 10 characters.',
      infoTitle: 'Contact details',
      phoneLabelInfo: 'Phone',
      emailLabelInfo: 'Email',
      locationLabelInfo: 'Location',
      hoursLabel: 'Availability',
      hoursValue: 'Sunday – Thursday, 9:00 AM – 6:00 PM',
    },
    notFound: {
      title: 'Page not found',
      body: 'The page you are looking for does not exist or may have moved.',
      cta: 'Back to homepage',
    },
  },
  ar: {
    meta: {
      siteName: 'Howida design studio',
      defaultTitle: 'Howida design studio — استوديو تصميم داخلي في أبوظبي، الإمارات',
      defaultDescription:
        'يقدم Howida design studio خدمات التصميم الداخلي والتصميم ثلاثي الأبعاد وتخطيط المساحات والتنفيذ المتكامل للمشاريع السكنية والتجارية في جميع أنحاء دولة الإمارات.',
    },
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      contact: 'تواصل معنا',
      bookConsultation: 'احجز استشارة',
      switchLang: 'English',
      menuOpen: 'فتح القائمة',
      menuClose: 'إغلاق القائمة',
    },
    common: {
      skipToContent: 'الانتقال إلى المحتوى',
      readMore: 'اقرأ المزيد',
      learnMore: 'المزيد',
      viewAllServices: 'عرض جميع الخدمات',
      ourServices: 'خدماتنا',
      call: 'اتصال',
      email: 'بريد إلكتروني',
      location: 'الموقع',
      servingAllUae: 'نقدم خدماتنا في جميع أنحاء دولة الإمارات العربية المتحدة.',
      backToServices: 'العودة إلى الخدمات',
      allServices: 'جميع الخدمات',
    },
    footer: {
      tagline: 'تصميم مساحات تُلهم.',
      companyHeading: 'الاستوديو',
      servicesHeading: 'الخدمات',
      contactHeading: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة.',
      addressLine: 'أبوظبي، الإمارات العربية المتحدة',
    },
    home: {
      heroKicker: 'استوديو تصميم داخلي · أبوظبي، الإمارات',
      heroTitle: 'تصميم مساحات تُلهم.',
      heroSubtitle:
        'يقدم Howida design studio خدمات تصميم داخلي وتنفيذ متكاملة للمشاريع السكنية والتجارية، من الفكرة الأولى وحتى التسليم النهائي.',
      heroCtaPrimary: 'احجز استشارة',
      heroCtaSecondary: 'تصفّح خدماتنا',
      aboutKicker: 'عن الاستوديو',
      aboutTitle: 'كل مساحة تستحق تصميمًا يعكس شخصية من يستخدمها.',
      aboutBody:
        'نقدم خدمات التصميم الداخلي والتنفيذ المتكامل للمشاريع السكنية والتجارية، مع الاهتمام بأدق التفاصيل لضمان جودة عالية ونتائج تتجاوز التوقعات.',
      aboutCta: 'المزيد عنا',
      servicesKicker: 'ماذا نقدم',
      servicesTitle: 'خدماتنا',
      servicesSubtitle:
        'من أول رسم تخطيطي وحتى التسليم النهائي، نقدم ثماني خدمات متخصصة يمكن حجزها منفردة أو ضمن مشروع متكامل مُدار بالكامل.',
      portfolio: {
        kicker: 'أعمال مختارة',
        title: 'مجموعة مختارة من التصاميم الداخلية',
        subtitle: 'نظرة على تنوّع المساحات التي نصممها وننفذها في جميع أنحاء الإمارات.',
        items: [
          { category: 'مساحات المعيشة' },
          { category: 'المطابخ وأماكن الطعام' },
          { category: 'غرف النوم والأجنحة' },
          { category: 'المساحات التجارية' },
          { category: 'الفلل والواجهات الخارجية' },
          { category: 'تجهيز المكاتب' },
        ],
        cta: 'تصفّح خدماتنا',
      },
      whyKicker: 'لماذا Howida design studio',
      whyTitle: 'أسلوب عمل مدروس، من الفكرة وحتى التسليم',
      whyItems: [
        {
          title: 'مسؤولية موحّدة',
          body: 'يُدار التصميم والتنفيذ معًا، بحيث تنتقل القرارات من الورق إلى المساحة المنجزة دون تعديل.',
        },
        {
          title: 'تصميم قائم على التفاصيل',
          body: 'يتم التخطيط للتوزيع والخامات والإضاءة كمنظومة واحدة، لا كقرارات منفصلة.',
        },
        {
          title: 'تواصل واضح',
          body: 'تعرف دائمًا في أي مرحلة يسير مشروعك، من خلال زيارات ميدانية موثّقة وتحديثات منتظمة.',
        },
        {
          title: 'تغطية على مستوى الإمارات',
          body: 'مقرّنا في أبوظبي، ونعمل على المشاريع السكنية والتجارية في جميع أنحاء الدولة.',
        },
      ],
      processKicker: 'كيف نعمل',
      processTitle: 'خطوات عمل واضحة من البداية للنهاية',
      processSteps: [
        { title: 'استشارة', body: 'نناقش أهدافك وميزانيتك والجدول الزمني، ونقيّم المساحة.' },
        { title: 'تصميم', body: 'يتم تطوير الفكرة والتوزيع والخامات والتصميم ثلاثي الأبعاد واعتمادها.' },
        { title: 'تنفيذ', body: 'تُنسَّق أعمال التشطيب والبناء ويتم الإشراف عليها في الموقع.' },
        { title: 'تسليم', body: 'جولة أخيرة لرصد الملاحظات قبل تسليم المساحة إليك.' },
      ],
      coverageTitle: 'نخدم المشاريع في جميع أنحاء الإمارات',
      coverageBody: 'مقرّنا في أبوظبي، ويعمل فريقنا على المشاريع السكنية والتجارية في جميع أنحاء دولة الإمارات.',
      ctaTitle: 'جاهز لبدء مشروعك؟',
      ctaSubtitle: 'أخبرنا عن مساحتك وسنتواصل معك لترتيب استشارة.',
      ctaButton: 'تواصل معنا',
    },
    about: {
      kicker: 'من نحن',
      title: 'عن Howida design studio',
      introLead: 'في Howida design studio، نؤمن بأن كل مساحة تستحق تصميمًا يعكس شخصية أصحابها ويلبي احتياجاتهم.',
      introBody:
        'نقدم خدمات التصميم الداخلي والتنفيذ المتكامل للمشاريع السكنية والتجارية، مع الاهتمام بأدق التفاصيل لضمان جودة عالية ونتائج تتجاوز التوقعات. من أول حديث حول طريقة سكنك أو عملك، وحتى أدق تفاصيل التنسيق النهائي، يبقى فريقنا حاضرًا في كل مرحلة لضمان أن تعكس المساحة النهائية هوية من يستخدمها فعلًا.',
      valuesKicker: 'ما يوجّه عملنا',
      valuesTitle: 'قيمنا',
      values: [
        {
          title: 'تصميم مخصص',
          body: 'لا يوجد عميلان يعيشان أو يعملان بالطريقة نفسها، لذلك لا يوجد مشروعان يتبعان القالب نفسه.',
        },
        {
          title: 'جودة في التنفيذ',
          body: 'نتعامل مع مقاولين وموردين موثوقين، ونراجع الأعمال المنجزة مقارنة بالمواصفات المعتمدة.',
        },
        {
          title: 'اهتمام بالتفاصيل',
          body: 'من التوزيع العام وحتى أدق التشطيبات، تُخطَّط التفاصيل بعناية ولا تُترك للصدفة.',
        },
        {
          title: 'مسؤولية موحّدة',
          body: 'فريق واحد يبقى مسؤولًا عن المشروع من الفكرة وحتى التسليم.',
        },
      ],
      approachKicker: 'كيف نعمل',
      approachTitle: 'أسلوب عملنا',
      coverageTitle: 'مقرّنا في أبوظبي، ونعمل في جميع أنحاء الإمارات',
      coverageBody: 'يقع استوديونا في أبوظبي، وتُقدَّم خدماتنا في جميع أنحاء دولة الإمارات للمشاريع السكنية والتجارية.',
      ctaTitle: 'لنتحدث عن مساحتك',
      ctaButton: 'تواصل مع الاستوديو',
    },
    services: {
      kicker: 'خدماتنا',
      title: 'الخدمات',
      subtitle: 'ثماني خدمات متخصصة تغطي التصميم والتصور ثلاثي الأبعاد والتنفيذ، متاحة منفردة أو كمشروع متكامل.',
      featuresTitle: 'ماذا تشمل هذه الخدمة',
      ctaTitle: 'مهتم بهذه الخدمة؟',
      ctaBody: 'أخبرنا عن مشروعك وسنتواصل معك لمناقشة الخطوات التالية.',
      ctaButton: 'احجز استشارة',
      otherServices: 'خدمات أخرى',
    },
    contact: {
      kicker: 'تواصل معنا',
      title: 'تواصل معنا',
      subtitle: 'للاستفسارات وحجز الاستشارات، تواصلوا معنا في أي وقت. أخبرنا عن مشروعك وسنعاود التواصل معك قريبًا.',
      formTitle: 'أرسل لنا رسالة',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'اسمك',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'you@example.com',
      phoneLabel: 'رقم الهاتف (اختياري)',
      phonePlaceholder: '05X XXX XXXX',
      serviceLabel: 'الخدمة المطلوبة',
      servicePlaceholder: 'اختر خدمة',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'أخبرنا قليلًا عن مساحتك وما تبحث عنه...',
      submit: 'إرسال الرسالة',
      submitting: 'جارٍ الإرسال...',
      privacyNote: 'سنستخدم هذه البيانات فقط للرد على استفسارك.',
      successTitle: 'تم إرسال الرسالة',
      successBody: 'شكرًا لك — لقد استلمنا رسالتك وسنتواصل معك قريبًا.',
      errorTitle: 'حدث خطأ ما',
      errorBody: 'تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى، أو التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.',
      errorRequired: 'هذا الحقل مطلوب.',
      errorEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
      errorPhone: 'يرجى إدخال رقم هاتف صحيح.',
      errorMessage: 'يرجى إدخال رسالة لا تقل عن 10 أحرف.',
      infoTitle: 'بيانات التواصل',
      phoneLabelInfo: 'الهاتف',
      emailLabelInfo: 'البريد الإلكتروني',
      locationLabelInfo: 'الموقع',
      hoursLabel: 'أوقات التواصل',
      hoursValue: 'الأحد – الخميس، 9:00 صباحًا – 6:00 مساءً',
    },
    notFound: {
      title: 'الصفحة غير موجودة',
      body: 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.',
      cta: 'العودة إلى الصفحة الرئيسية',
    },
  },
};
