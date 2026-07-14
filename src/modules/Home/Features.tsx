const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">Powerful Features</h2>

      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        Everything you need to manage your business efficiently.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {[
          {
            title: 'Inventory Management',
            desc: 'Track products, stock levels and categories easily.',
          },
          {
            title: 'Sales Management',
            desc: 'Create sales and automatically update inventory.',
          },
          {
            title: 'Role Based Access',
            desc: 'Control permissions for Admin, Manager and Employee.',
          },
          {
            title: 'Analytics Dashboard',
            desc: 'Monitor business performance with insights.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">{item.title}</h3>

            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
