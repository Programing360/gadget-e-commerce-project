import React from "react";
import Banner from "../Banner";
import ItemList from "../../MainSection/itemList";
import AllProduct from "../../../page/AllProduct";
import FAQSection from "../../../page/FAQSection";
import DiscoverProducts from "../../../page/DiscoverProducts";
import { Suspense } from "react";
import Loader from "../../Loader/Loader";

const Home = () => {
  

  return (
    <div className="w-full mx-auto">
      <Banner></Banner>
      <ItemList></ItemList>
      <Suspense fallback={<Loader></Loader>}>
        <AllProduct></AllProduct>
      </Suspense>
      <DiscoverProducts></DiscoverProducts>
      <section id="faq">
        <FAQSection></FAQSection>
      </section>
    </div>
  );
};

export default Home;
