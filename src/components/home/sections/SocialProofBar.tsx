const SocialProofBar = () => {
  return (
    <section className="py-6 sm:py-8 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">10,000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Active Students</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">500+</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Partner Schools</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">98%</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Student Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">AI Tutor Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
