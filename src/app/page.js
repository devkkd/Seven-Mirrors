import CallbackBanner from "@/components/CallbackBanner";
import DiscoverStays from "@/components/DiscoverStays";
import HeroSlider from "@/components/HeroSlider";
import WhereWeStay from "@/components/WhereWeStay";
import FeaturedStays from "@/components/FeaturedStays";
import BestRatedVillas from "@/components/BestRatedVillas";
import GuestReviews from "@/components/GuestReviews";
import AddYourProperty from "@/components/AddYourProperty";
import StayJournal from "@/components/StayJournal";
import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <DiscoverStays />
      <CallbackBanner/>
      <WhereWeStay/>
      <FeaturedStays/>
      <BestRatedVillas/>
      <GuestReviews/>
      <AddYourProperty/>
      <StayJournal/>
      <Newsletter/>
      <InstagramFeed/>
    </>
  );
}