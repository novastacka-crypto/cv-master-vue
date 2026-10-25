(function () {
  const translations = {
    en: {
      // Nav
      home: "Home",
      buildCv: "Build CV",
      templates: "Templates",
      homeBrand: "Home - CV Master",
      mainNavigation: "Main navigation",
      changeLanguage: "Change language",
      footerDesc:
        "Create, customize, and export stunning, ATS-friendly resumes in minutes.",
      footerQuickLinks: "Quick Links",
      footerResources: "Resources",
      footerHelp: "Help Center",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms of Service",
      footerContact: "Contact",
      toggleTheme: "Toggle dark mode",
      language: "Language",
      // Index
      siteTitle: "CV Master | Professional Resume Builder",
      heroTitle: "Your CV, Your Way",
      heroDesc:
        "Create, customize, and export stunning, ATS-friendly resumes in minutes. Professional templates designed for success.",
      startBuilding: "Start Building",
      viewTemplates: "View Templates",
      step1Title: "Step 1 - Add Content",
      step1Sub: "Choose and fill career sections with your achievements.",
      step2Title: "Step 2 - Select Template",
      step2Sub: "Pick a modern template that reflects your story.",
      step3Title: "Step 3 - Download & Share",
      step3Sub: "Preview and save PDF instantly ready for employers and ATS.",
      footerRights: "All rights reserved.",
      // Builder
      buildTitle: "Build Your Resume",
      downloadPdf: "Download PDF",
      livePreview: "Live Preview",
      colors: "Colors",
      personalInfo: "Personal Information",
      fullName: "Full Name *",
      email: "Email Address *",
      phone: "Phone Number *",
      portfolio: "Portfolio / Portfolio Link (Optional)",
      github: "GitHub Profile (Optional)",
      profilePhoto: "Profile Photo (Optional)",
      choosePhoto: "Choose a photo from your device",
      orDragDrop: "or drag & drop here",
      remove: "Remove",
      resumePreview: "Resume Preview",
      noInfoYet: "No information added yet.",
      pleaseFillRequired: "Please fill in all required fields.",
      itemDeleted: "Item deleted!",
      itemUpdated: "updated!",
      itemAdded: "added!",
      // Templates page
      chooseTemplate: "Choose Your Resume Template",
      chooseTemplateSub:
        "Instantly preview & use the template matching your career journey.",
      classicName: "Classic Professional",
      classicDesc:
        "Traditional, chronological, and focused. Clean design that suits almost any industry and career level.",
      modernName: "Modern Creative",
      modernDesc:
        "Clean blocks, minimal design with profile photo. Perfect for creative professionals and modern industries.",
      executiveName: "Executive Advanced",
      executiveDesc:
        "Modern academic style with colored sections and progress indicators. Ideal for research and leadership roles.",
      openTemplate: "Open Template",
      // Common template
      downloadAsPdf: "Download as PDF",
      profile: "Profile",
      professionalExperience: "Professional Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      add: "Add",
      noEntriesYet: "No entries yet",
      startAdding: "Start adding information to see the preview...",
      present: "Present",
      currentlyWorking: "Currently Working Here",
      currentlyStudying: "Currently Studying",
      save: "Save",
      cancel: "Cancel",
      // main.js sections
      sec_profile: "Profile",
      sec_profile_desc:
        "Add a short summary of your key strengths, experience, and career goals.",
      sec_education: "Education",
      sec_education_desc:
        "Add your degrees and schools. Include your focus, honors, or exchange terms.",
      sec_experience: "Professional Experience",
      sec_experience_desc:
        "Add your professional roles and employer history including internships.",
      sec_skills: "Skills",
      sec_skills_desc:
        "Add your hard and soft skills that help you stand out from the crowd.",
      sec_languages: "Languages",
      sec_languages_desc:
        "Add your languages and proficiency levels to show your communication range.",
      sec_certificates: "Certificates",
      sec_certificates_desc:
        "Add your industry certificates or licenses. Include issuer and date earned.",
      sec_courses: "Courses",
      sec_courses_desc:
        "Add online or in-person courses and trainings you joined and completed.",
      sec_awards: "Awards",
      sec_awards_desc:
        "Add your awards and recognitions from industry, competitions, or academia.",
      sec_interests: "Interests",
      sec_interests_desc:
        "Add relevant personal interests that support your career story.",
      sec_projects: "Projects",
      sec_projects_desc:
        "Add key projects you participated in and highlight your role and impact.",
      sec_organisations: "Organisations",
      sec_organisations_desc:
        "Add your memberships or volunteering with organisations including your role.",
      sec_publications: "Publications",
      sec_publications_desc:
        "Add publications, articles, or books you wrote or contributed to.",
      sec_references: "References",
      sec_references_desc:
        "Add your references from managers or coworkers, including contact details.",
      sec_declaration: "Declaration",
      sec_declaration_desc:
        "Add your declaration by creating or uploading your personal signature.",
      sec_custom: "Custom Section",
      sec_custom_desc:
        "Add a custom section for anything else, or combine sections cleanly.",
      // fields
      f_summary: "Summary",
      f_school: "University/School",
      f_degree: "Degree",
      f_startDate: "Start Date",
      f_endDate: "End Date",
      f_present: "Present",
      f_gpa: "GPA",
      f_jobTitle: "Job Title",
      f_company: "Company",
      f_tasks: "Tasks / Achievements",
      f_skill: "Skill",
      f_level: "Level",
      f_language: "Language",
      f_certificate: "Certificate",
      f_issuer: "Issuer",
      f_year: "Year",
      f_course: "Course",
      f_provider: "Provider",
      f_award: "Award",
      f_interests: "Interests",
      f_project: "Project",
      f_role: "Role",
      f_description: "Description",
      f_org: "Organisation",
      f_pub: "Publication",
      f_ref: "Reference",
      f_contact: "Contact",
      f_declaration: "Declaration",
      f_uploadSig: "Upload Signature",
      f_sectionTitle: "Section Title",
      f_content: "Content",
      // options
      opt_primary: "Primary School",
      opt_middle: "Middle School",
      opt_high: "High School",
      opt_bachelor: "Bachelor's",
      opt_master: "Master's",
      opt_phd: "PhD",
      opt_beginner: "Beginner",
      opt_intermediate: "Intermediate",
      opt_advanced: "Advanced",
      opt_fluent: "Fluent",
      // date formats
      fmt_year: "Year only (2024)",
      fmt_yearMonth: "Year & Month (Jan 2024)",
      fmt_full: "Full date (Jan 15, 2024)",
      // color
      colorUpdated: "Color updated!",
      // pdf
      resumeDownloaded: "Resume downloaded successfully!",
      errorPdf: "Error downloading PDF. Please try again.",
      fillPersonalFirst: "Please fill in your personal information first!",
      addSectionFirst: "Please add at least one section before exporting!",
    },
    ar: {
      home: "الرئيسية",
      buildCv: "إنشاء السيرة",
      templates: "القوالب",
      homeBrand: "الرئيسية - CV Master",
      mainNavigation: "التنقل الرئيسي",
      changeLanguage: "تغيير اللغة",
      footerDesc: "أنشئ سيرتك الذاتية وخصّصها وصدّرها باحترافية خلال دقائق.",
      footerQuickLinks: "روابط سريعة",
      footerResources: "الموارد",
      footerHelp: "مركز المساعدة",
      footerPrivacy: "سياسة الخصوصية",
      footerTerms: "شروط الخدمة",
      footerContact: "التواصل",
      toggleTheme: "تبديل الوضع الداكن",
      language: "اللغة",
      siteTitle: "CV Master | بانئ السيرة المهنية",
      heroTitle: "سيرتك الذاتية، بطريقتك",
      heroDesc:
        "أنشئ وخصّص وصدّر سيرًا ذاتية مذهلة ومتوافقة مع أنظمة التوظيف خلال دقائق. قوالب احترافية مصممة للنجاح.",
      startBuilding: "ابدأ البناء",
      viewTemplates: "عرض القوالب",
      step1Title: "الخطوة 1 - إضافة المحتوى",
      step1Sub: "اختر واملأ أقسام مسيرتك المهنية بإنجازاتك.",
      step2Title: "الخطوة 2 - اختيار القالب",
      step2Sub: "اختر قالبًا عصريًا يعكس قصتك.",
      step3Title: "الخطوة 3 - تنزيل ومشاركة",
      step3Sub: "عاين واحفظ PDF فورًا جاهزًا لأصحاب العمل والأنظمة.",
      footerRights: "جميع الحقوق محفوظة.",
      buildTitle: "بناء السيرة الذاتية",
      downloadPdf: "تنزيل PDF",
      livePreview: "معاينة مباشرة",
      colors: "الألوان",
      personalInfo: "المعلومات الشخصية",
      fullName: "الاسم الكامل *",
      email: "البريد الإلكتروني *",
      phone: "رقم الهاتف *",
      portfolio: "البورتفوليو / رابط (اختياري)",
      github: "ملف GitHub (اختياري)",
      profilePhoto: "صورة الملف (اختياري)",
      choosePhoto: "اختر صورة من جهازك",
      orDragDrop: "أو اسحب وأفلت هنا",
      remove: "إزالة",
      resumePreview: "معاينة السيرة",
      noInfoYet: "لم تتم إضافة معلومات بعد.",
      pleaseFillRequired: "يرجى ملء جميع الحقول المطلوبة.",
      itemDeleted: "تم حذف العنصر!",
      itemUpdated: "تم التحديث!",
      itemAdded: "تمت الإضافة!",
      chooseTemplate: "اختر قالب السيرة الذاتية",
      chooseTemplateSub: "عاين واستخدم القالب الذي يناسب مسيرتك المهنية فورًا.",
      classicName: "احترافي كلاسيكي",
      classicDesc:
        "تقليدي، زمني، ومركز. تصميم نظيف يناسب تقريبًا أي صناعة ومستوى مهني.",
      modernName: "إبداعي عصري",
      modernDesc:
        "كتل نظيفة، تصميم بسيط مع صورة ملف. مثالي للمحترفين الإبداعيين والصناعات الحديثة.",
      executiveName: "تنفيذي متقدم",
      executiveDesc:
        "أسلوب أكاديمي عصري مع أقسام ملونة ومؤشرات تقدم. مثالي لدورات البحث والقيادة.",
      openTemplate: "فتح القالب",
      downloadAsPdf: "تنزيل كـ PDF",
      profile: "الملف الشخصي",
      professionalExperience: "الخبرة المهنية",
      education: "التعليم",
      skills: "المهارات",
      languages: "اللغات",
      add: "إضافة",
      noEntriesYet: "لا توجد إدخالات بعد",
      startAdding: "ابدأ بإضافة معلومات لرؤية المعاينة...",
      present: "حالياً",
      currentlyWorking: "أعمل هنا حالياً",
      currentlyStudying: "أدرس حالياً",
      save: "حفظ",
      cancel: "إلغاء",
      sec_profile: "الملف الشخصي",
      sec_profile_desc: "أضف ملخصًا قصيرًا لنقاط قوتك وخبرتك وأهدافك المهنية.",
      sec_education: "التعليم",
      sec_education_desc:
        "أضف شهاداتك ومدارسك. Include your focus, honors, or exchange terms.",
      sec_experience: "الخبرة المهنية",
      sec_experience_desc:
        "أضف أدوارك المهنية وتاريخ أصحاب العمل بما في ذلك التدريب.",
      sec_skills: "المهارات",
      sec_skills_desc: "أضف مهاراتك الفنية والشخصية التي تميزك.",
      sec_languages: "اللغات",
      sec_languages_desc: "أضف لغاتك ومستويات إتقانك.",
      sec_certificates: "الشهادات",
      sec_certificates_desc: "أضف شهاداتك أو تراخيصك المهنية.",
      sec_courses: "الدورات",
      sec_courses_desc:
        "أضف الدورات (عبر الإنترنت أو حضورية) التي التحقت بها وأكملتها.",
      sec_awards: "الجوائز",
      sec_awards_desc: "أضف جوائزك وتكريماتك.",
      sec_interests: "الاهتمامات",
      sec_interests_desc: "أضف اهتماماتك الشخصية ذات الصلة.",
      sec_projects: "المشاريع",
      sec_projects_desc: "أضف المشاريع الرئيسية التي شاركت فيها.",
      sec_organisations: "المنظمات",
      sec_organisations_desc: "أضف عضوياتك أو تطوعك في المنظمات.",
      sec_publications: "المنشورات",
      sec_publications_desc: "أضف المنشورات أو المقالات أو الكتب.",
      sec_references: "المراجع",
      sec_references_desc: "أضف مراجعك من المدراء أو الزملاء.",
      sec_declaration: "الإعلان",
      sec_declaration_desc: "أضف إعلانك من خلال إنشاء أو رفع توقيعك.",
      sec_custom: "قسم مخصص",
      sec_custom_desc: "أضف قسمًا مخصصًا لأي شيء آخر.",
      f_summary: "الملخص",
      f_school: "الجامعة/المدرسة",
      f_degree: "الدرجة",
      f_startDate: "تاريخ البداية",
      f_endDate: "تاريخ النهاية",
      f_present: "حالياً",
      f_gpa: "المعدل",
      f_jobTitle: "المسمى الوظيفي",
      f_company: "الشركة",
      f_tasks: "المهام / الإنجازات",
      f_skill: "المهارة",
      f_level: "المستوى",
      f_language: "اللغة",
      f_certificate: "الشهادة",
      f_issuer: "الجهة المانحة",
      f_year: "السنة",
      f_course: "الدورة",
      f_provider: "المزود",
      f_award: "الجائزة",
      f_interests: "الاهتمامات",
      f_project: "المشروع",
      f_role: "الدور",
      f_description: "الوصف",
      f_org: "المنظمة",
      f_pub: "المنشور",
      f_ref: "المراجع",
      f_contact: "التواصل",
      f_declaration: "الإعلان",
      f_uploadSig: "رفع توقيع",
      f_sectionTitle: "عنوان القسم",
      f_content: "المحتوى",
      opt_primary: "مدرسة ابتدائية",
      opt_middle: "مدرسة متوسطة",
      opt_high: "مدرسة ثانوية",
      opt_bachelor: "بكالوريوس",
      opt_master: "ماجستير",
      opt_phd: "دكتوراه",
      opt_beginner: "مبتدئ",
      opt_intermediate: "متوسط",
      opt_advanced: "متقدم",
      opt_fluent: "طليق",
      fmt_year: "سنة فقط (2024)",
      fmt_yearMonth: "سنة وشهر (Jan 2024)",
      fmt_full: "تاريخ كامل (Jan 15, 2024)",
      colorUpdated: "تم تحديث اللون!",
      resumeDownloaded: "تم تنزيل السيرة بنجاح!",
      errorPdf: "خطأ في تنزيل PDF. حاول مرة أخرى.",
      fillPersonalFirst: "يرجى ملء معلوماتك الشخصية أولاً!",
      addSectionFirst: "يرجى إضافة قسم واحد على الأقل قبل التصدير!",
    },
  };

  let currentLang = localStorage.getItem("lang") || "en";

  function t(key) {
    return (
      (translations[currentLang] && translations[currentLang][key]) ||
      translations.en[key] ||
      key
    );
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = "en";
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    // translate data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      el.setAttribute("title", t(key));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", t(key));
    });
    // update toggle label
    const btn = document.getElementById("langBtn");
    if (btn) btn.textContent = lang === "ar" ? "EN" : "AR";
    window.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang } }),
    );
  }

  function getLang() {
    return currentLang;
  }

  window.I18N = translations;
  window.t = t;
  window.setLanguage = setLanguage;
  window.getLang = getLang;

  // init on load
  document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);
  });
})();
