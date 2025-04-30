
const features = [
  {
    id: '1',
    title: 'Natural Ingredients',
    description: 'Our oils are crafted with 100% natural ingredients, including argan oil, jojoba oil, and essential vitamins.',
    icon: '🌿'
  },
  {
    id: '2',
    title: 'Promotes Growth',
    description: 'Stimulates hair follicles and strengthens the roots, resulting in faster and healthier hair growth.',
    icon: '📈'
  },
  {
    id: '3',
    title: 'Adds Shine',
    description: 'Nourishes your hair for a glossy finish without weighing it down or making it greasy.',
    icon: '✨'
  },
  {
    id: '4',
    title: 'Reduces Breakage',
    description: 'Strengthens hair strands to reduce breakage and split ends for longer, healthier hair.',
    icon: '💪'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-lushmo-green mb-4">Why Choose LushMo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our premium oil is specially formulated to give you the best results for your hair care routine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-beige p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium text-lushmo-green mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
