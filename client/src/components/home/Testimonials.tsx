import { useAuth } from "@/hooks/use-auth";
import { t } from "@/lib/translations";

const testimonials = [
  {
    id: 1,
    quote: "Learning about PCOS symptoms through this platform helped me recognize my own condition. I consulted a doctor and now have it under control with lifestyle changes.",
    name: "Priya S.",
    role: "College Student, 21",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 2,
    quote: "The period tracker has been a game-changer. It helped me identify my irregular cycle pattern, which led to an early PCOD diagnosis and treatment.",
    name: "Aarti M.",
    role: "Working Professional, 26",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 3,
    quote: "As a health educator, I use resources from Sakhi Svasthya to teach college students about women's health issues. The bilingual content makes it accessible to everyone.",
    name: "Dr. Meera J.",
    role: "Health Educator, 38",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export default function Testimonials() {
  const { language } = useAuth();

  return (
    <section className="py-16 bg-gradient-to-r from-secondary/10 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">Community Voices</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Hear from women who have benefited from the Sakhi Svasthya initiative.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-sm">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <i className="ri-double-quotes-l text-2xl"></i>
                </div>
              </div>
              <div className="pt-8">
                <p className="text-neutral-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="mr-3">
                    <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
