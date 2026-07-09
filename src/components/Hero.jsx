import { memo } from "react";
import HeroGallery from "./HeroGallery";

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-bg">
      <HeroGallery />
    </section>
  );
}

export default memo(Hero);
