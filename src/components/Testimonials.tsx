
const testimonials = [
  {
    id: '1',
    name: 'Sarah J.',
    role: 'Verified Customer',
    quote: 'After using HairBloom Oil for just 3 months, my hair is visibly thicker and healthier. The shine is incredible too!',
    avatar: 'https://randomuser.me/api/portraits/women/48.jpg'
  },
  {
    id: '2',
    name: 'Michael T.',
    role: 'Verified Customer',
    quote: 'I was skeptical at first, but this oil really works. My receding hairline has started filling in and my confidence is back.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: '3',
    name: 'Amelia L.',
    role: 'Hair Stylist',
    quote: 'I recommend HairBloom to all my clients with thinning or damaged hair. The results speak for themselves - lustrous, vibrant hair.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-brown mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real people who have transformed their hair with our premium oils.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
