import { AnimatedTestimonials } from "../ui/animated-testimonials";

export function OurFleetPage() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Michael Rodriguez",
      designation: "Rector",
      src: "/ceo1.jpg"
    },
    // {
    //   quote:
    //     "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    //   name: "Sarah Chen",
    //   designation: "CMO (Chief Marketing Officer)",
    //     src: "/marketing1.jpg"
    // },
    // {
    //   quote:
    //     "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    //   name: "Shane Watson",
    //   designation: "CTO (Chief Technology Officer)",
    //     src: "/business.jpg"
    // },
   
  ];
  return (
    <div className="w-full mx-auto">
      <AnimatedTestimonials autoplay={true} testimonials={testimonials} />
    </div>
  );
}
