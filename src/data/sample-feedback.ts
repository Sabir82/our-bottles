export interface SampleFeedbackItem {
  id: string;
  initials: string;
  authorName: string;
  roleOrCompany: string;
  location: string;
  quote: string;
  scenario: string;
}

export const SAMPLE_FEEDBACK_LABEL = "Sample Feedback — Replace with verified customer feedback";

export const SAMPLE_FEEDBACK: SampleFeedbackItem[] = [
  {
    id: "fb-1",
    initials: "VK",
    authorName: "Vivek Kumar",
    roleOrCompany: "BS – The Moment",
    location: "Rishikesh",
    quote:
      "Having customized 500ml bottles on our banquet tables immediately elevated the visual standard of the event. The matte label finish looked exceptional in photos.",
    scenario: "Bespoke Banquet Presentation",
  },
  {
    id: "fb-2",
    initials: "AS",
    authorName: "Aman Sajwan",
    roleOrCompany: "Resort Owner",
    location: "Shivpuri, Rishikesh",
    quote:
      "Our retreat guests frequently commented on the room amenity bottles. Replacing standard retail water with our own branding made guest welcome trays feel intentional.",
    scenario: "Luxury Resort Guest Rooms",
  },
  {
    id: "fb-3",
    initials: "RI",
    authorName: "Rashid",
    roleOrCompany: "Infinity Bakers & Café",
    location: "Dehradun",
    quote:
      "The custom labels aligned cleanly with our cafe branding. The team provided a digital proof within hours, and delivery to our Rajpur Road location was punctual.",
    scenario: "Artisan Cafe Dining Service",
  },
  {
    id: "fb-4",
    initials: "PT",
    authorName: "Pooja Tiwari",
    roleOrCompany: "Destination Wedding Coordinator",
    location: "Haridwar",
    quote:
      "Matching the water bottle labels with the bride & groom’s floral monogram was a delightful touch for the 600 wedding guests during the riverside pheras.",
    scenario: "Destination Wedding Hamper",
  },
];
