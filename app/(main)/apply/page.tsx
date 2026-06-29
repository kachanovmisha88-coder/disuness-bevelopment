import { Metadata } from "next";
import ApplyForm from "@/components/ui/ApplyForm";

export const metadata: Metadata = { title: "Apply for Interview" };

export default function ApplyPage() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-[1fr_520px] gap-16 lg:gap-24 pt-24 pb-24">

        {/* Left — context */}
        <div className="hidden lg:block pt-2">
          <div className="sticky top-28">
            <div className="rule-gold" />
            <h1 className="font-serif text-[2.5rem] md:text-[3.25rem] text-fg leading-[1.12] mb-6">
              Apply for an Interview
            </h1>
            <p className="text-fg-muted text-[1rem] leading-[1.8] mb-10">
              No topics pre-approved. No agenda to push. If you have something real to say
              about iGaming — deals, strategy, failure, the stuff nobody talks about — fill this in.
            </p>

            <div className="space-y-6">
              {[
                ["We read every application.", "There's no auto-rejection. If you wrote something real, it'll get read."],
                ["No timeline.", "This runs on personal time. Expect a response within 2–3 weeks if there's a fit."],
                ["No pitch.", "Don't sell yourself. Tell us something that surprised you."],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1.5 w-1 h-1 flex-shrink-0 rounded-full bg-gold" />
                  <div>
                    <p className="text-[0.875rem] text-fg font-medium mb-0.5">{title}</p>
                    <p className="text-[0.8rem] text-fg-muted leading-[1.65]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div>
          <div className="lg:hidden mb-10">
            <div className="rule-gold" />
            <h1 className="font-serif text-[2.25rem] text-fg leading-[1.15] mb-4">
              Apply for an Interview
            </h1>
            <p className="text-fg-muted text-[0.9375rem] leading-[1.8]">
              No topics pre-approved, no agenda. If you have something real to say about
              iGaming — fill this in.
            </p>
          </div>
          <ApplyForm />
        </div>
      </div>
    </div>
  );
}
