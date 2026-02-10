// types/homepage.ts

export interface HeroSlide {
  title: string;
  subtitle: string;
  active: boolean;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface HomepageData {
  heroSlides: HeroSlide[];
  heroCTA: string;
}
