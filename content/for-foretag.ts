// Texter för /for-foretag ("Bli Partner"). Sidan är på engelska, eftersom
// den vänder sig till safariföretagen.
export const partnerPageContent = {
  metaTitle: "Become a partner – Local Safari Finder",
  eyebrow: "For local safari companies",
  heading: "Become a partner",
  intro: [
    "Do you run a local, independent safari company? Local Safari Finder connects you with travelers who are looking specifically for local companies. No booking commissions, just direct inquiries sent straight to your inbox.",
    "Tell us a little about your company in the form below and we'll get back to you as soon as we can.",
  ],
  form: {
    companyName: { label: "Company name *", placeholder: "Company name" },
    contactPerson: { label: "Contact person *", placeholder: "Your name" },
    email: { label: "Email *", placeholder: "your@email.com" },
    companyWebsite: { label: "Website", placeholder: "www.yourcompany.com" },
    country: {
      label: "Country / Region *",
      placeholder: "e.g. Arusha, Tanzania",
    },
    about: {
      label: "Tell us about your company *",
      placeholder:
        "What makes your company unique? What experiences do you offer?",
    },
    motivation: {
      label: "Why do you want to be featured on Local Safari Finder? *",
      placeholder: "Tell us what you hope to get out of being featured.",
    },
    // Samtyckestexten delas runt länkarna.
    consent: {
      before: "I have read and accept the ",
      privacyLink: "Privacy Policy",
      between: " and the ",
      termsLink: "Terms of Use",
      after: ".",
    },
    submit: "Send application",
    submitting: "Sending …",
    success:
      "Thank you! Your application has been sent. We'll get back to you as soon as we can.",
    error: "Something went wrong. Please try again in a moment.",
    privacyPolicy: "Privacy Policy",
    terms: "Terms of Use",
  },
};
