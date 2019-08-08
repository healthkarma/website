import * as React from "react";

import { OffersProps } from "./Offers.d";
import Offer from "../../ui/Offer/Offer";

const Offers: React.FC<OffersProps> = () => {
  const offers = [
    {
      image: "",
      type: "Life Insurance Policy",
      benefit: "30% Off Monthly Premium",
      applyUrl: "https://google.com"
    },
    {
      image: "",
      type: "Life Insurance Policy",
      benefit: "30% Off Monthly Premium",
      applyUrl: "https://google.com"
    },
    {
      image: "",
      type: "Life Insurance Policy",
      benefit: "30% Off Monthly Premium",
      applyUrl: "https://google.com"
    }
  ]
  return (
    <>
      <section className="offers">
        <h1 className="headline">My Offers:</h1>
        <div className="offersContain">
          {offers.map((offer, i) => {
            return <Offer offer={offer} />
          })}
        </div>
      </section>
    </>
  );
};

export default Offers;