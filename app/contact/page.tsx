import type { Metadata } from "next";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact - SAIL Lab",
  description: "Get in touch with SAIL Lab for AI-powered financial technology solutions and partnerships",
};

export default function ContactPage() {
  return <Contact />;
}